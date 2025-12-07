import { Link, NavLink } from 'react-router-dom';

const navClasses = ({ isActive }) =>
  `rounded px-3 py-2 text-sm font-medium ${
    isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-200'
  }`;

const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-semibold">
          Sneaker Catalog
        </Link>
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={navClasses} end>
            Catálogo
          </NavLink>
          <NavLink to="/admin" className={navClasses}>
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
