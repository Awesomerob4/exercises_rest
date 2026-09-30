import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/create">Create Exercise</Link>
        </nav>
    );
}
