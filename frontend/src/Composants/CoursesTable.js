import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    IconButton,
    Stack,
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CoursesTable = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    // Charger les cours
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

    // Supprimer un cours
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/Course/deleteCourse/${id}`);
            setCourses(courses.filter((course) => course._id !== id));
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    // Redirection vers le formulaire de création
    const handleCreateCourse = () => {
        navigate('/create-course');
    };

    return (
        <Box sx={{ p: 4, backgroundColor: '#f9fafc', minHeight: '100vh' }}>
            {/* Header */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Typography variant="h4" component="div">
                    Courses Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleCreateCourse}
                    sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}
                >
                    Create New Course
                </Button>
            </Stack>

            {/* Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Price (DT)</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses.map((course, index) => (
                            <TableRow key={course._id} hover>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{course.title}</TableCell>
                                <TableCell>{course.price}</TableCell>
                                <TableCell>
                                    <Avatar
                                        src={`http://localhost:5000${course.image}`}
                                        alt={course.title}
                                        variant="rounded"
                                        sx={{ width: 56, height: 56 }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" onClick={() => navigate(`/Edit-Course/${course._id}`)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(course._id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CoursesTable;
