import { Link } from 'react-router-dom';
import { IncidentCard } from '../components/IncidentCard';
import { useIncidents } from '../hooks/useIncidents';

export const IncidentsListPage = () => {
  const { incidents, loading, error } = useIncidents();

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Mis incidentes</h1>
        <p className="text-secondary/70">Revisa el estado de los reportes enviados.</p>
      </div>

      {loading && <p className="text-secondary">Cargando incidentes...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {incidents.map((incident) => (
          <Link key={incident.id} to={`/incidents/${incident.id}`}>
            <IncidentCard incident={incident} />
          </Link>
        ))}
      </div>
    </section>
  );
};
