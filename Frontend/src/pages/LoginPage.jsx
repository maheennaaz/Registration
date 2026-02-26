import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { LogIn, Lock, User, AlertCircle } from 'lucide-react';

const LoginPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await authAPI.login(formData);

            if (response) {
                // The backend sends the token in a cookie
                login(response.user || { username: formData.username });
                navigate('/dashboard');
            } else {
                setError('Invalid username or password.');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Authentication failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <div style={{ background: 'var(--primary)', padding: '1rem', borderRadius: '50%', display: 'flex' }}>
                    <LogIn size={32} color="white" />
                </div>
            </div>

            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>Welcome Back</h2>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem' }}>
                Please enter your details to sign in
            </p>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Username</label>
                    <div style={{ position: 'relative' }}>
                        <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            name="username"
                            className="input-field"
                            style={{ paddingLeft: '2.5rem' }}
                            placeholder="your username"
                            required
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="password"
                            name="password"
                            className="input-field"
                            style={{ paddingLeft: '2.5rem' }}
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {error && <div className="error-msg" style={{ marginBottom: '1rem' }}><AlertCircle size={14} /> {error}</div>}

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Authenticating...' : 'Sign In'}
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Don't have an account? <Link to="/signup" className="link-text">Sign Up</Link>
            </p>
        </div>
    );
};

export default LoginPage;
