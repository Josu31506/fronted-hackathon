import { useCallback, useEffect, useState } from 'react';
import {
  createIncident,
  getIncidents,
  updateIncidentStatus,
} from '../services/incidentService';
import { Incident, IncidentStatus, NewIncidentPayload } from '../types/incident';

type UseIncidentsOptions = {
  autoFetch?: boolean;
};

export const useIncidents = ({ autoFetch = true }: UseIncidentsOptions = {}) => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIncidents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getIncidents();
      setIncidents(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('No pudimos cargar los incidentes');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateIncident = useCallback(
    async (payload: NewIncidentPayload, createdBy: string, role: Incident['role']) => {
      try {
        setLoading(true);
        await createIncident(payload, createdBy, role);
        await fetchIncidents();
      } catch (err) {
        console.error(err);
        setError('No pudimos registrar el incidente');
      } finally {
        setLoading(false);
      }
    },
    [fetchIncidents]
  );

  const handleUpdateStatus = useCallback(
    async (id: string, status: IncidentStatus) => {
      try {
        setLoading(true);
        await updateIncidentStatus(id, status);
        await fetchIncidents();
      } catch (err) {
        console.error(err);
        setError('No pudimos actualizar el estado');
      } finally {
        setLoading(false);
      }
    },
    [fetchIncidents]
  );

  useEffect(() => {
    if (autoFetch) {
      fetchIncidents();
    }
  }, [autoFetch, fetchIncidents]);

  return {
    incidents,
    loading,
    error,
    refetch: fetchIncidents,
    create: handleCreateIncident,
    updateStatus: handleUpdateStatus,
  };
};
