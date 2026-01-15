import React from 'react';
import Header from '../components/common/Header';
import { 
    Award, Droplets, Recycle, Leaf, ArrowLeft, Wind, Trash2, 
    History, TrendingUp, ShieldCheck, QrCode, Download, Fingerprint, Share2
} from 'lucide-react'; 
import { useGame } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';



const Profile = () => {
    const { user, levels } = useGame();
    const navigate = useNavigate();
    const cardRef = React.useRef(null);

    const handleDownload = async () => {
        if (!cardRef.current) return;
        const canvas = await html2canvas(cardRef.current, {
            scale: 2,
            backgroundColor: null,
            logging: false,
            useCORS: true
        });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `${user.username}_EcoHero_ID.png`;
        link.click();
    };

    const handleShare = async () => {
        if (!cardRef.current) return;
        try {
            const canvas = await html2canvas(cardRef.current, { scale: 1.5, backgroundColor: null });
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
            const file = new File([blob], 'EcoHero_ID.png', { type: 'image/png' });
            
            if (navigator.share) {
                await navigator.share({
                    files: [file],
                    title: 'My EcoHero Identity',
                    text: 'I just leveled up on EcoLoop! Check out my official Guardian ID! 🌍'
                });
            } else {
                // Fallback: Copy to clipboard or just alert
                alert("Sharing not supported on this browser. Try Downloading!");
            }
        } catch (err) {
            console.error("Share failed:", err);
        }
    };

    if (!user) return <div className="text-center mt-20">Please Login</div>;

    // --- BADGE CONFIGURATION ---
    const dynamicBadges = [];

    // Badge 1: Waste Hero (Coins > 100)
    if (user.coins >= 100) {
        dynamicBadges.push({ 
            id: 1, 
            name: "Waste Hero", 
            image: "/badges/waste-hero.png", 
            fallbackIcon: <Recycle className="w-8 h-8 text-white"/>,
            color: "bg-green-500", 
            date: "Just now" 
        });
    }

    const completedLevelsCount = user.progress 
        ? user.progress.filter(p => p.status === 'completed' || p.status === 'COMPLETED').length 
        : 0;

    const completedChallengesCount = user.challenge_completions ? user.challenge_completions.length : 0;
    const maxLevel = user.progress && user.progress.length > 0 ? Math.max(...user.progress.map(p => p.level_id)) : 1;

    const ranks = [
        "Eco Beginner",
        "Climate Champion", 
        "Resource Guardian",
        "Green Practitioner",
        "Climate Aware Advocate"
    ];
    const currentRank = ranks[Math.min(maxLevel - 1, ranks.length - 1)];

    // --- GRANULAR IMPACT CALCULATIONS (Theme-Based) ---
    // Mapping themes to impact values per completion
    const themeImpactMap = {
        'forest':   { co2: 5.0, water: 2.0,  waste: 0.5 },
        'river':    { co2: 1.0, water: 40.0, waste: 1.0 },
        'city':     { co2: 2.0, water: 5.0,  waste: 12.0 },
        'mountain': { co2: 8.0, water: 1.0,  waste: 0.2 },
        'sky':      { co2: 15.0, water: 0.0, waste: 0.0 }
    };

    let calculatedCO2 = 0;
    let calculatedWater = 0;
    let calculatedWaste = 0;

    // 1. Calculate impact from completed levels
    if (user.progress && levels) {
        user.progress.forEach(p => {
            if (p.status.toLowerCase() === 'completed') {
                const levelMeta = levels.find(l => l.id === p.level_id);
                if (levelMeta && themeImpactMap[levelMeta.theme_id]) {
                    const impact = themeImpactMap[levelMeta.theme_id];
                    calculatedCO2 += impact.co2;
                    calculatedWater += impact.water;
                    calculatedWaste += impact.waste;
                }
            }
        });
    }

    // 2. Add impact from challenges (Baseline)
    calculatedCO2 += completedChallengesCount * 1.2;
    calculatedWater += completedChallengesCount * 8.5;
    calculatedWaste += completedChallengesCount * 0.8;

    // 3. Add coin-based "Global Action" impact (Every coin represents micro-actions)
    calculatedCO2 += ((user.coins || 0) * 0.05);
    calculatedWater += ((user.coins || 0) * 0.5);
    calculatedWaste += ((user.coins || 0) * 0.02);

    // 4. Streak Multiplier (Consistency pays off!)
    const streakMultiplier = 1 + (Math.min(user.streak || 0, 30) * 0.02); // Up to 60% bonus for 30-day streak
    calculatedCO2 *= streakMultiplier;
    calculatedWater *= streakMultiplier;
    calculatedWaste *= streakMultiplier;

    const impactStats = [
        { 
            label: "CO2 Saved", 
            value: `${calculatedCO2.toFixed(1)}kg`, 
            icon: <Wind className="w-6 h-6 text-blue-500" />,
            color: "bg-blue-50"
        },
        { 
            label: "Water Saved", 
            value: `${calculatedWater.toFixed(0)}L`, 
            icon: <Droplets className="w-6 h-6 text-cyan-500" />,
            color: "bg-cyan-50"
        },
        { 
            label: "Waste Recycled", 
            value: `${calculatedWaste.toFixed(1)}kg`, 
            icon: <Trash2 className="w-6 h-6 text-green-500" />,
            color: "bg-green-50"
        }
    ];

    if (completedLevelsCount >= 2) {
        dynamicBadges.push({ 
            id: 2, 
            name: "Water Saver", 
            image: "/badges/water-saver.png", 
            fallbackIcon: <Droplets className="w-8 h-8 text-white"/>,
            color: "bg-blue-500", 
            date: "Recently" 
        });
    }

    dynamicBadges.push({ 
        id: 0, 
        name: "Newbie", 
        image: "/badges/newbie.png", 
        fallbackIcon: <Leaf className="w-8 h-8 text-white"/>,
        color: "bg-gray-400", 
        date: "Today" 
    });

    dynamicBadges.sort((a, b) => a.id - b.id);

    const totalLevels = 5;
    const levelProgress = (maxLevel / totalLevels) * 100;

    const profileData = {
        name: user.username,
        rank: currentRank,
        level: maxLevel,
        coins: user.coins,
        badges: dynamicBadges,
        impact: impactStats,
        recentActivity: user.challenge_completions ? user.challenge_completions.slice(-3).reverse() : []
    };

    return (
        <div className="min-h-screen bg-green-50 pb-20">
            <Header />

            <main className="max-w-4xl mx-auto px-4">
                {/* Back Button */}
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="mb-6 flex items-center gap-2 text-green-700 font-bold hover:text-green-800 transition group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </button>

                {/* Profile Header */}
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 flex flex-col md:flex-row items-center gap-8 border-b-8 border-green-500">
                    <div className="w-32 h-32 bg-green-100 rounded-full border-4 border-green-500 flex items-center justify-center text-6xl shadow-inner overflow-hidden relative group">
                        {user.profile_image ? (
                            <img src={user.profile_image} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <span>👩‍🎓</span>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer">
                            <span className="text-white text-xs font-bold uppercase">Change</span>
                        </div>
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                            <h1 className="text-4xl font-black text-gray-800 tracking-tight">{profileData.name}</h1>
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black uppercase flex items-center gap-1 w-fit mx-auto md:mx-0">
                                <ShieldCheck size={14} /> Verified Guardian
                            </span>
                        </div>
                        <p className="text-xl text-green-600 font-bold mb-6 flex items-center justify-center md:justify-start gap-2">
                            <TrendingUp size={20} /> {profileData.rank}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto md:mx-0">
                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                <span className="block text-2xl font-black text-gray-800">{profileData.level}</span>
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Global Level</span>
                                <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2">
                                    <div className="bg-green-500 h-full rounded-full" style={{ width: `${levelProgress}%` }}></div>
                                </div>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100">
                                <span className="block text-2xl font-black text-yellow-700">{profileData.coins}</span>
                                <span className="text-[10px] text-yellow-600 font-bold uppercase tracking-widest">EcoCoins</span>
                                <div className="flex gap-1 mt-2">
                                    {[1,2,3].map(i => <div key={i} className="w-3 h-3 bg-yellow-400 rounded-full blur-[2px] opacity-50 animate-pulse"></div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Impact Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {profileData.impact.map((stat, i) => (
                        <motion.div 
                            key={i} 
                            whileHover={{ y: -5 }}
                            className={`${stat.color} p-6 rounded-3xl border border-white shadow-sm flex items-center gap-4`}
                        >
                            <div className="bg-white p-3 rounded-2xl shadow-sm italic">
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-2xl font-black text-gray-800">{stat.value}</p>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* VIRTUAL ECO-HERO ID CARD */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 relative group"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
                            <Fingerprint className="text-green-600" /> Virtual Hero ID
                        </h2>
                        <div className="flex gap-2">
                             <button 
                                onClick={handleShare}
                                className="flex items-center gap-2 bg-white text-gray-600 px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:shadow-md transition active:scale-95"
                             >
                                <Share2 size={14} /> Share
                             </button>
                             <button 
                                onClick={handleDownload}
                                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg hover:bg-green-700 transition active:scale-95"
                             >
                                <Download size={14} /> Download
                             </button>
                        </div>
                    </div>

                    <div ref={cardRef} className="relative w-full max-w-xl mx-auto aspect-[1.6/1] bg-white rounded-[40px] shadow-2xl overflow-hidden border-2 border-gray-100">
                        {/* ID Card Background Decor */}
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-green-600 skew-x-[-12deg] translate-x-12"></div>
                        <div className="absolute top-[-10%] left-[-10%] w-40 h-40 bg-green-50 rounded-full blur-3xl opacity-50"></div>
                        
                        <div className="relative h-full flex flex-col p-8 z-10">
                            {/* Card Top */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-2">
                                    <Leaf className="text-green-600 w-8 h-8" />
                                    <span className="font-black text-xl text-green-800 tracking-tighter uppercase">EcoLoop</span>
                                </div>
                                <div className="bg-green-700 text-white px-2 py-1 rounded-md text-[8px] font-black tracking-widest uppercase">
                                    Official Guardian
                                </div>
                            </div>

                            <div className="flex gap-8 flex-1">
                                {/* Photo & QR */}
                                <div className="space-y-4">
                                    <div className="w-24 h-24 rounded-2xl border-4 border-green-100 bg-gray-50 shadow-inner flex items-center justify-center text-5xl overflow-hidden">
                                        {user.profile_image ? (
                                            <img src={user.profile_image} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <span>👩‍🎓</span>
                                        )}
                                    </div>
                                    <div className="w-24 h-24 bg-white rounded-2xl border border-gray-100 p-2 flex items-center justify-center shadow-sm">
                                        <QrCode className="w-full h-full text-gray-300" strokeWidth={1} />
                                    </div>
                                </div>

                                {/* Information */}
                                <div className="flex-1 py-1">
                                    <div className="mb-4">
                                        <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest">Global Guardian ID</label>
                                        <p className="text-xl font-black text-gray-800 tracking-tight uppercase">{user.id ? `EL-${user.id.toString().padStart(6, '0')}` : 'EL-000452'}</p>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                                        <p className="text-lg font-black text-gray-800 tracking-tight">{user.username}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest">Current Status</label>
                                            <p className="text-sm font-black text-green-600">{profileData.rank}</p>
                                        </div>
                                        <div>
                                            <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest">Level</label>
                                            <p className="text-sm font-black text-green-600">{profileData.level}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
                                        <div className="flex gap-4">
                                            {profileData.impact.slice(0, 2).map((s, idx) => (
                                                <div key={idx}>
                                                    <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest">{s.label}</span>
                                                    <span className="text-xs font-bold text-gray-700">{s.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Chip Decor */}
                            <div className="absolute bottom-10 right-10 flex gap-1 opacity-20">
                                <div className="w-6 h-6 border-2 border-white rounded-md"></div>
                                <div className="w-6 h-6 border-2 border-white rounded-md"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Badges & Activity Split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Badges Column */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-2">
                            <Award className="text-yellow-500" /> Earned Badges
                        </h2>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {profileData.badges.map((badge) => (
                                <motion.div 
                                    key={badge.id} 
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex flex-col items-center text-center group"
                                >
                                    <div className={`rounded-full mb-4 shadow-lg flex items-center justify-center w-24 h-24 overflow-hidden relative border-4 border-white ${badge.color}`}>
                                        <img 
                                            src={badge.image} 
                                            alt={badge.name}
                                            className="w-full h-full object-cover" 
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center -z-10">
                                            {badge.fallbackIcon}
                                        </div>
                                    </div>
                                    <h3 className="font-black text-gray-800">{badge.name}</h3>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Found {badge.date}</p>
                                </motion.div>
                            ))}
                            
                            <div className="bg-gray-50 p-6 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center opacity-40">
                                <div className="bg-gray-200 p-4 rounded-full mb-4">
                                    <Award className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="font-bold text-gray-400">Locked</h3>
                            </div>
                        </div>
                    </div>

                    {/* Activity Column */}
                    <div>
                        <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-2">
                            <History className="text-blue-500" /> Recent Activity
                        </h2>
                        <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-50 space-y-6">
                            {profileData.recentActivity.length > 0 ? (
                                profileData.recentActivity.map((activity, idx) => (
                                    <div key={idx} className="flex gap-4 relative">
                                        {idx !== profileData.recentActivity.length - 1 && (
                                            <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-gray-100"></div>
                                        )}
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex-shrink-0 flex items-center justify-center z-10">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-gray-800">Challenge Completed</p>
                                            <p className="text-xs text-gray-500 font-medium">Earned Rewards</p>
                                            <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">{new Date(activity.completion_date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-sm text-gray-400 italic">No recent actions</p>
                                    <button 
                                        onClick={() => navigate('/dashboard')}
                                        className="mt-4 text-xs font-black text-green-600 uppercase hover:underline"
                                    >
                                        Start a task -&gt;
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;