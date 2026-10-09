// Example of wiring YOUR existing login form to the backend.
// Keep your own JSX/CSS -- only the state + submit handler below need to be copied in.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

export default function LoginExample() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(identifier, password, remember);
      navigate("/dashboard");
    } catch (err) {
      setError(err.status === 429 ? "Too many attempts. Wait a minute and try again." : err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <label><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember Me</label>
      {error && <p role="alert">{error}</p>}
      <button disabled={loading}>{loading ? "Signing in..." : "Employee Sign In"}</button>
    </form>
  );
}
