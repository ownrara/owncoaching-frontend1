import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader/PageHeader";
import { signup } from "../../api/auth.api";
import { setSession } from "../../auth/session";

function Signup() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await signup(email, password);

      // Signup returns client by default
      setSession({
        userId: res.user.id,
        role: res.user.role, // client
        clientId: res.user.clientId,
        email: res.user.email,
      });

      nav("/client/dashboard");
    } catch (err) {
      alert(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="section">
      <PageHeader
        breadcrumb="Auth / Signup"
        title="Create Account"
        subtitle="Clients sign up by default"
      />

      <div className="card" style={{ padding: 16, maxWidth: 520 }}>
        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", marginBottom: 6 }}>Email</label>
          <input
            className="editInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@test.com"
          />

          <div style={{ height: 12 }} />

          <label style={{ display: "block", marginBottom: 6 }}>Password</label>
          <input
            className="editInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••"
          />

          <div style={{ height: 16 }} />

          <button className="primaryBtn" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Signup"}
          </button>

          <div style={{ marginTop: 12 }}>
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
