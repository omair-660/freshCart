import React, { useState } from 'react';
import axios from 'axios';
import style from './ForgetPass.module.css';
import { useNavigate } from 'react-router-dom';

export default function ForgetPass() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email });
      if (response.data.statusMsg === "success") {
        navigate("/VerifyResetCode"); 
      }
      console.log(response);
      
      setMessage('Password reset link sent! Please check your email.');
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.message || 'Something went wrong. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          type="email"
          className='border outline-none'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <button
          type="submit"
          className='bg-black text-white px-5 py-1 rounded-md my-3'
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Submit'}
        </button>
      </form>
      {message && <div className="text-center text-green-500 mt-3">{message}</div>}
    </>
  );
}
