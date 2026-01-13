import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { Leaf, Lock, Mail, User } from 'lucide-react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login, register } = useGame();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            let res;
            if (isLogin) {
                res = await login(formData.username, formData.password);
            } else {
                res = await register(formData.username, formData.email, formData.password);
            }

            if (res.success) {
                navigate('/dashboard');
            } else {
                setError(res.error || "Authentication failed. Server might be down.");
            }
        } catch (err) {
            setError("Unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-400 to-green-600 flex items-center justify-center p-4">
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md border-4 border-white">
                <div className="flex justify-center mb-6">
                    <div className="bg-green-100 p-4 rounded-full">
                        <Leaf className="w-10 h-10 text-green-600" />
                    </div>
                </div>
                
                <h2 className="text-3xl font-extrabold text-center text-green-800 mb-2">
                    {isLogin ? 'Welcome Back!' : 'Join the Squad!'}
                </h2>
                <p className="text-center text-gray-500 mb-8 font-semibold">
                    {isLogin ? 'Ready to save the planet?' : 'Start your eco-journey today.'}
                </p>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-bold text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                     {!isLogin && (
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input 
                                type="email" 
                                placeholder="Email Address"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-green-100 focus:border-green-500 focus:outline-none transition font-bold text-gray-700 placeholder-gray-400"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                            />
                        </div>
                    )}
                    
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Username"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-green-100 focus:border-green-500 focus:outline-none transition font-bold text-gray-700 placeholder-gray-400"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input 
                            type="password" 
                            placeholder="Password"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-green-100 focus:border-green-500 focus:outline-none transition font-bold text-gray-700 placeholder-gray-400"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-green-500 hover:bg-green-600 text-white font-extrabold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all text-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Wait...</span>
                            </div>
                        ) : (isLogin ? 'LOGIN' : 'SIGN UP')}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button 
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-green-600 font-bold hover:underline"
                    >
                        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
