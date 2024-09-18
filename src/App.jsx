/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

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
    }else{
      setArtists([...artists, { id: nextId++, name: name, checked: false, impotent: false }]);
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
    <div>
      <center>
        {showmessage === false ? "Task Not Completed" : "Completed"}
        <h1>Todo List</h1>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={handleAdd}>{editId !== null ? "Update" : "ADD"}</button>
        <button onClick={handleReverse}>Reverse</button>
        <ul>
          {artists.map((artist) => (
            <li
              style={{
                textDecoration: artist.checked ? "line-through" : "none",
              }}
              key={artist.id}
            >
              {artist.impotent ? (
                <i>
                  <FaStar onClick={() => handleImpotent(artist.id)} />
                </i>
              ) : (
                <i>
                  <CiStar onClick={() => handleImpotent(artist.id)} />
                </i>
              )}
              <input
                type="checkbox"
                checked={artist.checked}
                onChange={() => handleCheck(artist.id)}
              />
              {artist.name}
              <button
                onClick={() => {
                  setArtists(artists.filter((a) => a.id !== artist.id));
                }}
              >
                Delete
              </button>
              <button onClick={() => handleEdit(artist)}>Edit</button>
            </li>
          ))}
        </ul>
      </center>
    </div>
  );
}

export default App;
