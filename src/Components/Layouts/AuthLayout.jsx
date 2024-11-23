import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AuthLayout() {
    const user = useSelector((state) => state.auth.user);
    const emailVerified = useSelector((state) => state.auth.emailVerified);
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
   // console.log(user);
    

    useEffect(() => {
        // Check if the user is not logged in or email is not verified
         if (!user ) {
             navigate('/login'); // Redirect to login if conditions aren't met
         }
    }, [user]); // Dependencies to trigger the effect

    // If the user is not logged in, we can render nothing or show a loading spinner
    if (!user) {
        return null; // Return null until the redirect happens
    }

    return (
        <div>
            <Outlet /> {/* Render the child routes */}
        </div>
    );
}

export default AuthLayout;
