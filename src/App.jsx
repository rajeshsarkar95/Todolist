import { useState, useEffect } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import "./App.css";

let nextId = 0;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function App() {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState("");
  const [name, setName] = useState("");
  const [artists, setArtists] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showmessage, setShowmessage] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  const startListening = () => {
    setIsListening(true);
    recognition.start();
    setIsListening("")
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
    setIsListening("")
  };

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join("");
    setText(transcript);
  };

  recognition.onerror = (event) => {
    console.error(event.error);
  };

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
      setArtists([
        ...artists,
        { id: nextId++, name, impotent: false, checked: false },
      ]);
    }
    setName("");
  };

  const handleReverse = () => {
    const nextList = [...artists];
    nextList.reverse();
    setArtists(nextList);
    setIsReversed(!isReversed);
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

  useEffect(() => {
    const storedArtists = JSON.parse(localStorage.getItem("todos"));
    const storedIsReversed = JSON.parse(localStorage.getItem("isReversed"));

    if (storedArtists && storedArtists.length > 0) {
      setArtists(storedArtists);
    }
    if (storedIsReversed) {
      setIsReversed(storedIsReversed);
      if (storedIsReversed) {
        setArtists((prev) => [...prev].reverse());
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(artists));
    localStorage.setItem("isReversed", JSON.stringify(isReversed));
  }, [artists, isReversed]);

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
            value={name || text}
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
                className={`todo-item ${artist.checked ? "checked-item" : ""}`}
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
          <button onClick={startListening} disabled={isListening}>
            start speek
          </button>
          <button onClick={stopListening} disabled={!isListening}>
            stop speeck
          </button>
        </div>
      </center>
    </div>
  );
}

export default App;
