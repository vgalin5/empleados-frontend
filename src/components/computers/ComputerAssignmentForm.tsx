import { useState, useEffect } from 'react';
import { getAllUsers } from '@/services/users';
import { getAvailable, assignComputer } from '@/services/computers';
import type { User } from '@/services/users';

interface Device {
  id: number;
  serial_number: string;
  model: string;
}

interface Props {
  onNewAssignment: () => void;
}

export default function ComputerAssignmentForm({ onNewAssignment }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [userId, setUserId] = useState('');
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    getAllUsers().then(res => setUsers(res.data));
    getAvailable().then(res => setDevices(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !deviceId) return;
    await assignComputer({ user_id: Number(userId), device_id: Number(deviceId) });
    setUserId('');
    setDeviceId('');
    onNewAssignment(); // Refresca la tabla
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <select
        value={userId}
        onChange={e => setUserId(e.target.value)}
        required
        className="w-full border px-3 py-2 rounded"
      >
        <option value="">-- Selecciona Colaborador --</option>
        {users.map(u => (
          <option key={u.id} value={u.id}>
            {u.name} ({u.email})
          </option>
        ))}
      </select>

      <select
        value={deviceId}
        onChange={e => setDeviceId(e.target.value)}
        required
        className="w-full border px-3 py-2 rounded"
      >
        <option value="">-- Selecciona Computador Disponible --</option>
        {devices.map(d => (
          <option key={d.id} value={d.id}>
            {d.model} - {d.serial_number}
          </option>
        ))}
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Asignar Computador
      </button>
    </form>
  );
}
