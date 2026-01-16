import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="flex-1 max-w-3xl mx-auto px-6 py-10">
                <h1 className="text-4xl font-black text-slate-800 mb-6 text-center">About EcoLoop 🌿</h1>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6 text-lg text-slate-700 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-green-700 mb-2">Our Mission</h2>
                        <p>
                            EcoLoop is dedicated to gamifying sustainability education. We believe that learning about the environment should be fun, interactive, and rewarding. By turning eco-actions into a game, we empower the next generation to build a greener future.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-green-700 mb-2">Why Sustainability + Students?</h2>
                        <p>
                            Students are the architects of tomorrow. Instilling sustainable habits early on creates a ripple effect that lasts a lifetime. EcoLoop bridges the gap between theoretical knowledge and practical action.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-green-700 mb-2">How the Community Feed Works</h2>
                        <p>
                            The Community Feed connects students with real-world initiatives. It serves as a window into the broader ecosystem of environmental action, inspiring students to see beyond their own tasks.
                        </p>
                    </section>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg text-base">
                        <p className="font-semibold text-yellow-800">Note on Content Safety:</p>
                        <p className="text-yellow-700 mt-1">
                            All initiatives displayed in the Community Feed are manually curated and verified to ensure relevance, safety, and educational value for students.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AboutUs;
