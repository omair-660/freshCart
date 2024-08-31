
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RestPass() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        email,
        resetCode,
        newPassword,
      });

      if (response.data.statusMsg === 'success') {
        setMessage('Password has been successfully updated!');
        navigate('/login'); 
      }
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.message || 'Something went wrong. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleResetPassword} className={style.form}>
        <input
          type="email"
          className="border outline-none"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          className="border outline-none"
          placeholder="Enter the reset code"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
          required
        />
        <input
          type="password"
          className="border outline-none"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <br />
        <button
          type="submit"
          className="bg-black text-white px-5 py-1 rounded-md my-3"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Reset Password'}
        </button>
      </form>
      {message && <div className="text-center text-green-500 mt-3">{message}</div>}
    </>
  );
}
