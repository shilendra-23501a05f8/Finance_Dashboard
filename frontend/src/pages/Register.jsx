import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('viewer');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password, role);
            alert("Registration successful! Please login.");
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="glass-card auth-box">
                <h2 className="auth-title">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="viewer">Viewer (Read only)</option>
                            <option value="analyst">Analyst (Read + Dashboard)</option>
                            <option value="admin">Admin (Full access)</option>
                        </select>
                    </div>
                    {error && <p style={{color: 'var(--danger)', marginBottom: '15px'}}>{error}</p>}
                    <button type="submit" className="btn" style={{width: '100%'}}>Register Account</button>
                    <div style={{ textAlign: 'center', marginTop: '15px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Already have an account? </span>
                        <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
