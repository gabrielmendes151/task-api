const express = require('express');
const bodyParser = require('body-parser');
const { authenticateToken } = require('./user');

const app = express();
app.use(bodyParser.json());

let tasks = [];
let lastTaskId = 0;

app.post('/tasks', authenticateToken, (req, res) => {
    const { description } = req.body;
    const newTask = {
        id: ++lastTaskId,
        description: description,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', authenticateToken, (req, res) => {
    const taskId = parseInt(req.params.id);
    const { description, completed } = req.body;
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].description = description || tasks[taskIndex].description;
        tasks[taskIndex].completed = completed || tasks[taskIndex].completed;
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: 'Tarefa não encontrada' });
    }
});

app.delete('/tasks/:id', authenticateToken,(req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1); // Remove a tarefa do array pelo índice
        res.json({ message: 'Tarefa excluída com sucesso' });
    } else {
        res.status(404).json({ message: 'Tarefa não encontrada' });
    }
});

app.get('/tasks', authenticateToken, (req, res) => {
    res.json(tasks);
});

app.put('/tasks/:id/complete', authenticateToken, (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = true;
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: 'Tarefa não encontrada' });
    }
});

module.exports = app;
