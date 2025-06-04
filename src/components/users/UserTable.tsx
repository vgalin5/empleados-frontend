import type { User } from '../../services/users';
import UserRow from './UserRow';

interface Props {
  users: User[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

export default function UserTable({ users, onApprove, onReject }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 font-semibold text-gray-700">Nombre</th>
            <th className="px-4 py-2 font-semibold text-gray-700">Correo</th>
            <th className="px-4 py-2 font-semibold text-gray-700">Área</th>
            <th className="px-4 py-2 font-semibold text-gray-700">Rol</th>
            <th className="px-4 py-2 font-semibold text-gray-700">Estado</th>
            <th className="px-4 py-2 font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <UserRow
              key={user.id}
              user={user}
              onApprove={onApprove}
              onReject={onReject}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
