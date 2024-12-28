import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    CircularProgress,
    Card,
    CardMedia,
    Stack,
    Grid,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { PhotoCamera } from '@mui/icons-material';

const EditCourse = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Charger les données du cours
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/Course/getCourseById/${id}`);
                const { title, price, image } = res.data;
                setTitle(title);
                setPrice(price);
                setPreview(`http://localhost:5000${image}`);
            } catch (err) {
                console.error('Error fetching course:', err);
                setError('Failed to load course data.');
            } finally {
                setFetching(false);
            }
        };
        fetchCourse();
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        if (image) formData.append('image', image);

        try {
            setLoading(true);
            await axios.put(`http://localhost:5000/Course/updateCourse/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoading(false);
            setSuccess(true);
            setTimeout(() => navigate('/admin'), 500);
        } catch (err) {
            console.error('Error updating course:', err);
            setLoading(false);
            setError('Failed to update course. Please try again.');
        }
    };

    if (fetching) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    bgcolor: '#f9fafc',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        
          <div className="admin-dashboard">
          <Sidebar />
          <Box
                sx={{
                    minHeight: '100vh',
                    ml: { sm: 30 }, // Assurez-vous que Sidebar ne chevauche pas le contenu
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#f9fafc',
                    px: 2,
                }}
            >
                <Card sx={{ width: 800, p: 4, borderRadius: 4, boxShadow: 4 }}>
                    <Typography variant="h4" component="div" gutterBottom textAlign="center">
                        Edit Course
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 3 }}>Course updated successfully!</Alert>}

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            {/* Title Field */}
                            <Box>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    Course Title
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    fullWidth
                                    required
                                    placeholder="Enter course title"
                                />
                            </Box>

                            {/* Price Field */}
                            <Box>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    Price (DT)
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    fullWidth
                                    required
                                    placeholder="Enter course price"
                                />
                            </Box>

                            {/* Image Upload and Preview */}
                            <Box>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    Course Image
                                </Typography>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={6}>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            startIcon={<PhotoCamera />}
                                            fullWidth
                                            sx={{ py: 1.5 }}
                                        >
                                            Upload New Image
                                            <input
                                                type="file"
                                                hidden
                                                onChange={handleImageChange}
                                            />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        {preview && (
                                            <CardMedia
                                                component="img"
                                                image={preview}
                                                alt="Preview"
                                                sx={{
                                                    height: 120,
                                                    borderRadius: 2,
                                                    boxShadow: 2,
                                                }}
                                            />
                                        )}
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                sx={{ py: 1.8 }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Course'}
                            </Button>

                            {/* Cancel Button */}
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => navigate('/admin')}
                                sx={{ py: 1.8 }}
                            >
                                Cancel
                            </Button>
                        </Stack>
                    </form>
                </Card>
            </Box>
      </div>
    );
};

export default EditCourse;
