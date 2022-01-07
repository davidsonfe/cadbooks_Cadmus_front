import { Route, Routes } from 'react-router-dom';

import BooksAdd from './BooksAdd';
import BooksEdit from './BooksEdit';
import BooksList from './BooksList';

export default function ReaderCategories() {
  return (
    <Routes>
      <Route path="/" element={<BooksList />} />
      <Route path="/adicionar" element={<BooksAdd />} />
      <Route path="/editar/:id" element={<BooksEdit />} />
    </Routes>
  );
}
