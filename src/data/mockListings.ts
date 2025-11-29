import { Listing } from '../types';

export const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Habitación cerca de Ingeniería',
    price: 950,
    address: 'Av. Universitaria 123, Lima',
    description: 'Espacio amoblado con internet y acceso a áreas comunes.',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    latitude: -12.06724,
    longitude: -77.08074,
  },
  {
    id: '2',
    title: 'Mini departamento para estudiantes',
    price: 1400,
    address: 'Jr. Los Olivos 456, Lima',
    description: 'Ambiente independiente con kitchenette y lavandería.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    latitude: -12.06197,
    longitude: -77.07936,
  },
  {
    id: '3',
    title: 'Cuarto compartido económico',
    price: 650,
    address: 'Calle Las Flores 789, Lima',
    description: 'Incluye servicios, a pocas cuadras de la universidad.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    latitude: -12.0627,
    longitude: -77.0745,
  },
];
