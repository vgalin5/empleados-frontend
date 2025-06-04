// src/components/computers/ComputerAssignmentTable.tsx
import type { ComputerAssignment } from '@/services/computers';

interface Props {
  assignments: ComputerAssignment[];
}

export default function ComputerAssignmentTable({ assignments }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2">Colaborador</th>
            <th className="px-3 py-2">Marca</th>
            <th className="px-3 py-2">Serie</th>
            <th className="px-3 py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(a => (
            <tr key={a.id} className="border-t">
              <td className="px-3 py-2">{a.user?.name ?? `ID ${a.user_id}`}</td>
              <td className="px-3 py-2">{a.computer_brand}</td>
              <td className="px-3 py-2">{a.serial_number}</td>
              <td className="px-3 py-2">{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
