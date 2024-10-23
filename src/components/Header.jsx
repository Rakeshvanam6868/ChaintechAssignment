import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar mt-3">
        <Link to="/login" className="text-yellow-500 font-extrabold text-4xl">Account Management</Link>
    </nav>
  );
};

export default Header;
