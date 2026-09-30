import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditExercisePage({ exerciseToEdit }) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (!exerciseToEdit) {
            navigate('/');
            return;
        }

        setName(exerciseToEdit.name);
        setReps(exerciseToEdit.reps);
        setWeight(exerciseToEdit.weight);
        setUnit(exerciseToEdit.unit);
        setDate(exerciseToEdit.date);
    }, [exerciseToEdit, navigate]);

    const editExercise = async (e) => {
        e.preventDefault();

        const updatedExercise = {
            name,
            reps,
            weight,
            unit,
            date
        };

        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedExercise)
        });

        if (response.status === 200) {
            alert('Exercise updated successfully');
        } else {
            alert('Failed to update exercise');
        }

        navigate('/');
    };

    return (
        <section>
            <h2>Edit Exercise</h2>
            <form onSubmit={editExercise}>
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
                <button type="submit">Save</button>
            </form>
        </section>
    );
}
