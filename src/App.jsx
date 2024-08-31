import "./index.css";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Login from "./components/Login/Login";
import ForgetPass from "./components/ForgetPass/ForgetPass";
import Viary from "./components/Viary/Viary";
import Register from "./components/Register/Register";
import Categories from "./components/Categories/Categories";
import Products from "./components/Products/Products";
import Notfound from "./components/Notfound/Notfound";
import Layout from "./components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import WishLiss from "./components/WishLiss/WishLiss";
import PayMent from "./components/PayMent/PayMent";
import RestPass from "./components/RestPass/RestPass";
import CartContextProvider from "./Context/CartContext";
import  { Toaster } from 'react-hot-toast';
import WishListContextProvider from "./Context/WishListContext";
import AllOrders from "./components/AllOrders/AllOrders";
import VerifyResetCode from "./components/VerifyResetCode/VerifyResetCode";

function App() {
  let x = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              {" "}
              <Cart />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              {" "}
              <AllOrders />{" "}
            </ProtectedRoute>
          ),
        },
      
        {
          path: "wishliss",
          element: (
            <ProtectedRoute>
              {" "}
              <WishLiss />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "payment",
          element: (
            <ProtectedRoute>
              {" "}
              <PayMent />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              {" "}
              <Brands />{" "}
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "forgetpass", element: <ForgetPass /> },
         { path: "viary", element: <Viary /> },
        { path: "register", element: <Register /> },
        { path: "restpass", element: <RestPass /> },
        {path: "verifyresetcode", element: <VerifyResetCode />},
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              {" "}
              <Categories />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              {" "}
              <Products />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id/:category",
          element: (
            <ProtectedRoute>
              {" "}
              <ProductDetails />{" "}
            </ProtectedRoute>
          ),
        },
      ],
    },
    { path: "*", element: <Notfound /> },
  ]);

  return (
    <UserContextProvider>
      <CartContextProvider>
        <WishListContextProvider>
        <RouterProvider router={x} />

        </WishListContextProvider>
        <Toaster/>
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;
