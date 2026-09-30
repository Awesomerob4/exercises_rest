import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import HomePage from './pages/HomePage.jsx';
import CreateExercisePage from './pages/CreateExercisePage.jsx';
import EditExercisePage from './pages/EditExercisePage.jsx';

export default function App() {
    const [exerciseToEdit, setExerciseToEdit] = useState(null);

    return (
        <>
            <header>
                <h1>Exercise Tracker</h1>
                <p>Track your workouts with a full stack MERN single page application.</p>
            </header>

            <Navigation />

            <main>
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage setExerciseToEdit={setExerciseToEdit} />}
                    />
                    <Route path="/create" element={<CreateExercisePage />} />
                    <Route
                        path="/edit"
                        element={<EditExercisePage exerciseToEdit={exerciseToEdit} />}
                    />
                </Routes>
            </main>

            <footer>© 2026 Roby Matta</footer>
        </>
    );
}
