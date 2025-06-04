import type { User } from '../../services/users';


interface Props {
  user: User;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

export default function UserRow({ user, onApprove, onReject }: Props) {
  return (
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="px-4 py-2">{user.name}</td>
      <td className="px-4 py-2">{user.email}</td>
      <td className="px-4 py-2">{user.area}</td>
      <td className="px-4 py-2">{user.role}</td>
      <td className="px-4 py-2">
        <span className={`px-2 py-1 text-xs font-medium rounded-full 
          ${user.status === 'aprobado' ? 'bg-green-100 text-green-700' :
            user.status === 'rechazado' ? 'bg-red-100 text-red-700' :
              'bg-yellow-100 text-yellow-700'}`}>
          {user.status}
        </span>
      </td>
      <td className="px-4 py-2 space-x-2">
        <button
          onClick={() => onApprove(user.id)}
          className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded"
        >
          Aprobar
        </button>
        <button
          onClick={() => onReject(user.id)}
          className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
        >
          Rechazar
        </button>
      </td>
    </tr>
  );
}
