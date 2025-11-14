import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const Profile = () => {
    const {user} = useContext(AuthContext)

    return (
        <div className='text-center'>
            {user ? <>
            <p>Email: {user.email}</p>
            <p>Name: {user.displayName}</p>
            </> : <p>No user logged in</p>}
        </div>
    );
};

export default Profile;