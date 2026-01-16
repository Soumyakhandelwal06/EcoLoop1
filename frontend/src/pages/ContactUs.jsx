import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const ContactUs = () => {
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
            await axios.post('http://localhost:8000/contact', formData);
            setStatus('success');
            setFormData({ org_name: '', email: '', location: '', category: 'Greenery', description: '', website: '' });
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="flex-1 max-w-2xl mx-auto px-6 py-10 w-full">
                <h1 className="text-4xl font-black text-slate-800 mb-2 text-center">Contact Us 📩</h1>
                <p className="text-center text-slate-500 mb-8">Are you an NGO or Initiative? Request to be featured!</p>

                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
                    {status === 'success' ? (
                        <div className="text-center py-10">
                            <div className="text-5xl mb-4">✅</div>
                            <h2 className="text-2xl font-bold text-green-600 mb-2">Request Sent!</h2>
                            <p className="text-slate-600">Thank you. Our team will review your submission shortly.</p>
                            <button onClick={() => setStatus('idle')} className="mt-6 text-green-600 font-bold underline">Submit another</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
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

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-lg hover:shadow-green-200 disabled:opacity-50"
                            >
                                {status === 'submitting' ? 'Sending...' : 'Submit Request'}
                            </button>

                            {status === 'error' && <p className="text-red-500 text-center text-sm font-bold">Something went wrong. Please try again.</p>}
                        </form>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactUs;
