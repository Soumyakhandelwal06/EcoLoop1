import React, { useState } from 'react';
import { Leaf, Coins, Flame, LogOut, Trophy, ShoppingBag, Target, Globe, Info, Mail, Menu } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import StreakCalendar from './StreakCalendar';
import ChallengesModal from '../gamification/ChallengesModal';

const Header = () => {
    const { user, logout } = useGame();
    const navigate = useNavigate();
    const location = useLocation();
    const [showCalendar, setShowCalendar] = useState(false);
    const [isChallengesOpen, setIsChallengesOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to landing/login
    };

    // If loading or no user, still show the Logo at least
    const isLoggedIn = !!user;

    const IconButton = ({ to, icon: Icon, colorClass, title, onClick }) => {
        const isActive = to ? location.pathname === to : false;

        return (
            <div className="relative group">
                <Link
                    to={to}
                    onClick={onClick}
                    title={title}
                    className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300
                        ${isActive
                            ? 'bg-slate-800 text-white shadow-lg scale-105'
                            : 'bg-slate-50 text-slate-500 hover:bg-white hover:text-green-600 hover:shadow-md hover:-translate-y-0.5'
                        }
                    `}
                >
                    <Icon className="w-5 h-5" strokeWidth={2.5} />
                </Link>
                {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>
                )}
            </div>
        );
    };

    const NavLink = ({ to, label, icon: Icon }) => {
        const isActive = location.pathname === to;
        return (
            <Link
                to={to}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 font-bold text-sm
                    ${isActive
                        ? 'text-green-700 bg-green-50'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }
                `}
            >
                {Icon && <Icon className="w-4 h-4" strokeWidth={2.5} />}
                <span>{label}</span>
            </Link>
        )
    }

    return (
        <>
            <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center gap-4">

                    {/* LEFT: Brand & Main Nav */}
                    <div className="flex items-center gap-8">
                        <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white shadow-green-200 shadow-md group-hover:rotate-6 transition-transform">
                                <Leaf className="w-5 h-5" />
                            </div>
                            <span className="font-black text-xl text-slate-800 tracking-tight hidden sm:block">EcoLoop</span>
                        </Link>

                        {isLoggedIn && (
                            <nav className="hidden md:flex items-center gap-1">
                                <NavLink to="/dashboard" label="Play" />
                                <NavLink to="/community" label="Community" />
                                <NavLink to="/about" label="About" />
                                <NavLink to="/contact" label="Contact" />
                            </nav>
                        )}
                    </div>

                    {/* RIGHT: Stats & Actions */}
                    <div className="flex items-center gap-3">
                        {!isLoggedIn ? (
                            <div className="flex gap-4 items-center">
                                <Link to="/about" className="text-sm font-bold text-slate-500 hover:text-green-600">About</Link>
                                <Link to="/contact" className="text-sm font-bold text-slate-500 hover:text-green-600">Contact</Link>
                                <Link to="/" className="bg-green-600 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-green-700 transition shadow-lg shadow-green-200">
                                    Login
                                </Link>
                            </div>
                        ) : (
                            <>
                                {/* Stats Group */}
                                <div className="hidden lg:flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 mr-2">
                                    <div
                                        className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition"
                                        onClick={() => setShowCalendar(true)}
                                        title="View Streak"
                                    >
                                        <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
                                        <span className="font-extrabold text-slate-700 text-sm">{user.streak}</span>
                                    </div>
                                    <div className="w-px h-4 bg-slate-200"></div>
                                    <div className="flex items-center gap-1.5">
                                        <Coins className="w-4 h-4 text-yellow-500 fill-yellow-400" />
                                        <span className="font-extrabold text-slate-700 text-sm">{user.coins}</span>
                                    </div>
                                </div>

                                {/* Tools Group (Icons) */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsChallengesOpen(true)}
                                        className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:bg-white hover:text-emerald-600 hover:shadow-md transition-all group"
                                        title="Challenges"
                                    >
                                        <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white z-10"></div>
                                        <Target className="w-5 h-5" strokeWidth={2.5} />
                                    </button>

                                    <IconButton to="/leaderboard" icon={Trophy} title="Leaderboard" />
                                    <IconButton to="/store" icon={ShoppingBag} title="Store" />

                                    {/* Divider */}
                                    <div className="w-px h-8 bg-slate-100 mx-1"></div>

                                    {/* Profile */}
                                    <Link to="/profile" className="flex items-center gap-2 group">
                                        <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center border-2 border-transparent group-hover:border-green-200 transition overflow-hidden">
                                            <span className="text-lg">👩‍🎓</span>
                                        </div>
                                    </Link>

                                    <button onClick={handleLogout} className="text-slate-300 hover:text-red-500 transition ml-1" title="Logout">
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>


            {/* Streak Calendar Modal */}
            {isLoggedIn && (
                <>
                    <StreakCalendar
                        isOpen={showCalendar}
                        onClose={() => setShowCalendar(false)}
                        streak={user.streak}
                    />
                    <ChallengesModal
                        isOpen={isChallengesOpen}
                        onClose={() => setIsChallengesOpen(false)}
                    />
                </>
            )}
        </>
    );
};

export default Header;
