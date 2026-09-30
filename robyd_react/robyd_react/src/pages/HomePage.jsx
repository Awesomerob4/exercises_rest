import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ExerciseTable from '../components/ExerciseTable.jsx';

export default function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([]);

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    };

    useEffect(() => {
        loadExercises();
    }, []);

    const onDelete = async (_id) => {
        const response = await fetch(`/exercises/${_id}`, {
            method: 'DELETE'
        });

        if (response.status === 204) {
            setExercises(exercises.filter((exercise) => exercise._id !== _id));
        } else {
            alert('Failed to delete exercise');
        }
    };

    return (
        <section>
            <h2>Home</h2>
            <p>View, update, and delete saved exercises.</p>
            <p>
                <Link to="/create" className="inline-link">Add a new exercise</Link>
            </p>
            <ExerciseTable
                exercises={exercises}
                onDelete={onDelete}
                onEdit={setExerciseToEdit}
            />
        </section>
    );
}
