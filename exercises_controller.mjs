/**
 * Author: Roby Matta
 * Description: Express controller for the CS 290 exercise tracker REST API.
 */
import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

function isExerciseValid(body) {
    const requiredProperties = ['name', 'reps', 'weight', 'unit', 'date'];
    const bodyProperties = Object.keys(body);

    if (bodyProperties.length !== requiredProperties.length) {
        return false;
    }

    for (const property of requiredProperties) {
        if (!bodyProperties.includes(property)) {
            return false;
        }
    }

    if (typeof body.name !== 'string' || body.name.trim().length < 1) {
        return false;
    }

    if (!Number.isInteger(body.reps) || body.reps <= 0) {
        return false;
    }

    if (!Number.isInteger(body.weight) || body.weight <= 0) {
        return false;
    }

    if (typeof body.unit !== 'string') {
        return false;
    }

    const unit = body.unit.toLowerCase();
    if (unit !== 'kgs' && unit !== 'lbs') {
        return false;
    }

    if (typeof body.date !== 'string' || !isDateValid(body.date)) {
        return false;
    }

    return true;
}

function normalizeExercise(body) {
    return {
        name: body.name.trim(),
        reps: body.reps,
        weight: body.weight,
        unit: body.unit.toLowerCase(),
        date: body.date
    };
}

app.post('/exercises', asyncHandler(async (req, res) => {
    if (!isExerciseValid(req.body)) {
        res.status(400).json({ Error: 'Invalid request' });
        return;
    }

    const newExercise = normalizeExercise(req.body);
    const createdExercise = await exercises.createExercise(newExercise);
    res.status(201).json(createdExercise);
}));

app.get('/exercises', asyncHandler(async (req, res) => {
    const allExercises = await exercises.getExercises();
    res.status(200).json(allExercises);
}));

app.get('/exercises/:_id', asyncHandler(async (req, res) => {
    const exercise = await exercises.getExerciseById(req.params._id);

    if (!exercise) {
        res.status(404).json({ Error: 'Not found' });
        return;
    }

    res.status(200).json(exercise);
}));

app.put('/exercises/:_id', asyncHandler(async (req, res) => {
    if (!isExerciseValid(req.body)) {
        res.status(400).json({ Error: 'Invalid request' });
        return;
    }

    const updatedExercise = await exercises.updateExercise(
        req.params._id,
        normalizeExercise(req.body)
    );

    if (!updatedExercise) {
        res.status(404).json({ Error: 'Not found' });
        return;
    }

    res.status(200).json(updatedExercise);
}));

app.delete('/exercises/:_id', asyncHandler(async (req, res) => {
    const deletedExercise = await exercises.deleteExercise(req.params._id);

    if (!deletedExercise) {
        res.status(404).json({ Error: 'Not found' });
        return;
    }

    res.status(204).send();
}));

app.listen(PORT, async () => {
    await exercises.connect();
    console.log(`Server listening on port ${PORT}...`);
});
