import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100 py-8 mt-12">
            <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-slate-500 text-sm">
                    © 2026 EcoLoop. All rights reserved.
                </div>
                <div className="flex gap-6 font-bold text-slate-600">
                    <Link to="/about" className="hover:text-green-600 transition">About Us</Link>
                    <Link to="/contact" className="hover:text-green-600 transition">Contact Us</Link>
                    <Link to="/community" className="hover:text-green-600 transition">Community</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
