'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');
    const url = isLogin
      ? 'http://127.0.0.1:5000/api/auth/login'
      : 'http://127.0.0.1:5000/api/auth/register';

    const body = isLogin
      ? { email: form.email, password: form.password }
      : { username: form.username, email: form.email, password: form.password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        setMessage('✅ ' + data.message + ' — Redirecting...');
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';

      } else {
        setMessage('❌ ' + (data.message || 'Something went wrong'));
      }
    } catch (err) {
      setMessage('❌ Could not connect to server.');
    }
    setLoading(false);
  };

  return (
    <main style={styles.bg}>
      <div style={styles.grid}>
        {[...Array(30)].map((_, i) => (
          <div key={i} style={styles.gridCell} />
        ))}
      </div>

      <div style={styles.card}>
        <div style={styles.logoRow}>
          <span style={styles.logoIcon}>{'</>'}</span>
          <span style={styles.logoText}>PyPlay</span>
        </div>

        <p style={styles.tagline}>Learn Python. Level up. Every day.</p>

        <div style={styles.tabRow}>
          <button
            style={{ ...styles.tab, ...(isLogin ? styles.tabActive : {}) }}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            style={{ ...styles.tab, ...(!isLogin ? styles.tabActive : {}) }}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <div style={styles.form}>
          {!isLogin && (
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              style={styles.input}
            />
          )}
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />

          <button onClick={handleSubmit} style={styles.btn} disabled={loading}>
            {loading ? 'Please wait...' : isLogin ? '🚀 Login' : '🎮 Create Account'}
          </button>

          {message && <p style={styles.msg}>{message}</p>}
        </div>

        <div style={styles.xpBar}>
          <div style={styles.xpFill} />
        </div>
        <p style={styles.xpLabel}>🔥 Start your streak today</p>
      </div>
    </main>
  );
}

const styles = {
  bg: {
    minHeight: '100vh',
    background: '#0d0d0f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Courier New', monospace",
    position: 'relative',
    overflow: 'hidden',
  },
  grid: {
    position: 'absolute',
    inset: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gridTemplateRows: 'repeat(5, 1fr)',
    opacity: 0.04,
    pointerEvents: 'none',
  },
  gridCell: {
    border: '1px solid #4ade80',
  },
  card: {
    background: '#16181c',
    border: '1px solid #2a2d35',
    borderRadius: '16px',
    padding: '2.5rem 2rem',
    width: '100%',
    maxWidth: '400px',
    position: 'relative',
    zIndex: 1,
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
  },
  logoIcon: {
    background: '#4ade80',
    color: '#0d0d0f',
    fontWeight: 'bold',
    fontSize: '14px',
    padding: '6px 10px',
    borderRadius: '8px',
  },
  logoText: {
    fontSize: '26px',
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: '-0.5px',
  },
  tagline: {
    color: '#6b7280',
    fontSize: '13px',
    marginBottom: '28px',
    marginTop: '2px',
  },
  tabRow: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
  },
  tab: {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #2a2d35',
    background: 'transparent',
    color: '#6b7280',
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: "'Courier New', monospace",
    transition: 'all 0.2s',
  },
  tabActive: {
    background: '#4ade80',
    color: '#0d0d0f',
    border: '1px solid #4ade80',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    background: '#0d0d0f',
    border: '1px solid #2a2d35',
    borderRadius: '8px',
    padding: '12px 14px',
    color: '#ffffff',
    fontSize: '14px',
    fontFamily: "'Courier New', monospace",
    outline: 'none',
  },
  btn: {
    background: '#4ade80',
    color: '#0d0d0f',
    border: 'none',
    borderRadius: '8px',
    padding: '13px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: "'Courier New', monospace",
    marginTop: '4px',
    transition: 'opacity 0.2s',
  },
  msg: {
    fontSize: '13px',
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: '4px',
  },
  xpBar: {
    height: '3px',
    background: '#2a2d35',
    borderRadius: '99px',
    marginTop: '28px',
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    width: '0%',
    background: '#4ade80',
    borderRadius: '99px',
  },
  xpLabel: {
    color: '#4b5563',
    fontSize: '12px',
    textAlign: 'center',
    marginTop: '8px',
  },
};