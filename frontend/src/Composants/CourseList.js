import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import './CourseList.css';  

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
  
        const fetchCourses = async () => {
            try {
                const res = await axios.get('http://localhost:5000/Course/getCourses');
                setCourses(res.data); 
                setLoading(false);      
            } catch (error) {
                setError('Failed to load courses');
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);  

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>{error}</div>; 
    }

    return (
        <>
        <Header />
        <div className="course-list-container">
            <h2>All Courses</h2>
            <div className="course-list">
                {courses.map((course) => (
                    <div className="course-card" key={course._id}>  
                        <div className="course-image">
                            <img src={`http://localhost:5000${course.image}`} alt={course.title} />
                        </div>
                        <div className="course-info">
                            <h3>{course.title}</h3>
                            <p className="course-price">{course.price} DT/ Month</p>
                        </div>
                        <button className="enroll-btn">Enroll Now</button>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default CourseList;
