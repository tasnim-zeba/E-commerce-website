import React from 'react'
import './Header.css'
import { SpeedDial, SpeedDialAction } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import Backdrop from '@mui/material/Backdrop';


const UserOptions = ({ user }) => {

    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ShoppingCartIcon />, name: "Cart", func: cart },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
        
    ];

    if (user.role === "admin") {
        options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard });
    }

    function dashboard() {
        navigate("/dashboard");
    }

    function orders() {
        navigate("/orders/me");
    }

    function account() {
        navigate("/account");
    }

    function logoutUser() {
        dispatch(logout());
        alert.success("Logged out successfully.");
    }

    function cart() {
        navigate("/cart");
    }

  return (
    <>
        <Backdrop open={open} style={{ zIndex: "10"}}/>
        <SpeedDial
            className='speedDial'
            ariaLabel="SpeedDial tooltip example"
            onClose={()=>setOpen(false)}
            onOpen={()=>setOpen(true)}
            style={{ zIndex: "11"}}
            open={open}
            direction='down'
            icon={<img
                className='speedDialIcon'
                src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                alt="Profile"
            />
            }
        >
            {options.map((item) => (
                <SpeedDialAction
                    key={item.name}
                    icon={item.icon}
                    tooltipTitle={item.name}
                    onClick={item.func}
                />
            ))}
        </SpeedDial>
    </>
  )
}

export default UserOptions
