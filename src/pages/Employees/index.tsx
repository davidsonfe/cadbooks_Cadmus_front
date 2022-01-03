import { Route, Routes } from 'react-router-dom';
import EmployeersAdd from './EmployeesAdd';
import EmployeersEdit from './EmployeesEdit';
import EmployeesList from './EmployeesList';

export default function Employees() {
  return (
    <Routes>
      <Route path="/" element={<EmployeesList />} />
      <Route path="/adicionar" element={<EmployeersAdd />} />
      <Route path="/editar/:id" element={<EmployeersEdit />} />
    </Routes>
  );
}
