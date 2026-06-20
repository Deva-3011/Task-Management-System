import { Link, NavLink, useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark portal-nav">
      <div className="container-fluid portal-nav-inner">
        <Link className="navbar-brand fw-semibold" to="/dashboard">
          Task Portal
        </Link>
        <div className="d-flex flex-wrap align-items-center gap-2 ms-auto">
          <span className="nav-user d-none d-md-inline">{user?.email}</span>
          <NavLink className="btn btn-sm btn-outline-light" to="/dashboard">
            Dashboard
          </NavLink>
          <NavLink className="btn btn-sm btn-outline-light" to="/tasks/new">
            Add Task
          </NavLink>
          <DarkModeToggle />
          <button type="button" className="btn btn-sm btn-warning fw-semibold" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
