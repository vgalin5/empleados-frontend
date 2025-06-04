import { useEffect, useState } from 'react';
import { getAllUsers, approveUser, rejectUser, createUser, type User } from '../services/users';
import UserTable from '../components/users/UserTable';
import UserFormModal from '../components/users/UserFormModal';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', area: '', role: '' });

  useEffect(() => {
    getAllUsers().then(res => setUsers(res.data));
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createUser(form); // ✅ usamos createUser desde el servicio
      setUsers(prev => [...prev, res.data]);
      setForm({ name: '', email: '', area: '', role: '' });
      setShowForm(false);
    } catch (err) {
      console.error('Error al crear usuario', err);
    }
  };

  const handleApprove = (id: number) => {
    approveUser(id).then(() =>
      setUsers(prev =>
        prev.map(user =>
          user.id === id ? { ...user, status: 'aprobado' } : user
        )
      )
    );
  };

  const handleReject = (id: number) => {
    rejectUser(id).then(() =>
      setUsers(prev =>
        prev.map(user =>
          user.id === id ? { ...user, status: 'rechazado' } : user
        )
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            👥 Colaboradores
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
          >
            + Nuevo Colaborador
          </button>
        </div>

        {/* Tabla de colaboradores */}
        <UserTable
          users={users}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>

      {/* Modal de formulario */}
      {showForm && (
        <UserFormModal
          form={form}
          setForm={setForm}
          onSubmit={handleCreateUser}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
