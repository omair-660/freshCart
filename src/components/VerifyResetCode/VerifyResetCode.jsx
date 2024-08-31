import React, { useState } from 'react';
import axios from 'axios';
import style from './VerifyResetCode.module.css';
import { useNavigate } from 'react-router-dom';

export default function VerifyResetCode() {
  const [resetCode, setResetCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', { resetCode });

      if (response.data.statusMsg === "success") {
        setMessage('Reset code verified! You can now reset your password.');
        navigate("/restpass");  
      } else {
        setMessage('Invalid reset code. Please try again.');
      }
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.message || 'Invalid reset code. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          type="text"
          className='border outline-none'
          placeholder='Enter reset code'
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
          required
        />
        <br />
        <button
          type="submit"
          className='bg-black text-white px-5 py-1 rounded-md my-3'
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
      {message && <div className="text-center text-green-500 mt-3">{message}</div>}
    </>
  );
}
