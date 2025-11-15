import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types/user';
import { LogoUTEC } from '../components/LogoUTEC';

const roles: UserRole[] = ['estudiante', 'staff', 'autoridad'];

export const LoginPage = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('estudiante');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) return;
    await login(name, role);
    navigate('/incidents');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <LogoUTEC />
          <p className="mt-4 text-secondary/80">
            Ingresa tu nombre y rol para comenzar a reportar incidentes en UTEC.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-secondary">Nombre</label>
            <input
              className="w-full rounded-lg border px-3 py-2 focus:border-primary focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-secondary">Rol</label>
            <select
              className="w-full rounded-lg border px-3 py-2 focus:border-primary focus:outline-none"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
            >
              {roles.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-2 text-white transition hover:bg-primary-dark"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};
