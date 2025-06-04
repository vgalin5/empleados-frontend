// src/pages/Home.tsx
import { Link } from 'react-router-dom';

export default function Home() {
  const modules = [
    { name: 'Colaboradores', path: '/users', emoji: '👥' },
    { name: 'Solicitudes de Acceso', path: '/access-requests', emoji: '🔐' },
    { name: 'Asignación de Computadores', path: '/computer-assignments', emoji: '💻' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">🏢 Gestión de colaboradores</h1>
        <p className="text-center text-gray-600">Selecciona un módulo para gestionar la información:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {modules.map(mod => (
            <Link
              key={mod.path}
              to={mod.path}
              className="flex flex-col items-center justify-center border rounded-xl p-6 shadow hover:shadow-lg hover:bg-blue-50 transition"
            >
              <span className="text-4xl mb-2">{mod.emoji}</span>
              <span className="text-lg font-medium text-gray-700">{mod.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
