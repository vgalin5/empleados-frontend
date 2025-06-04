import { useEffect, useState } from 'react';
import AccessRequestForm from '@/components/access/AccessRequestForm';
import AccessRequestTable from '@/components/access/AccessRequestTable';
import { getAllUsers } from '@/services/users';
import { getAllAccessRequestsByUser } from '@/services/access';
import type { AccessRequest, User } from '@/types';

export default function AccessRequests() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    getAllUsers().then(res => {
      setUsers(res.data);
      if (res.data.length > 0) {
        setCurrentUserId(res.data[0].id); // selecciona primero por defecto
      }
    });
  }, []);

  useEffect(() => {
    if (currentUserId !== null) {
      getAllAccessRequestsByUser(currentUserId).then(res => {
        const user = users.find(u => u.id === currentUserId);
        const enriched = res.data.map((req: AccessRequest) => ({
          ...req,
          user,
        }));
        setRequests(enriched);
      });
    }
  }, [currentUserId, users]);

  const handleNewRequest = () => {
    if (currentUserId !== null) {
      getAllAccessRequestsByUser(currentUserId).then(res => {
        const user = users.find(u => u.id === currentUserId);
        const enriched = res.data.map((req: AccessRequest) => ({
          ...req,
          user,
        }));
        setRequests(enriched);
        setSuccessMessage('✅ Solicitud enviada con éxito.');
        setTimeout(() => setSuccessMessage(''), 4000);
      });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📥 Solicitudes de Acceso</h2>

      <div className="mb-6">
        <label className="block font-medium mb-1">👤 Estado de solicitudes del colaborador:</label>
        <select
          value={currentUserId ?? ''}
          onChange={e => setCurrentUserId(Number(e.target.value))}
          className="border px-3 py-2 rounded"
        >
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name} - {user.role}
            </option>
          ))}
        </select>
      </div>

      {currentUserId && (
        <>
          <AccessRequestTable requests={requests} />
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
              {successMessage}
            </div>
          )}
          <AccessRequestForm userId={currentUserId} onNewRequest={handleNewRequest} />
        </>
      )}
    </div>
  );
}
