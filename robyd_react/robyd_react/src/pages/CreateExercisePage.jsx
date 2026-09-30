import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateExercisePage() {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const addExercise = async (e) => {
        e.preventDefault();

        const newExercise = {
            name,
            reps,
            weight,
            unit,
            date
        };

        const response = await fetch('/exercises', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newExercise)
        });

        if (response.status === 201) {
            alert('Exercise created successfully');
        } else {
            alert('Failed to create exercise');
        }

        navigate('/');
    };

    return (
        <section>
            <h2>Create Exercise</h2>
            <form onSubmit={addExercise}>
                <input
                    type="text"
                    placeholder="Exercise name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Reps"
                    value={reps}
                    onChange={(e) => setReps(Number.isNaN(e.target.valueAsNumber) ? '' : e.target.valueAsNumber)}
                    required
                />
                <input
                    type="number"
                    placeholder="Weight"
                    value={weight}
                    onChange={(e) => setWeight(Number.isNaN(e.target.valueAsNumber) ? '' : e.target.valueAsNumber)}
                    required
                />
                <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                    <option value="lbs">lbs</option>
                    <option value="kgs">kgs</option>
                </select>
                <input
                    type="text"
                    placeholder="MM-DD-YY"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <button type="submit">Create</button>
            </form>
        </section>
    );
}
