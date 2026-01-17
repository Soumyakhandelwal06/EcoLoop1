import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Leaf, ArrowLeft } from 'lucide-react';
import Header from '../components/common/Header';
import { useGame } from '../context/GameContext';


const ContactUs = () => {
    const { user } = useGame();
    const [formData, setFormData] = useState({
        org_name: '',
        email: '',
        location: '',
        category: 'Greenery',
        description: '',
        website: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/contact`, formData);
            setStatus('success');
            setFormData({ org_name: '', email: '', location: '', category: 'Greenery', description: '', website: '' });
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {user ? (
                <Header />
            ) : (
                <nav className="bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <Leaf className="text-green-600 w-6 h-6" />
                            <h1 className="text-xl font-bold text-green-800">EcoLoop</h1>
                        </Link>
                        <Link to="/" className="text-slate-500 font-bold hover:text-green-600 flex items-center gap-2 text-sm">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Link>
                    </div>
                </nav>
            )}
            <main className="flex-1 max-w-2xl mx-auto px-6 py-10 w-full">
                {user ? (
                    <>
                        <h1 className="text-4xl font-black text-slate-800 mb-2 text-center">Help & Support 🛠️</h1>
                        <p className="text-center text-slate-500 mb-8">Found a bug? Have an idea? Let us know!</p>
                    </>
                ) : (
                    <>
                        <h1 className="text-4xl font-black text-slate-800 mb-2 text-center">Contact Us 📩</h1>
                        <p className="text-center text-slate-500 mb-8">Are you an NGO or Initiative? Request to be featured!</p>
                    </>
                )}

                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
                    {status === 'success' ? (
                        <div className="text-center py-10">
                            <div className="text-5xl mb-4">✅</div>
                            <h2 className="text-2xl font-bold text-green-600 mb-2">Message Sent!</h2>
                            <p className="text-slate-600">Thanks for your feedback! We'll look into it.</p>
                            <button onClick={() => setStatus('idle')} className="mt-6 text-green-600 font-bold underline">Send another</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!user ? (
                                // PUBLIC / NGO FORM
                                <>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Organization Name</label>
                                        <input type="text" required name="org_name" value={formData.org_name} onChange={handleChange} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none" placeholder="e.g. Green Earth Warriors" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                                        <input type="email" required name="email" value={formData.email} onChange={handleChange} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none" placeholder="contact@example.org" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">Location</label>
                                            <input type="text" required name="location" value={formData.location} onChange={handleChange} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none" placeholder="City, Country" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">Cause Category</label>
                                            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none">
                                                <option value="Greenery">Greenery 🌳</option>
                                                <option value="Water">Water 💧</option>
                                                <option value="Waste">Waste ♻️</option>
                                                <option value="Energy">Energy ⚡</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Website / Social Link</label>
                                        <input type="url" required name="website" value={formData.website} onChange={handleChange} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none" placeholder="https://..." />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Short Description</label>
                                        <textarea required name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none" placeholder="Tell us about your initiative..."></textarea>
                                    </div>
                                </>
                            ) : (
                                // STUDENT LOGGED IN FORM
                                <>
                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm">
                                            👋
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-blue-400 uppercase tracking-wide">Logged in as</p>
                                            <p className="font-bold text-blue-800">{user.username}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Subject</label>
                                        <input type="text" required name="subject" value={formData.subject || ''} onChange={handleChange} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none" placeholder="e.g. I found a bug in level 2" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                                        <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none">
                                            <option value="Bug Report">Bug Report 🐞</option>
                                            <option value="Feature Request">Feature Request 💡</option>
                                            <option value="Account Help">Account Help 🔑</option>
                                            <option value="Other">Other 💭</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Message</label>
                                        <textarea required name="description" value={formData.description} onChange={handleChange} rows="5" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none" placeholder="Describe your issue or idea..."></textarea>
                                    </div>
                                </>
                            )}


                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-lg hover:shadow-green-200 disabled:opacity-50"
                            >
                                {status === 'submitting' ? 'Sending...' : 'Submit'}
                            </button>

                            {status === 'error' && <p className="text-red-500 text-center text-sm font-bold">Something went wrong. Please try again.</p>}
                        </form>
                    )}
                </div>
            </main>

        </div>
    );
};

export default ContactUs;
