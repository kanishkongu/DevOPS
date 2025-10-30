import React, { useState, useEffect } from "react";
import BookList from "./BookList";
import BookForm from "./BookForm";

const LOCAL_STORAGE_KEY = "libraryBooks";

const appStyle = {
  maxWidth: "800px",
  margin: "20px auto",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  padding: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
};

const headerStyle = {
  textAlign: "center",
  color: "#333",
};

function App() {
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("bookid");
  const [sortOrderAsc, setSortOrderAsc] = useState(true);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedBooks) setBooks(storedBooks);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  const addBook = (book) => setBooks([...books, book]);

  const updateBook = (updatedBook) => {
    setBooks(
      books.map((b) => (b.bookid === updatedBook.bookid ? updatedBook : b))
    );
    setCurrentBook(null);
  };

  const deleteBook = (bookid) => setBooks(books.filter((b) => b.bookid !== bookid));

  const editBook = (book) => setCurrentBook(book);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSortFieldChange = (e) => setSortField(e.target.value);

  const toggleSortOrder = () => setSortOrderAsc(!sortOrderAsc);

  const filteredBooks = books.filter((book) => {
    return (
      book.booktitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Sort filteredBooks by chosen field and order
  const sortedBooks = filteredBooks.sort((a, b) => {
    let fieldA = a[sortField].toLowerCase();
    let fieldB = b[sortField].toLowerCase();
    if (fieldA < fieldB) return sortOrderAsc ? -1 : 1;
    if (fieldA > fieldB) return sortOrderAsc ? 1 : -1;
    return 0;
  });

  return (
    <div style={appStyle}>
      <h1 style={headerStyle}>Library Record System</h1>
      <BookForm addBook={addBook} updateBook={updateBook} currentBook={currentBook} />

      <div
        style={{
          marginBottom: "15px",
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
        />
        <select
          value={sortField}
          onChange={handleSortFieldChange}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
        >
          <option value="bookid">Sort by Book ID</option>
          <option value="booktitle">Sort by Title</option>
          <option value="author">Sort by Author</option>
        </select>
        <button
          onClick={toggleSortOrder}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #007bff",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {sortOrderAsc ? "Asc" : "Desc"}
        </button>
      </div>

      <BookList books={sortedBooks} editBook={editBook} deleteBook={deleteBook} />

      <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#eef", borderRadius: "8px" }}>
        <h3>Raw Stored Data</h3>
        <pre>{JSON.stringify(books, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
