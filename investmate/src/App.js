import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RequestDetails from './RequestDetails';
import ViewMyRequests from './viewMyRequests';
import MyCurrReqDetails from './MyCurrReqDetails';
import SendRequest from './sendRequest';
import ViewMyCollabRequests from './components/ViewMyCollabRequests';
import ViewCollaborations from './components/ViewCollaborations';
import MyCurrCollabReqDetails from './components/MyCurrCollabReqDetails';
import ProjectDetails from './components/ProjectDetails';
import RecievedProjects from './components/RecievedRequest';
import RequestsSent from './components/RequestsSent';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import AddProject from './components/AddProject';
import ViewProjects from './components/ViewProjects';
import ProjectDetailsCollab from './components/ProjectDetailsCollab';
import DomainDropdown from './components/DomainDropdown';
import SendRequestNM from './components/SendRequestNM';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  const [requests, setRequests] = useState([]);
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  useEffect(() => {
    axios.get('http://localhost:5000/fetchrequests')
      .then(response => setRequests(response.data))
      .catch(error => console.error('Error fetching requests:', error));
  }, []);

  const showNavbar = !['/login', '/register'].includes(window.location.pathname);

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {/*{showNavbar && <Navbar role={role} setRole={setRole} />*/}
        <div className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard role={role} />} />
            <Route path="/request/:requestId" element={<RequestDetails requests={requests} />} />
            <Route path="/viewMyRequests" element={<ViewMyRequests />} />
            <Route path="/requests/details/:id" element={<MyCurrReqDetails />} />
            <Route path="/sendReq" element={<SendRequest />} />
            <Route path="/collaborations" element={<ViewCollaborations />} />
            <Route path="/sent-projects" element={<RequestsSent />} />
            <Route path="/received-projects" element={<RecievedProjects />} />
            <Route path="/requests/:requestid" element={<ProjectDetails />} />
            <Route path="/viewMyCollabRequests" element={<ViewMyCollabRequests />} />
            <Route path="/collabrequests/details/:id" element={<MyCurrCollabReqDetails />} />
            <Route path="/login" element={<Login setRole={setRole} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard role={role} />} />
            <Route path="/add-project" element={<AddProject />} />
            <Route path="/view-projects" element={<ViewProjects />} />
            <Route path="/domainDropdown" element={<DomainDropdown />} />
            <Route path="/project/:projectName" element={<ProjectDetailsCollab />} />
            <Route path="/requestt/:projectName" element={<SendRequestNM />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
