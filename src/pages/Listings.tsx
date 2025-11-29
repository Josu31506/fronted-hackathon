import { useEffect, useState } from 'react';
import { PostAdForm } from '../components/PostAdForm';
import { CardListing } from '../components/CardListing';
import { MapView } from '../components/MapView';
import { Listing } from '../types';
import { mockListings } from '../data/mockListings';

export const Listings = () => {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    setListings(mockListings);
  }, []);

  const handleAddListing = (listing: Listing) => {
    setListings((prev) => [listing, ...prev]);
  };

  return (
    <section className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Avisos</p>
        <h2 className="text-2xl font-bold text-slate-900">Publica y descubre nuevas opciones</h2>
        <p className="text-sm text-slate-600">
          Usa el formulario para publicar un aviso rápido y revisa la lista de habitaciones disponibles cerca del campus.
        </p>
      </div>

      <PostAdForm onAdd={handleAddListing} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid gap-4 md:grid-cols-2">
            {listings.map((listing) => (
              <CardListing key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">Ubícalos en el mapa</h3>
          <MapView listings={listings} />
        </div>
      </div>
    </section>
  );
};
