import { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Community = () => {
    const [loading, setLoading] = useState(true);

    return (
        <div className="min-h-screen bg-slate-50 pb-20 flex flex-col">
            <Header />
            <main className="max-w-4xl mx-auto px-4 flex-1 w-full">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <p>Content here</p>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Community;
