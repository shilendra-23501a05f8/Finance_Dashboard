import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import BASE_URL from '../api';
import { Wallet, TrendingUp, TrendingDown, LogOut, Plus, Trash2, Edit, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, netBalance: 0 });
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [formData, setFormData] = useState({
        amount: '',
        type: 'income',
        category: '',
        date: new Date().toISOString().split('T')[0],
        notes: ''
    });

    const fetchDashboard = async () => {
        try {
           const requests = [axios.get(`${BASE_URL}/api/records`)];
           
           if (user && (user.role === 'admin' || user.role === 'analyst')) {
               requests.push(axios.get(`${BASE_URL}/api/dashboard/summary`));
           }
           
           const results = await Promise.all(requests);
           setRecords(results[0].data);
           
           if (results[1]) {
               setSummary(results[1].data);
           }
        } catch(e) {
            console.error(e);
            if (e.response && (e.response.status === 401 || e.response.status === 403)) {
                logout();
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        // Fetch only when user is loaded to determine correct roles
        if (user) {
            fetchDashboard();
        }
    }, [user]);

    const deleteRecord = async (id) => {
        if (!confirm("Are you sure?")) return;
        await axios.delete(`${BASE_URL}/api/records/${id}`);
        fetchDashboard();
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const openAddModal = () => {
        setCurrentRecord(null);
        setFormData({
            amount: '',
            type: 'income',
            category: '',
            date: new Date().toISOString().split('T')[0],
            notes: ''
        });
        setIsModalOpen(true);
    };

    const openEditModal = (record) => {
        setCurrentRecord(record);
        setFormData({
            amount: record.amount,
            type: record.type,
            category: record.category,
            date: new Date(record.date).toISOString().split('T')[0],
            notes: record.notes || ''
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentRecord(null);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentRecord) {
                await axios.put(`${BASE_URL}/api/records/${currentRecord._id}`, formData);
            } else {
                await axios.post(`${BASE_URL}/api/records`, formData);
            }
            closeModal();
            fetchDashboard();
        } catch (error) {
            console.error("Error saving record:", error);
            alert("Failed to save record.");
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar glass-card">
                <div className="nav-brand">
                    <Wallet size={28} color="var(--primary)" />
                    FinanceFlow
                </div>
                <div className="nav-actions">
                    <span style={{color: 'var(--text-muted)', textTransform: 'capitalize'}}>Role: {user?.role}</span>
                    <button className="btn btn-ghost" onClick={handleLogout}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </nav>

            {/* Summaries are only visible to admin and analyst */}
            {user && ['admin', 'analyst'].includes(user.role) && (
                <div className="summary-grid">
                    <div className="glass-card summary-card">
                        <div className="summary-icon icon-balance">
                            <Wallet size={32} />
                        </div>
                        <div className="summary-content">
                            <h3>Net Balance</h3>
                            <div className="value val-balance">${summary.netBalance}</div>
                        </div>
                    </div>
                    <div className="glass-card summary-card">
                        <div className="summary-icon icon-income">
                            <TrendingUp size={32} />
                        </div>
                        <div className="summary-content">
                            <h3>Total Income</h3>
                            <div className="value val-income">${summary.totalIncome}</div>
                        </div>
                    </div>
                    <div className="glass-card summary-card">
                        <div className="summary-icon icon-expense">
                            <TrendingDown size={32} />
                        </div>
                        <div className="summary-content">
                            <h3>Total Expense</h3>
                            <div className="value val-expense">${summary.totalExpense}</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="glass-card data-section">
                <div className="section-header">
                    <h2>Recent Records</h2>
                    {user?.role === 'admin' && (
                        <button className="btn" onClick={openAddModal}>
                            <Plus size={18} /> Add Record
                        </button>
                    )}
                </div>
                <div className="data-table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Notes</th>
                                {user?.role === 'admin' && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {records.map(r => (
                                <tr key={r._id}>
                                    <td>{new Date(r.date).toLocaleDateString()}</td>
                                    <td>{r.category}</td>
                                    <td>
                                        <span className={`type-badge type-${r.type}`}>
                                            {r.type}
                                        </span>
                                    </td>
                                    <td>${r.amount}</td>
                                    <td style={{color: 'var(--text-muted)'}}>{r.notes}</td>
                                    {user?.role === 'admin' && (
                                        <td>
                                            <div className="action-btns">
                                                <Edit size={16} className="action-icon" onClick={() => openEditModal(r)} />
                                                <Trash2 size={16} className="action-icon delete" onClick={() => deleteRecord(r._id)} />
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="glass-card modal-content">
                        <div className="modal-header">
                            <h2>{currentRecord ? 'Edit Record' : 'Add Record'}</h2>
                            <X size={24} className="action-icon" onClick={closeModal} />
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label>Amount</label>
                                <input 
                                    type="number" 
                                    name="amount"
                                    value={formData.amount} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Type</label>
                                <select 
                                    name="type" 
                                    value={formData.type}
                                    onChange={handleInputChange}
                                >
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <input 
                                    type="text" 
                                    name="category"
                                    value={formData.category} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Date</label>
                                <input 
                                    type="date" 
                                    name="date"
                                    value={formData.date} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Notes</label>
                                <input 
                                    type="text" 
                                    name="notes"
                                    value={formData.notes} 
                                    onChange={handleInputChange} 
                                />
                            </div>
                            <div className="form-group" style={{marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
                                <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="btn">Save Record</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
