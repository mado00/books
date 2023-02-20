import axios from 'axios';
import { createContext, useState, useCallback } from 'react';

const BooksContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);

// ESLint warinig issuefixed by useCallback
  const fetchBooks = useCallback(async () => {
    const response = await axios.get('http://localhost:3001/books');

    setBooks(response.data);
  }, []);

// if ESLint is disable, this is fine  
  // const fetchBooks = async () => {
  //   const response = await axios.get('http://localhost:3001/books');

  //   setBooks(response.data);
  // };

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });

    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        // ...response.data - take all exsiting data add to the new object book
        return { ...book, ...response.data };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);
    const updatedBooks = books.filter((book) => {
      // book.id !== id ex) 3 !== 3 is false, then filter removed 3
      // filter removes when false, keeps when true
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  const createBook = async (title) => {
    const response = await axios.post('http://localhost:3001/books', {
      title,
    });
 
    const updatedBooks = [
      ...books,
      response.data
    ];
    setBooks(updatedBooks);
  }; 

  const valueToShare = {
    books,
    deleteBookById, 
    editBookById,
    createBook,
    fetchBooks,
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}

export { Provider };
export default BooksContext;