/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import "./App.css"; // Adding external CSS

let nextId = 0;
function App() {
  const [name, setName] = useState("");
  const [artists, setArtists] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showmessage, setShowmessage] = useState(false);

  const handleImpotent = (id) => {
    setArtists(
      artists.map((artist) =>
        artist.id === id ? { ...artist, impotent: !artist.impotent } : artist
      )
    );
  };

  const handleAdd = () => {
    if (editId !== null) {
      setArtists(
        artists.map((artist) =>
          artist.id === editId ? { ...artist, name: name } : artist
        )
      );
      setEditId(null);
    } else {
      setArtists([...artists, { id: nextId++, name, impotent: false, checked: false }]);
    }
    setName("");
  };

  const handleReverse = () => {
    const nextList = [...artists];
    nextList.reverse();
    setArtists(nextList);
  };

  const handleEdit = (artist) => {
    setName(artist.name);
    setEditId(artist.id);
  };

  const handleCheck = (id) => {
    setArtists(
      artists.map((artist) =>
        artist.id === id ? { ...artist, checked: !artist.checked } : artist
      )
    );
    setShowmessage(artists.length > 0);
  };

  return (
    <div className="app-container">
      <center>
        <div className="todo-box">
          <h1 className="heading">Todo List</h1>
          {showmessage === false ? (
            <p className="status-message">Task Not Completed</p>
          ) : (
            <p className="status-message completed">Completed</p>
          )}
          <input
            className="todo-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a task..."
          />
          <div className="buttons">
            <button onClick={handleAdd} className="add-btn">
              {editId !== null ? "Update" : "ADD"}
            </button>
            <button onClick={handleReverse} className="reverse-btn">
              Reverse
            </button>
          </div>
          <ul className="todo-list">
            {artists.map((artist) => (
              <li
                className={`todo-item ${
                  artist.checked ? "checked-item" : ""
                }`}
                key={artist.id}
              >
                {artist.impotent ? (
                  <FaStar
                    className="important-icon"
                    onClick={() => handleImpotent(artist.id)}
                  />
                ) : (
                  <CiStar
                    className="important-icon"
                    onClick={() => handleImpotent(artist.id)}
                  />
                )}
                <input
                  type="checkbox"
                  checked={artist.checked}
                  onChange={() => handleCheck(artist.id)}
                />
                {artist.name}
                <button
                  className="delete-btn"
                  onClick={() => {
                    setArtists(artists.filter((a) => a.id !== artist.id));
                  }}
                >
                  Delete
                </button>
                <button className="edit-btn" onClick={() => handleEdit(artist)}>
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      </center>
    </div>
  );
}

export default App;
