import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { User, Lock, Mail, AlertCircle, CheckCircle2 } from 'lucide-react';

const SignUpPage = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await authAPI.register(formData);

            if (response) {
                setIsSuccess(true);
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="glass-card animate-fade-in" style={{ textAlign: 'center' }}>
                <CheckCircle2 size={64} color="var(--success)" style={{ marginBottom: '1rem' }} />
                <h2>Registration Successful!</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Welcome onboard, {formData.username}. Redirecting you to login...
                </p>
            </div>
        );
    }

    return (
        <div className="glass-card animate-fade-in">
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>Create Account</h2>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem' }}>
                Join our premium platform today
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
                            placeholder="choose a username"
                            required
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label>Email Address</label>
                    <div style={{ position: 'relative' }}>
                        <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="email"
                            name="email"
                            className="input-field"
                            style={{ paddingLeft: '2.5rem' }}
                            placeholder="john@example.com"
                            required
                            value={formData.email}
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

                {error && <div className="error-msg"><AlertCircle size={14} /> {error}</div>}

                <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }} disabled={loading}>
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Already have an account? <Link to="/login" className="link-text">Log In</Link>
            </p>
        </div>
    );
};

export default SignUpPage;
