import React from 'react';
import Sidebar from '../Composants/Sidebar';
import CoursesTable from '../Composants/CoursesTable';
import './AdminPanel.css';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="dashboard-content">
                <h1>Admin Dashboard</h1>
                <CoursesTable />
            </div>
        </div>
    );
};

export default AdminDashboard;
