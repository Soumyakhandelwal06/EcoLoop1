import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Award, Camera } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col">
      {/* Navbar */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Leaf className="text-green-600 w-8 h-8" />
          <h1 className="text-2xl font-bold text-green-800">EcoLoop</h1>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-green-700 font-semibold hover:text-green-900">Login</Link>
          <Link to="/signup" className="bg-green-600 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-green-700 transition">
            Start Adventure
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center p-6 mt-8">
        <div className="animate-bounce mb-6">
          <span className="text-6xl">🌍</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-extrabold text-green-800 mb-6 tracking-tight">
          Save the Planet, <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">
            One Level at a Time!
          </span>
        </h2>
        <p className="text-xl text-green-700 max-w-2xl mb-10 font-medium">
          Join the fun! Watch videos, take quizzes, and do real-world eco tasks to earn badges and become an Eco Hero.
        </p>
        
        <Link to="/signup" className="group">
          <div className="bg-yellow-400 text-yellow-900 border-b-4 border-yellow-600 rounded-2xl px-8 py-4 text-2xl font-bold shadow-xl transform transition group-hover:scale-105 active:border-b-0 active:translate-y-1">
            Play Now 🚀
          </div>
        </Link>
      </main>

      {/* Features Grid */}
      <section className="bg-white/50 backdrop-blur-sm py-16 px-6 mt-12 w-full">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Leaf className="w-12 h-12 text-green-500" />}
            title="Learn Fun Facts"
            desc="Watch cool animated videos about nature and recycling!"
          />
          <FeatureCard 
            icon={<Camera className="w-12 h-12 text-blue-500" />}
            title="Do Real Tasks"
            desc="Take photos of your eco-friendly actions to level up!"
          />
          <FeatureCard 
            icon={<Award className="w-12 h-12 text-yellow-500" />}
            title="Win Rewards"
            desc="Collect coins and shiny badges for your profile!"
          />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 text-center flex flex-col items-center">
    <div className="bg-green-50 p-4 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

export default Landing;
