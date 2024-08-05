import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRoleLocal] = useState('maker'); // Default role is 'maker'
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5002/api/users/login', { email, password, role });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('name', res.data.name);
      setRole(res.data.role); // Update role in parent component
      navigate('/dashboard'); // Redirect to dashboard on successful login
    } catch (error) {
      console.error(error);
      alert('Error logging in.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-700">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Login</h1>

        <div className="mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <select
            value={role}
            onChange={(e) => setRoleLocal(e.target.value)}
            className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="maker">Maker</option>
            <option value="investor">Investor</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          Login
        </button>
        <p className="text-center text-gray-400 mt-4">
          Not registered? <a href="/register" className="text-blue-500 hover:underline">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
