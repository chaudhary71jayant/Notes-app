import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/users/signup", {
        ...form,
        age: Number(form.age),
      });
      setSuccess("Signup successful. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <p className="tag">Notes App</p>
        <h1>Create Account</h1>
        <p className="subhead">
          Create your profile and start managing your notes.
        </p>

        <form onSubmit={handleSignup} className="stack gap-md">
          <label className="field">
            <span>Name</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </label>

          <label className="field">
            <span>Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="field">
            <span>Age</span>
            <input
              name="age"
              type="number"
              min="1"
              value={form.age}
              onChange={handleChange}
              placeholder="18"
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <div className="password-field">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                minLength={6}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3.3 2.3 2 3.6l4.1 4.1C4.2 9 2.8 10.8 2 12c1.7 2.6 5 6 10 6 2 0 3.8-.5 5.3-1.3l3.4 3.4 1.3-1.3Zm7.1 7.1 1.6 1.6a2.3 2.3 0 0 1 2.1 2.1l1.6 1.6a4.6 4.6 0 0 0-5.3-5.3Zm1.6-3.4c5 0 8.3 3.4 10 6-1.1 1.7-2.9 3.8-5.5 5l-1.6-1.6a6.8 6.8 0 0 0 2.7-3.4A6.8 6.8 0 0 0 12 7.2Z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 5C7 5 3.7 8.4 2 11c1.7 2.6 5 6 10 6s8.3-3.4 10-6c-1.7-2.6-5-6-10-6Zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-2.2a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z" />
                  </svg>
                )}
              </button>
            </div>
          </label>

          {error ? <p className="error-message">{error}</p> : null}
          {success ? <p className="success-message">{success}</p> : null}

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="helper-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
