import { Incident, IncidentStatus, NewIncidentPayload } from '../types/incident';

let mockIncidents: Incident[] = [
  {
    id: '1',
    type: 'Falla eléctrica',
    location: 'Laboratorio 3',
    description: 'Corte intermitente de energía en los enchufes laterales.',
    urgency: 'alta',
    status: 'pendiente',
    createdAt: new Date().toISOString(),
    createdBy: 'María Rojas',
    role: 'estudiante',
    assignedTeam: undefined,
  },
  {
    id: '2',
    type: 'Derrame',
    location: 'Pasillo central',
    description: 'Líquido en el piso cercano a biblioteca.',
    urgency: 'media',
    status: 'en_atencion',
    createdAt: new Date().toISOString(),
    createdBy: 'Carlos Vega',
    role: 'staff',
    assignedTeam: 'Seguridad',
    assignedTo: 'María López',
  },
];

const simulateRequest = async <T,>(data: T, delay = 400): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

export const getIncidents = async () => {
  // TODO: Replace with axios.get to backend endpoint
  return simulateRequest([...mockIncidents]);
};

export const getIncidentById = async (id: string) => {
  // TODO: Replace with axios.get(`/incidents/${id}`)
  const incident = mockIncidents.find((item) => item.id === id) || null;
  return simulateRequest(incident);
};

export const createIncident = async (payload: NewIncidentPayload, createdBy: string, role: Incident['role']) => {
  // TODO: Replace with axios.post('/incidents', payload)
  const newIncident: Incident = {
    id: crypto.randomUUID(),
    ...payload,
    status: 'pendiente',
    createdAt: new Date().toISOString(),
    createdBy,
    role,
  };
  mockIncidents = [newIncident, ...mockIncidents];
  return simulateRequest(newIncident);
};

export const updateIncidentStatus = async (id: string, status: IncidentStatus) => {
  // TODO: Replace with axios.patch(`/incidents/${id}`, { status })
  mockIncidents = mockIncidents.map((incident) =>
    incident.id === id ? { ...incident, status, updatedAt: new Date().toISOString() } : incident
  );
  return simulateRequest(mockIncidents.find((incident) => incident.id === id) ?? null);
};

export const assignIncident = async (id: string, team: string) => {
  // TODO: Replace with axios.patch(`/incidents/${id}/assign`, { team })
  mockIncidents = mockIncidents.map((incident) =>
    incident.id === id
      ? {
          ...incident,
          assignedTeam: team || undefined,
          updatedAt: new Date().toISOString(),
        }
      : incident
  );
  return simulateRequest(mockIncidents.find((incident) => incident.id === id) ?? null);
};
