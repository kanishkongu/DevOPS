import React, { useState, useEffect } from "react";

const formStyle = {
  marginBottom: "20px",
  padding: "10px",
  backgroundColor: "#ffffff",
  borderRadius: "5px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
};

const inputStyle = {
  flex: "1 1 150px",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ddd",
  fontSize: "1rem",
};

const selectStyle = {
  flex: "1 1 150px",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ddd",
  fontSize: "1rem",
};

const buttonStyle = {
  padding: "8px 16px",
  backgroundColor: "#007bff",
  border: "none",
  borderRadius: "4px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  alignSelf: "center",
  flex: "0 0 auto",
};

const BookForm = ({ addBook, updateBook, currentBook }) => {
  const [book, setBook] = useState({
    bookid: "",
    booktitle: "",
    author: "",
    availability: "Available",
  });

  useEffect(() => {
    if (currentBook) {
      setBook(currentBook);
    } else {
      setBook({ bookid: "", booktitle: "", author: "", availability: "Available" });
    }
  }, [currentBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentBook) {
      updateBook(book);
    } else {
      addBook(book);
    }
    setBook({ bookid: "", booktitle: "", author: "", availability: "Available" });
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        name="bookid"
        placeholder="Book ID"
        value={book.bookid}
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <input
        name="booktitle"
        placeholder="Book Title"
        value={book.booktitle}
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <input
        name="author"
        placeholder="Author"
        value={book.author}
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <select
        name="availability"
        value={book.availability}
        onChange={handleChange}
        style={selectStyle}
      >
        <option>Available</option>
        <option>Not Available</option>
      </select>
      <button type="submit" style={buttonStyle}>
        {currentBook ? "Update" : "Add"} Book
      </button>
    </form>
  );
};

export default BookForm;
