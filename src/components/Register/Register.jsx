import React, { useContext, useEffect, useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {UserContext} from "../../Context/UserContext";
export default function Register() {
  const [apiError, setApiError] = useState("");
  const [isLoding, setIsLoding] = useState(false);
let {userLogin , setuserLogin} = useContext(UserContext)
  let navigate = useNavigate();

  function handleRegister(val) {
    setIsLoding(true);

    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, val)
      .then((res) => {
        if (res.data.message === "success") {
          navigate("/");
          localStorage.setItem("userToken", res.data.token);
          setuserLogin(res.data.token)
        }
        setIsLoding(false);
      })
      .catch((res) => {
        setApiError(res.response.data.message);
        setIsLoding(false);
      });
  }

  let shape = Yup.object().shape({
    name: Yup.string("name must be string")
      .min(3, "min length is 3")
      .max(12, "max length is 10")
      .required("name is required"),
    email: Yup.string().email("invaild email").required("email is required"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Za-z0-9]{6,10}$/,
        "pasword  should be between 6 and 10 char"
      ),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "rePassword and password not the same")
      .required("rePassword is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "invalid phone number")
      .required("phone is required"),
  });

  // function validate(values) {
  //   let errors = {};

  //   if (values.name == "") {
  //     errors.name = "name is required";
  //   } else if (!/^[A-Z][a-z]{3,9}$/.test(values.name)) {
  //     errors.name = "not valid name";
  //   }

  //   if (values.phone == "") {
  //     errors.phone = "phone is required";
  //   } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
  //     errors.phone = "not valid phone";
  //   }
  //   return errors;
  // }
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: shape,
    onSubmit: handleRegister,
  });

  return (
    <>
      <h2 className="text-3xl font-bold text-center text-emerald-600 mb-12">
        Register Now
      </h2>

      <form className="max-w-md mx-auto " onSubmit={formik.handleSubmit}>
        <div>
          {apiError ? (
            <div
              id="alert-border-2"
              className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400  dark:border-red-800"
              role="alert"
            >
              <svg
                className="flex-shrink-0 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <div className="ms-3 text-sm font-medium">{apiError}</div>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>
        {formik.errors.name && formik.touched.name ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.name}</span>
          </div>
        ) : null}

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        {formik.errors.email && formik.touched.email ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.email}</span>
          </div>
        ) : null}

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Your phone
          </label>
        </div>
        {formik.errors.phone && formik.touched.phone ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.phone}</span>
          </div>
        ) : null}

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        {formik.errors.password && formik.touched.password ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.password}</span>
          </div>
        ) : null}

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="rePassword"
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
        </div>

        {formik.errors.rePassword && formik.touched.rePassword ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.rePassword}</span>
          </div>
        ) : null}

        {isLoding ? (
          <div className="bg-emerald-700  px-5 py-2.5 text-center w-fit rounded-md cursor-not-allowed">
            {" "}
            <i className="fas fa-spinner fa-spin text-white "></i>
          </div>
        ) : (
          <button
            type="submit"
            className="text-white bg-emerald-700 transition hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          >
            Resgister
          </button>
        )}
        <div className="flex items-center my-4 justify-center">
          <span>Do You Have an Account</span>
          <Link to="/login" className="text-blue-500 px-3 underline">
            Login
          </Link>
        </div>
      </form>
    </>
  );
}
