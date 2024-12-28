import React, { useEffect, useState } from 'react';
import Header from '../Composants/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './CourseSection.css';


const LandingPage = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get('http://localhost:5000/Course/getCourses');
                setCourses(res.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);
    const handleViewMore = () => {
        navigate('/CourseList');  
    };
    return (
        <>
            <Header />
           
            <section className="courses-section">
                <div className="container">
                    <div className="courses-header">
                        <h2>Discover Our Courses</h2>
                        
                        <button className="view-more-btn" onClick={handleViewMore}>
                            View More
                        </button>
                    </div>

                    <div className="courses-grid">
                        {courses.slice(0, 6).map((course, index) => ( 
                            <div className="course-card" key={index}>
                                <div className="course-image">
                                    <img src={`http://localhost:5000${course.image}`} alt={course.title} />
                                </div>
                                <div className="course-info">
                                    <h3>{course.title}</h3>
                                    <p className="price">{course.price} DT/ Month</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

       
            <section className="contact-section">
                <div className="container">
                    <div className="contact-form-container">
                        <h2>Contact Us</h2>
                        <form className="contact-form">
                            <label>NAME</label>
                            <input type="text" placeholder="NAME" required />
                            <label>EMAIL</label>
                            <input type="email" placeholder="EMAIL" required />
                            <label>MESSAGE</label>
                            <textarea placeholder="MESSAGE" required></textarea>
                            <button type="submit" className="submit-btn">Send the message</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LandingPage;
