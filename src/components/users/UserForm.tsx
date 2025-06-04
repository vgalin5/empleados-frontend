interface Props {
  form: { name: string; email: string; area: string; role: string };
  setForm: (form: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function UserForm({ form, setForm, onSubmit, onCancel }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Registrar Colaborador</h2>
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Nombre"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Correo"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Área"
            value={form.area}
            onChange={e => setForm({ ...form, area: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Rol"
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">
              Cancelar
            </button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
