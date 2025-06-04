import { useEffect, useState } from 'react';
import { getAllUsers } from '@/services/users';
import { createAccessRequest } from '@/services/access';
import type { User } from '@/services/users';

interface Props {
  onNewRequest: () => void;
}

const ACCESS_BY_ROLE: Record<string, string[]> = {
  'Backend Developer': ['GitHub', 'Jira', 'AWS'],
  'Frontend Developer': ['GitHub', 'Jira'],
  'Diseñador': ['Figma'],
  'Tester QA': ['Jira'],
  'Líder Técnico': ['GitHub', 'Jira', 'AWS', 'Slack'],
};

export default function AccessRequestForm({ onNewRequest }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [availableAccesses, setAvailableAccesses] = useState<string[]>([]);
  const [selectedAccesses, setSelectedAccesses] = useState<string[]>([]);

  useEffect(() => {
    getAllUsers().then(res => setUsers(res.data));
  }, []);

  const handleUserChange = (id: number) => {
    const user = users.find(u => u.id === id) || null;
    setSelectedUser(user);
    const accesses = user ? ACCESS_BY_ROLE[user.role] || [] : [];
    setAvailableAccesses(accesses);
    setSelectedAccesses([]);
  };

  const handleToggleAccess = (access: string) => {
    setSelectedAccesses(prev =>
      prev.includes(access) ? prev.filter(a => a !== access) : [...prev, access]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || selectedAccesses.length === 0) return;

    try {
      // Enviar una solicitud por cada permiso seleccionado
      for (const access of selectedAccesses) {
        await createAccessRequest({
          user_id: selectedUser.id,
          access_type: access,
        });
      }
      onNewRequest();
      setSelectedUser(null);
      setAvailableAccesses([]);
      setSelectedAccesses([]);
    } catch (err) {
      console.error('Error al enviar solicitud de acceso:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <label className="block font-medium mb-1">Solicitar acceso al colaborador:</label>
        <select
          value={selectedUser?.id ?? ''}
          onChange={e => handleUserChange(Number(e.target.value))}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">-- Selecciona --</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name} - {user.role}
            </option>
          ))}
        </select>
      </div>

      {availableAccesses.length > 0 && (
        <div>
          <label className="block font-medium mb-1">Accesos según rol:</label>
          <div className="grid grid-cols-2 gap-2">
            {availableAccesses.map(access => (
              <label key={access} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedAccesses.includes(access)}
                  onChange={() => handleToggleAccess(access)}
                />
                {access}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Enviar Solicitud
        </button>
      </div>
    </form>
  );
}
