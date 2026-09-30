import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function ExerciseRow({ exercise, onDelete, onEdit }) {
    const navigate = useNavigate();

    const handleEdit = () => {
        onEdit(exercise);
        navigate('/edit');
    };

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>
                <MdEdit className="icon-button" onClick={handleEdit} title="Edit exercise" />
            </td>
            <td>
                <MdDeleteForever
                    className="icon-button"
                    onClick={() => onDelete(exercise._id)}
                    title="Delete exercise"
                />
            </td>
        </tr>
    );
}
