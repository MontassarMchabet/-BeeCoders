const Course  = require('../model/course');


const getCourses = async (req, res) => {
    try {
      
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCourse = async (req, res) => {
    try {
        const { title, price } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const newCourse = new Course({ title, price, image });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Obtenir un cours par ID
const getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            { title, price, image },
            { new: true }
        );
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        await Course.findByIdAndDelete(id);
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourseById
};
