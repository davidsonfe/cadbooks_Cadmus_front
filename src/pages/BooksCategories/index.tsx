import { Route, Routes } from 'react-router-dom';
import BooksCategoriesAdd from './BooksCategoriesAdd';
import BooksCategoriesEdit from './BooksCategoriesEdit';
import BooksCategoriesList from './BooksCategoriesList';

export default function ReaderCategories() {
  return (
    <Routes>
      <Route path="/" element={<BooksCategoriesList />} />
      <Route path="/adicionar" element={<BooksCategoriesAdd />} />
      <Route path="/editar/:id" element={<BooksCategoriesEdit />} />
    </Routes>
  );
}
