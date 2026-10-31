
const express = require("express");

const app = express();
app.use(express.json());

let students = [
    { id: 1, name: "Akshaya", branch: "CSE" },
    { id: 2, name: "Rahul", branch: "ECE" }
];

// Home route
app.get("/", (req, res) => {
    res.send("Student Management Application is Running!");
});

// Get all students
app.get("/students", (req, res) => {
    res.json(students);
});

// Add student
app.post("/students", (req, res) => {
    const { name, branch } = req.body;

    if (!name || !branch) {
        return res.status(400).json({
            message: "Name and branch are required"
        });
    }

    const student = {
        id: students.length
            ? Math.max(...students.map(s => s.id)) + 1
            : 1,
        name,
        branch
    };

    students.push(student);
    res.status(201).json(student);
});

// Get student by ID
app.get("/students/:id", (req, res) => {
    const student = students.find(
        s => s.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

// Update student
app.put("/students/:id", (req, res) => {
    const student = students.find(
        s => s.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name || student.name;
    student.branch = req.body.branch || student.branch;

    res.json(student);
});

// Delete student
app.delete("/students/:id", (req, res) => {
    const index = students.findIndex(
        s => s.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    res.json({ message: "Student deleted successfully" });
});

module.exports = app;
