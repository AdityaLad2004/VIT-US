import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'maker', 
    username: ''  
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { name, email, password, role, username } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!name || !email || !password || !username) {
      setError('All fields are required');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5002/api/users/register', formData);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
    } catch (err) {
      const errorMessage = err.response?.data?.errors?.map(e => e.msg).join(', ') || 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-700">
      <form
        onSubmit={onSubmit}
        className="bg-gray-800 p-10 rounded-lg shadow-xl w-full max-w-md"
      >
        <h1 className="text-4xl font-extrabold text-white mb-8 text-center">Register</h1>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        {loading && <p className="text-blue-400 text-center mb-4">Loading...</p>}
        
        <div className="mb-6">
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Name"
            className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
            className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
            className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            placeholder="Username"
            className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <select
            name="role"
            value={role}
            onChange={onChange}
            className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="maker">Maker</option>
            <option value="investor">Investor</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full p-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          disabled={loading}
        >
          Register
        </button>
        <p className="text-center text-gray-400 mt-4">
          Already registered? <a href="/login" className="text-blue-500 hover:underline">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
