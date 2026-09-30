/**
 * Author: Roby Matta
 * Description: Mongoose model functions for the CS 290 exercise tracker REST API.
 */
import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';
let connection = undefined;

const exerciseSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        reps: { type: Number, required: true },
        weight: { type: Number, required: true },
        unit: { type: String, required: true },
        date: { type: String, required: true }
    },
    {
        collection: 'exercises',
        versionKey: false
    }
);

const Exercise = mongoose.model('Exercise', exerciseSchema);

/**
 * Connect to MongoDB using the connection string from the .env file.
 */
async function connect() {
    try {
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, {
            dbName: EXERCISE_DB_NAME
        });
        console.log('Successfully connected to MongoDB using Mongoose!');
    } catch (err) {
        console.log(err);
        throw new Error(`Could not connect to MongoDB ${err.message}`);
    }
}

/**
 * Create a new exercise document.
 *
 * @param {Object} exercise
 * @returns {Promise<Object>}
 */
async function createExercise(exercise) {
    const result = await Exercise.create(exercise);
    return result.toObject();
}

/**
 * Return all exercises.
 *
 * @returns {Promise<Object[]>}
 */
async function getExercises() {
    return await Exercise.find({}).lean();
}

/**
 * Return one exercise by id.
 *
 * @param {string} id
 * @returns {Promise<Object | null>}
 */
async function getExerciseById(id) {
    if (!mongoose.isValidObjectId(id)) {
        return null;
    }

    return await Exercise.findById(id).lean();
}

/**
 * Update one exercise by id.
 *
 * @param {string} id
 * @param {Object} exercise
 * @returns {Promise<Object | null>}
 */
async function updateExercise(id, exercise) {
    if (!mongoose.isValidObjectId(id)) {
        return null;
    }

    return await Exercise.findByIdAndUpdate(id, exercise, {
        new: true,
        runValidators: false,
        lean: true
    });
}

/**
 * Delete one exercise by id.
 *
 * @param {string} id
 * @returns {Promise<Object | null>}
 */
async function deleteExercise(id) {
    if (!mongoose.isValidObjectId(id)) {
        return null;
    }

    return await Exercise.findByIdAndDelete(id).lean();
}

export {
    connect,
    createExercise,
    getExercises,
    getExerciseById,
    updateExercise,
    deleteExercise
};
