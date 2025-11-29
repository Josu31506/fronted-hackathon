import { NavLink } from 'react-router-dom';
import { ArrowRightIcon, MapPinIcon, PenIcon, ShieldIcon } from '../components/Icons';

export const Home = () => (
  <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
    <div className="grid items-center gap-10 md:grid-cols-2">
      <div className="space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          Plataforma CampusRoom
        </span>
        <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
          Encuentra tu habitación ideal cerca de la universidad.
        </h1>
        <p className="text-lg text-slate-600">
          Publica avisos, conéctate con otros estudiantes y visualiza en el mapa las opciones disponibles para vivir más
          cerca del campus.
        </p>
        <div className="flex flex-wrap gap-3">
          <NavLink
            to="/avisos"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/90"
          >
            Ver avisos
            <ArrowRightIcon className="h-4 w-4" />
          </NavLink>
          <NavLink
            to="/mapa"
            className="inline-flex items-center gap-2 rounded-lg border border-secondary px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-secondary/60"
          >
            Ir al mapa
          </NavLink>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[{ icon: ShieldIcon, label: 'Perfil verificado' }, { icon: MapPinIcon, label: 'Ubicaciones reales' }, { icon: PenIcon, label: 'Publica rápido' }].map((feature) => (
            <div key={feature.label} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow">
              <feature.icon className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium text-slate-800">{feature.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        <div className="absolute -left-6 -top-6 h-20 w-20 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-10 bottom-10 h-24 w-24 rounded-full bg-secondary/30 blur-3xl" />
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-primary/10">
          <img
            src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80"
            alt="CampusRoom"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 space-y-2 rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Ejemplo</p>
            <p className="text-lg font-semibold text-slate-900">Mini departamento frente al campus</p>
            <p className="text-sm text-slate-600">S/ 1400 · Av. Universitaria 123</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
