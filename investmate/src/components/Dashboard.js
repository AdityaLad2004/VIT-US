import React, { useEffect, useState } from 'react';
import Card from './Card';

const Dashboard = ({ role }) => {
  const [userRole, setUserRole] = useState(role || localStorage.getItem('role'));

  useEffect(() => {
    if (!userRole) {
      const savedRole = localStorage.getItem('role');
      if (savedRole) {
        setUserRole(savedRole);
      }
    }
  }, [userRole]);

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <h1 className="text-5xl font-extrabold mb-12">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {userRole === 'maker' && (
            <>
              <Card
                to="/add-project"
                title="Add Project"
                description="Create a new project and showcase it to potential investors."
                bgColor="from-blue-500 to-blue-700"
                hoverBgColor="hover:from-blue-600 hover:to-blue-800"
              />
              <Card
                to="/view-projects"
                title="View Projects"
                description="Review and manage your existing projects."
                bgColor="from-green-500 to-green-700"
                hoverBgColor="hover:from-green-600 hover:to-green-800"
              />
              <Card
                to="/collaborations"
                title="Collaboration Requests"
                description="View and manage collaboration requests from other makers."
                bgColor="from-purple-500 to-purple-700"
                hoverBgColor="hover:from-purple-600 hover:to-purple-800"
              />
              <Card
                to="/domainDropdown"
                title="Send Collaboration Request"
                description="Send collaboration requests to other makers or labs."
                bgColor="from-orange-500 to-orange-700"
                hoverBgColor="hover:from-orange-600 hover:to-orange-800"
              />
              <Card
                to="/viewMyRequests"
                title="My Requests"
                description="Manage and review your sent collaboration requests."
                bgColor="from-teal-500 to-teal-700"
                hoverBgColor="hover:from-teal-600 hover:to-teal-800"
              />
              <Card
                to="/sendReq"
                title="Request Lab Collaboration"
                description="Request collaboration with labs for your projects."
                bgColor="from-red-500 to-red-700"
                hoverBgColor="hover:from-red-600 hover:to-red-800"
              />
            </>
          )}
          {userRole === 'investor' && (
            <>
              <Card
                to="/view-projects"
                title="View All Projects"
                description="Browse through all available projects and place bids."
                bgColor="from-teal-500 to-teal-700"
                hoverBgColor="hover:from-teal-600 hover:to-teal-800"
              />
              <Card
                to="/collaboration-requests"
                title="Collaboration Requests"
                description="View and manage collaboration requests from makers."
                bgColor="from-purple-500 to-purple-700"
                hoverBgColor="hover:from-purple-600 hover:to-purple-800"
              />
              <Card
                to="/send-collaboration-request"
                title="Send Collaboration Request"
                description="Send collaboration requests to makers or labs."
                bgColor="from-orange-500 to-orange-700"
                hoverBgColor="hover:from-orange-600 hover:to-orange-800"
              />
              <Card
                to="/my-requests"
                title="My Requests"
                description="Manage and review your sent collaboration requests."
                bgColor="from-teal-500 to-teal-700"
                hoverBgColor="hover:from-teal-600 hover:to-teal-800"
              />
              <Card
                to="/request-lab-collaboration"
                title="Request Lab Collaboration"
                description="Request collaboration with labs for your projects."
                bgColor="from-red-500 to-red-700"
                hoverBgColor="hover:from-red-600 hover:to-red-800"
              />
            </>
          )}
          {userRole === null && (
            <div className="text-center">
              <p className="text-lg">Please log in to see your dashboard.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
