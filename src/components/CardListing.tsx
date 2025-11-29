import { Listing } from '../types';
import { BanknoteIcon, MapPinIcon } from './Icons';

interface CardListingProps {
  listing: Listing;
}

export const CardListing = ({ listing }: CardListingProps) => (
  <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
    <img src={listing.image} alt={listing.title} className="h-44 w-full object-cover" />
    <div className="flex flex-1 flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-slate-900">{listing.title}</h3>
        <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
          <BanknoteIcon className="h-4 w-4" /> S/ {listing.price}
        </span>
      </div>
      <p className="text-sm text-slate-600">{listing.description}</p>
      <div className="flex items-center gap-2 text-sm text-slate-700">
        <MapPinIcon className="h-4 w-4 text-secondary" />
        <span>{listing.address}</span>
      </div>
      <button className="mt-auto inline-flex justify-center rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-secondary/90">
        Ver detalles
      </button>
    </div>
  </article>
);
