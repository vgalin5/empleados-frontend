// src/components/users/UserFormModal.tsx
import React from 'react';

interface Props {
  form: {
    name: string;
    email: string;
    area: string;
    role: string;
  };
  setForm: React.Dispatch<React.SetStateAction<Props['form']>>;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

const ROLES = [
  'Backend Developer',
  'Frontend Developer',
  'Diseñador',
  'Tester QA',
  'Líder Técnico',
];

export default function UserFormModal({ form, setForm, onSubmit, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-2xl animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📋 Registrar Colaborador</h2>
        <form onSubmit={onSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Nombre"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Correo"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Área</label>
            <select
              value={form.area}
              onChange={e => setForm({ ...form, area: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Selecciona área --</option>
              <option value="Desarrollo">Desarrollo</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Rol</label>
            <select
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Selecciona rol --</option>
              {ROLES.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
