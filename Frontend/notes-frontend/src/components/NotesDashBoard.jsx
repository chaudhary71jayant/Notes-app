import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const emptyNote = {
  title: "",
  description: "",
  content: "",
};

const NotesDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [notes, setNotes] = useState([]);
  const [noteForm, setNoteForm] = useState(emptyNote);
  const [editingId, setEditingId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [profileResponse, notesResponse] = await Promise.all([
          api.get("/users/profile"),
          api.get("/notes"),
        ]);

        setProfile(profileResponse.data);
        setNotes(Array.isArray(notesResponse.data) ? notesResponse.data : []);
      } catch (err) {
        const message = err.response?.data?.message || "Session expired. Login again.";
        setError(message);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  const handleNoteChange = (event) => {
    const { name, value } = event.target;
    setNoteForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetEditor = () => {
    setNoteForm(emptyNote);
    setEditingId("");
  };

  const upsertNote = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (isEditing) {
        const response = await api.put(`/notes/${editingId}`, noteForm);
        const updatedNote = response.data?.note;

        if (updatedNote) {
          setNotes((prev) =>
            prev.map((note) => (note._id === editingId ? updatedNote : note)),
          );
        }
      } else {
        const response = await api.post("/notes", noteForm);
        const createdNote = response.data?.note;

        if (createdNote) {
          setNotes((prev) => [createdNote, ...prev]);
        }
      }

      resetEditor();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save note");
    } finally {
      setSaving(false);
    }
  };

  const startEditing = (note) => {
    setEditingId(note._id);
    setNoteForm({
      title: note.title,
      description: note.description,
      content: note.content,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));

      if (editingId === id) {
        resetEditor();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete note");
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/login");
    }
  };

  const deleteAccount = async () => {
    if (!profile?._id) return;

    const shouldDelete = window.confirm(
      "Delete your account and all access permanently?",
    );
    if (!shouldDelete) return;

    try {
      await api.delete(`/users/delete/${profile._id}`);
      navigate("/signup");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete account");
    }
  };

  if (loading) {
    return (
      <div className="page-shell">
        <div className="center-card">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <main className="dashboard">
        <header className="top-bar">
          <div>
            <p className="tag">Secure Notes</p>
            <h1>{profile ? `${profile.name}'s Workspace` : "My Notes"}</h1>
            <p className="subhead">
              Logged in as {profile?.email || "unknown"} | Age: {profile?.age ?? "-"}
            </p>
          </div>

          <div className="top-actions">
            <button className="btn-outline" onClick={logout} type="button">
              Logout
            </button>
            <button className="btn-danger" onClick={deleteAccount} type="button">
              Delete Account
            </button>
          </div>
        </header>

        <section className="panel">
          <h2>{isEditing ? "Edit note" : "Create a note"}</h2>
          <form className="stack gap-md" onSubmit={upsertNote}>
            <label className="field">
              <span>Title</span>
              <input
                name="title"
                value={noteForm.title}
                onChange={handleNoteChange}
                placeholder="Enter a short title"
                required
              />
            </label>

            <label className="field">
              <span>Description</span>
              <input
                name="description"
                value={noteForm.description}
                onChange={handleNoteChange}
                placeholder="One line summary"
                required
              />
            </label>

            <label className="field">
              <span>Content</span>
              <textarea
                name="content"
                value={noteForm.content}
                onChange={handleNoteChange}
                placeholder="Write your note content..."
                rows={5}
                required
              />
            </label>

            {error ? <p className="error-message">{error}</p> : null}

            <div className="actions-row">
              <button className="btn-primary" type="submit" disabled={saving}>
                {saving
                  ? isEditing
                    ? "Updating..."
                    : "Saving..."
                  : isEditing
                    ? "Update note"
                    : "Save note"}
              </button>

              {isEditing ? (
                <button className="btn-outline" type="button" onClick={resetEditor}>
                  Cancel edit
                </button>
              ) : null}
            </div>
          </form>
        </section>

        <section className="panel">
          <h2>Saved notes</h2>
          {notes.length === 0 ? (
            <p className="empty-state">No notes yet. Create your first note above.</p>
          ) : (
            <ul className="notes-grid">
              {notes.map((note) => (
                <li key={note._id} className="note-card">
                  <h3>{note.title}</h3>
                  <p className="note-description">{note.description}</p>
                  <p className="note-content">{note.content}</p>
                  <div className="actions-row">
                    <button
                      className="btn-outline"
                      type="button"
                      onClick={() => startEditing(note)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger"
                      type="button"
                      onClick={() => removeNote(note._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default NotesDashboard;
