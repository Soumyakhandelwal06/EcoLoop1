import React from 'react';
import Header from '../components/common/Header';
import { Award, Droplets, Zap, Recycle, Leaf } from 'lucide-react';
import { useGame } from '../context/GameContext';

const Profile = () => {
    const { user } = useGame();

    if (!user) return <div className="text-center mt-20">Please Login</div>;

    // Derive badges from user progress (Simple logic for now)
    // If coins > 100 -> Waste Hero. If Level > 1 -> Water Saver.
    const dynamicBadges = [];
    if (user.coins >= 100) dynamicBadges.push({ id: 1, name: "Waste Hero", icon: <Recycle className="w-8 h-8 text-white"/>, color: "bg-green-500", date: "Just now" });
    if (user.progress && user.progress.some(p => p.level_id === 2 && p.status === 'completed')) dynamicBadges.push({ id: 2, name: "Water Saver", icon: <Droplets className="w-8 h-8 text-white"/>, color: "bg-blue-500", date: "Recently" });
    // Default badge
    if (dynamicBadges.length === 0) dynamicBadges.push({ id: 0, name: "Newbie", icon: <Leaf className="w-8 h-8 text-white"/>, color: "bg-gray-400", date: "Today" });

    const maxLevel = user.progress ? Math.max(1, ...user.progress.map(p => p.level_id)) : 1;

    // Use real user object (preserving badge structure for map)
    const profileData = {
        name: user.username,
        rank: user.coins > 500 ? "Eco Warrior" : "Eco Scout",
        level: maxLevel,
        coins: user.coins,
        badges: dynamicBadges
    };

    return (
        <div className="min-h-screen bg-green-50 pb-20">
            <Header />

            <main className="max-w-4xl mx-auto px-4">
                {/* Profile Header */}
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-32 h-32 bg-green-100 rounded-full border-4 border-green-500 flex items-center justify-center text-6xl shadow-inner">
                        👩‍🎓
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-3xl font-bold text-gray-800">{profileData.name}</h1>
                        <p className="text-xl text-green-600 font-bold mb-4">{profileData.rank}</p>
                        
                        <div className="flex justify-center md:justify-start gap-4">
                            <div className="bg-gray-100 px-6 py-3 rounded-2xl text-center">
                                <span className="block text-2xl font-bold text-gray-800">{profileData.level}</span>
                                <span className="text-xs text-gray-500 uppercase tracking-widest">Level</span>
                            </div>
                            <div className="bg-yellow-50 px-6 py-3 rounded-2xl text-center border border-yellow-200">
                                <span className="block text-2xl font-bold text-yellow-700">{profileData.coins}</span>
                                <span className="text-xs text-yellow-600 uppercase tracking-widest">EcoCoins</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Badges Section */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Award className="text-yellow-500" /> My Badges
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {profileData.badges.map((badge) => (
                        <div key={badge.id} className="bg-white p-6 rounded-3xl shadow hover:shadow-xl transition transform hover:-translate-y-2 flex flex-col items-center text-center group">
                            <div className={`${badge.color} p-4 rounded-full mb-4 shadow-lg group-hover:scale-110 transition`}>
                                {badge.icon}
                            </div>
                            <h3 className="font-bold text-gray-800">{badge.name}</h3>
                            <p className="text-xs text-gray-400 mt-1">Unlocked {badge.date}</p>
                        </div>
                    ))}
                    
                    {/* Locked Badge Placeholder */}
                    <div className="bg-gray-100 p-6 rounded-3xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center opacity-60">
                        <div className="bg-gray-300 p-4 rounded-full mb-4">
                            <Award className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="font-bold text-gray-500">Locked</h3>
                        <p className="text-xs text-gray-400 mt-1">Complete Level 5</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
