import { Route, Routes } from 'react-router-dom';
import ReadersAdd from './readersAdd';
import ReadersEdit from './readersEdit';
import ReadersList from './readersList';

export default function Readers() {
  return (
    <Routes>
      <Route path="/" element={<ReadersList />} />
      <Route path="/adicionar" element={<ReadersAdd />} />
      <Route path="/editar/:id" element={<ReadersEdit />} />
    </Routes>
  );
}
