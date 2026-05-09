/*import React, { useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';

//Page list
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/user/Profile';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

//Auth Context
import { useAuth } from './authContext';
import CreateRepo from './components/repo/CreateRepo';
import EditProfile from './components/user/EditProfile';
import RepositoryDetails from './components/repo/RepositoryDetails';
import EditRepo from './components/repo/EditRepo';

const ProjectRoutes = () => {
    const { currentUser, setCurrentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem('userId');

        if(userIdFromStorage && !currentUser) {
            setCurrentUser(userIdFromStorage);
        }

        if(!userIdFromStorage && !["/auth","/signup"].includes(window.location.pathname)) {
            navigate('/auth');
        }

        if(userIdFromStorage && window.location.pathname === '/auth') {
            navigate("/");
        }
    }, [currentUser, navigate, setCurrentUser]);

    let element = useRoutes([
        {
            path: "/",
            element: <Dashboard />
        },
        {
            path:"/auth",
            element: <Login />
        },
        {
            path:"/signup",
            element: <Signup />
        },
        {
            path:"/profile/:id",
            element: <Profile />
        },
        {
            path:"/repo/create",
            element: <CreateRepo />
        },
        {
            path:"/updateProfile/:id",
            element: <EditProfile />
        },
        {
            path: "/repo/:id",
            element: <RepositoryDetails />
        },
        {
            path: "/repo/edit/:id",
            element: <EditRepo />
        }
    ]);

    return element;
}

export default ProjectRoutes;*/

import React, { useEffect } from "react";
import { useNavigate, useRoutes, useLocation } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

import { useAuth } from "./authContext";
import CreateRepo from "./components/repo/CreateRepo";
import EditProfile from "./components/user/EditProfile";
import RepositoryDetails from "./components/repo/RepositoryDetails";
import EditRepo from "./components/repo/EditRepo";

const ProjectRoutes = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");

    if (userIdFromStorage && !currentUser) {
      setCurrentUser(userIdFromStorage);
    }

    const publicRoutes = ["/auth", "/signup"];

    if (!userIdFromStorage && !publicRoutes.includes(location.pathname)) {
      navigate("/auth", { replace: true });
    }

    if (userIdFromStorage && location.pathname === "/auth") {
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate, setCurrentUser, location.pathname]);

  const element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/auth",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/profile/:id",
      element: <Profile />,
    },
    {
      path: "/repo/create",
      element: <CreateRepo />,
    },
    {
      path: "/updateProfile/:id",
      element: <EditProfile />,
    },
    {
      path: "/repo/:id",
      element: <RepositoryDetails />,
    },
    {
      path: "/repo/edit/:id",
      element: <EditRepo />,
    },
    {
      path: "*",
      element: <Login />,
    },
  ]);

  return element;
};

export default ProjectRoutes;