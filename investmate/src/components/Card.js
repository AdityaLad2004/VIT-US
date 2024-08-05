import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ to, title, description, bgColor, hoverBgColor }) => {
  return (
    <Link
      to={to}
      className={`bg-gradient-to-r ${bgColor} text-white px-10 py-5 rounded-lg shadow-lg hover:${hoverBgColor} focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 transform hover:scale-105`}
    >
      <h3 className="text-3xl font-bold mb-2">{title}</h3>
      <p>{description}</p>
    </Link>
  );
};

export default Card;
