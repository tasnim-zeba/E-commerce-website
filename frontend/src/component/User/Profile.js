import React, { use } from 'react'
import MetaData from '../layout/MetaData'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../layout/Loader/Loader'
import { useEffect } from 'react'
import './Profile.css'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
    }, [navigate, isAuthenticated]);

  return (
    <>
        {loading ? <Loader/> : (<>
        <MetaData title={`${user.name}'s Profile`}/>
        <div className='profileContainer'>
            <div>
                <h1>My Profile</h1>
                <img src={user.avatar.url} alt={user.name}/>
                <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
                <div>
                    <h1>Full Name</h1>
                    <p>{user.name}</p>
                </div>
                <div>
                    <h1>Email</h1>
                    <p>{user.email}</p>
                </div>
                <div>
                    <h1>Joined On</h1>
                    <p>{String(user.createdAt).substr(0,10)}</p>   
                </div>
                <div>
                    <Link to="/orders/me">My Orders</Link>
                    <Link to="/password/change">Change Password</Link>
                </div>
                
            </div>
        </div>

    </>)}
    </>
  )
}

export default Profile
