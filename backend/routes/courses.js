const express = require('express');
const multer = require('multer');
const {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourseById
} = require('../controllers/coursesController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/getCourses', getCourses);
router.post('/createCourse/', upload.single('image'), createCourse);
router.put('/updateCourse/:id', upload.single('image'), updateCourse);
router.delete('/deleteCourse/:id', deleteCourse);
router.get('/getCourseById/:id', getCourseById);

module.exports = router;
