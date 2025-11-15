import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinkBase =
  'flex items-center rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-primary/10';

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { user } = useAuth();

  const navItems = (() => {
    if (user?.role === 'staff') {
      return [
        { to: '/report', label: 'Reportar incidente' },
        { to: '/incidents', label: 'Mis incidentes' },
        { to: '/admin', label: 'Panel admin' },
      ];
    }
    if (user?.role === 'autoridad') {
      return [
        { to: '/report', label: 'Reportar incidente' },
        { to: '/incidents', label: 'Mis incidentes' },
        { to: '/assigned', label: 'Tareas asignadas' },
      ];
    }
    return [
      { to: '/report', label: 'Reportar incidente' },
      { to: '/incidents', label: 'Mis incidentes' },
    ];
  })();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r bg-white shadow-lg transition-transform md:static md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <nav className="flex h-full flex-col space-y-2 px-4 py-6">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? 'bg-primary text-white' : 'text-secondary'}`
            }
            onClick={onClose}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
