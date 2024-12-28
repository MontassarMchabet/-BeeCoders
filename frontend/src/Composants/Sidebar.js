import React from 'react';
import { FaHome, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import '../pages/AdminPanel.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <img src="./the.PNG" alt="logo" style={{ width: '210px', height: 'auto', marginRight: '10px' }} />
            </div>
            <ul className="sidebar-menu">
                <li>
                    <FaHome className="sidebar-icon" />
                    <span>Dashboard</span>
                </li>
            
                <li>
                    <Link to="/admin" style={{ color:'#e9ecef'}} >
                        <FaBook className="sidebar-icon" />
                        <span>Courses</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
