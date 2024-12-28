import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
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
import { PhotoCamera } from '@mui/icons-material';

const CreateCourse = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

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
        formData.append('image', image);

        try {
            setLoading(true);
            const res = await axios.post('http://localhost:5000/Course/createCourse', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoading(false);
            setSuccess(true);
            setTimeout(() => navigate('/admin'), 1000);
        } catch (err) {
            console.error('Error creating course:', err);
            setLoading(false);
            setError('Failed to create course. Please try again.');
        }
    };

    return (
        <div className="admin-dashboard">
        <Sidebar />
        <Box
            sx={{
                minHeight: '100vh',
                ml: { sm: 30 }, 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#f9fafc',
                px: 2,
            }}
        >
            <Card sx={{ width: 800, p: 4, borderRadius: 4, boxShadow: 4 }}>
                <Typography variant="h4" component="div" gutterBottom textAlign="center">
                    Create New Course
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 3 }}>Course created successfully!</Alert>}

                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                   
                        <Box>
                            <Typography variant="subtitle1" gutterBottom>
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

                        <Box>
                            <Typography variant="subtitle1" gutterBottom>
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

                        <Box>
                            <Typography variant="subtitle1" gutterBottom>
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
                                        Upload Image
                                        <input
                                            type="file"
                                            hidden
                                            onChange={handleImageChange}
                                            required
                                        />
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    {preview && (
                                        <CardMedia
                                            component="img"
                                            image={preview}
                                            alt="Preview"
                                            sx={{ height: 180,
                                                borderRadius: 2,
                                                boxShadow: 2,
                                            }}
                                        />
                                    )}
                                </Grid>
                            </Grid>
                        </Box>

                      
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            sx={{ py: 1.8 }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Course'}
                        </Button>

                     
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

export default CreateCourse;
