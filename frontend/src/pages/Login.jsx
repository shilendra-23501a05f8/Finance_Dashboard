import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="glass-card auth-box">
                <h2 className="auth-title">FinanceFlow</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    {error && <p style={{color: 'var(--danger)', marginBottom: '15px'}}>{error}</p>}
                    <button type="submit" className="btn" style={{width: '100%'}}>Sign In</button>
                    <div style={{ textAlign: 'center', marginTop: '15px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Don't have an account? </span>
                        <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Register here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
