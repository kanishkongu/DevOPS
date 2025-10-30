import React from "react";

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#fff",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const thStyle = {
  backgroundColor: "#007bff",
  color: "white",
  padding: "10px",
  textAlign: "left",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const actionButtonStyle = {
  marginRight: "8px",
  padding: "5px 10px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
};

const editButtonStyle = {
  ...actionButtonStyle,
  backgroundColor: "#ffc107",
  color: "#333",
};

const deleteButtonStyle = {
  ...actionButtonStyle,
  backgroundColor: "#dc3545",
  color: "white",
};

const BookList = ({ books, editBook, deleteBook }) => {
  if (books.length === 0) return <p>No books available.</p>;

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>Book ID</th>
          <th style={thStyle}>Title</th>
          <th style={thStyle}>Author</th>
          <th style={thStyle}>Availability</th>
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.bookid}>
            <td style={tdStyle}>{book.bookid}</td>
            <td style={tdStyle}>{book.booktitle}</td>
            <td style={tdStyle}>{book.author}</td>
            <td style={tdStyle}>{book.availability}</td>
            <td style={tdStyle}>
              <button style={editButtonStyle} onClick={() => editBook(book)}>
                Edit
              </button>
              <button style={deleteButtonStyle} onClick={() => deleteBook(book.bookid)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookList;
