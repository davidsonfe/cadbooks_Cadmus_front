import { Route, Routes } from 'react-router-dom';
import BookingBookDetail from './BookingBookDetail';
import BookingBooksList from './BookingBooksList';
import BookingList from './BookingList';

export default function ReaderCategories() {
  return (
    <Routes>
      <Route path="/" element={<BookingList />} />
      <Route path="/obras" element={<BookingBooksList />} />
      <Route path="/obras/:id" element={<BookingBookDetail />} />
    </Routes>
  );
}
