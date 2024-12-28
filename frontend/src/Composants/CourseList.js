import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import './CourseList.css';  // Importez un fichier CSS pour styliser l'interface

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fonction pour récupérer les cours depuis l'API
        const fetchCourses = async () => {
            try {
                const res = await axios.get('http://localhost:5000/Course/getCourses');
                setCourses(res.data);  // Stocke les cours dans l'état
                setLoading(false);      // Fin du chargement
            } catch (error) {
                setError('Failed to load courses');
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);  // L'effet est exécuté une seule fois au montage du composant

    if (loading) {
        return <div>Loading...</div>; // Affiche "Loading..." tant que les données sont en train d'être récupérées
    }

    if (error) {
        return <div>{error}</div>; // Affiche un message d'erreur si l'API échoue
    }

    return (
        <>
        <Header />
        <div className="course-list-container">
            <h2>All Courses</h2>
            <div className="course-list">
                {courses.map((course) => (
                    <div className="course-card" key={course._id}>  {/* Remplacez _id par l'ID réel si nécessaire */}
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
