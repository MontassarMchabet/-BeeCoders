import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateCourse from './Composants/CreateCourseForm';
import AdminPanel from './pages/AdminPage';
import EditCourse from './Composants/EditCourse';
import CourseList from './Composants/CourseList';
function App() {
    return (
        <Router>
            
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/CourseList" element={<CourseList />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/create-course" element={<CreateCourse />} />
                <Route path="/Edit-Course/:id" element={<EditCourse />} />
            </Routes>
        </Router>
    );
}

export default App;
