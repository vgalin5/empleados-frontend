import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import AccessRequests from './pages/AccessRequests';
import ComputerAssignments from './pages/ComputerAssignments';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/access-requests" element={<AccessRequests />} />
        <Route path="/computer-assignments" element={<ComputerAssignments />} />
      </Routes>
    </BrowserRouter>
  );
}

