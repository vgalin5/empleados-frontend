import React from 'react';
import type { AccessRequest } from '@/types';

interface Props {
  requests: AccessRequest[];
}

const AccessRequestTable = ({ requests }: Props) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-xl font-semibold mb-4">📋 Solicitudes Realizadas</h3>
      {requests.length === 0 ? (
        <p className="text-gray-500">Aún no hay solicitudes registradas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2">Colaborador</th>
                <th className="text-left px-4 py-2">Acceso Solicitado</th>
                <th className="text-left px-4 py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-t">
                  <td className="px-4 py-2">
                    {req.user?.name ?? `ID ${req.user_id}`}
                  </td>
                  <td className="px-4 py-2">
                    {req.access_type}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        req.status === 'pendiente'
                          ? 'bg-yellow-100 text-yellow-800'
                          : req.status === 'aprobado'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AccessRequestTable;
