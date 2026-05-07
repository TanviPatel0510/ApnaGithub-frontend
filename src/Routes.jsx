import React, { useEffect } from 'react';
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
        }
    ]);

    return element;
}

export default ProjectRoutes;