import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectUrl from "./components/ProtectUrl";
import Projects from "./pages/Projects";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";

const AppContent = () => {
  const location = useLocation();

  const showNavbar = ["/", "/login", "/register"].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectUrl>
              <Dashboard />
            </ProtectUrl>
          }
        />

            <Route
          path="/projects"
          element={
            <ProtectUrl>
              <Projects />
            </ProtectUrl>
          }
        />

            <Route
          path="/Project/add"
          element={
            <ProtectUrl>
              <AddProject />
            </ProtectUrl>
          }
        />

    <Route
  path="/project/edit/:id"
  element={
    <ProtectUrl>
      <EditProject />
    </ProtectUrl>
  }
/>

    <Route
  path="/tasks" 
  element={
    <ProtectUrl>
      <Tasks />
    </ProtectUrl>
  }
/>

       <Route
          path="/Tasks/add"
          element={
            <ProtectUrl>
              <AddTask />
            </ProtectUrl>
          }
        />

    <Route
  path="/tasks/edit/:id"
  element={
    <ProtectUrl>
      <EditTask />
    </ProtectUrl>
  }
/>


      </Routes>
    </>
  );  
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
