import { useEffect, useState } from 'react';
import { getAvailable, assignComputer, getUserComputerHistory } from '@/services/computers';
import { getAllUsers } from '@/services/users';
import type { User } from '@/services/users';

interface Device {
  id: number;
  serial_number: string;
  model: string;
}

interface Assignment {
  id: number;
  serial_number: string;
  model: string;
}

export default function ComputerAssignments() {
  const [users, setUsers] = useState<User[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getAllUsers().then(res => setUsers(res.data));
    getAvailable().then(res => setDevices(res.data));
  }, []);

  useEffect(() => {
    if (selectedUserId !== null) {
      getUserComputerHistory(selectedUserId).then(res => setAssignments(res.data));
    } else {
      setAssignments([]);
    }
  }, [selectedUserId]);

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId || !selectedDeviceId) return;

    try {
      await assignComputer({ user_id: selectedUserId, device_id: selectedDeviceId });
      setMessage('✅ Computador asignado exitosamente');
      const newDevices = await getAvailable();
      setDevices(newDevices.data);
      const history = await getUserComputerHistory(selectedUserId);
      setAssignments(history.data);
      setSelectedDeviceId(null);
    } catch (err) {
      setMessage('❌ Error al asignar computador');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">💻 Gestión de Computadores</h2>

        {message && <p className="mb-4 text-center text-blue-600">{message}</p>}

        {/* Formulario */}
        <form onSubmit={handleAssign} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Seleccionar colaborador:</label>
            <select
              value={selectedUserId ?? ''}
              onChange={e => setSelectedUserId(Number(e.target.value))}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">-- Selecciona --</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Computador disponible:</label>
            <select
              value={selectedDeviceId ?? ''}
              onChange={e => setSelectedDeviceId(Number(e.target.value))}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">-- Selecciona --</option>
              {devices.map(d => (
                <option key={d.id} value={d.id}>
                  {d.model} - {d.serial_number}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2 text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:bg-gray-400"
              disabled={!selectedUserId || !selectedDeviceId}
            >
              Asignar Computador
            </button>
          </div>
        </form>

        {/* Tabla historial */}
        <h3 className="text-lg font-semibold mb-2">Historial del colaborador</h3>
        {selectedUserId ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2">Serial</th>
                  <th className="px-3 py-2">Modelo</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map(a => (
                  <tr key={a.id} className="border-t">
                    <td className="px-3 py-2">{a.serial_number}</td>
                    <td className="px-3 py-2">{a.model}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">Selecciona un colaborador para ver su historial.</p>
        )}
      </div>
    </div>
  );
}
