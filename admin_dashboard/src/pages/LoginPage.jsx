import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const base =
        import.meta.env.VITE_BACKEND_URL || "https://portfolioo-backend.onrender.com";
      const res = await fetch(`${base}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to login');
      }

      const { token } = await res.json();
      localStorage.setItem('token', token);
      navigate('/'); // Redirect to dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#1e1e1e', color: 'white' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem', background: '#2a2a2a', borderRadius: '8px', minWidth: '300px' }}>
        <h2>Admin Login</h2>
        {error && <p style={{ color: 'crimson', margin: '0.5rem 0' }}>{error}</p>}
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '0.5rem' }} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: '0.5rem' }} 
        />
        <button type="submit" style={{ padding: '0.7rem', background: 'crimson', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
