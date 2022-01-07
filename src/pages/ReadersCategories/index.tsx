import { Route, Routes } from 'react-router-dom';
import ReaderCategoriesAdd from './ReadersCategoriesAdd';
import ReaderCategoriesEdit from './ReadersCategoriesEdit';
import ReadersCategoriesList from './ReadersCategoriesList';

export default function ReaderCategories() {
  return (
    <Routes>
      <Route path="/" element={<ReadersCategoriesList />} />
      <Route path="/adicionar" element={<ReaderCategoriesAdd />} />
      <Route path="/editar/:id" element={<ReaderCategoriesEdit />} />
    </Routes>
  );
}
