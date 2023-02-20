import { useState } from 'react';
import useBooksContext from '../hooks/use-books-context';

function BookEdit({ book, onSubmit }) {
  const [title, setTitle] = useState(book.title);
  const { editBookById } = useBooksContext();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // onSubmit is for close/open edit forms
    // As soon as closed the edit form(onSubmit()), actuall edit function called editBookById(book.id, title); 
    onSubmit();
    editBookById(book.id, title);  
  };

  return (
    <form onSubmit={handleSubmit} className="book-edit">
      <label>Title</label>
      <input className="input" value={title} onChange={handleChange} />
      <button className="button is-primary">Save</button>
    </form>    
  );
}

export default BookEdit;