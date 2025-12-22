const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center">

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mt-12">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-6">
          Connect with anyone, <br />
          <span className="text-indigo-600">anywhere in the world.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
          Simple, secure, and lightning-fast messaging. Join millions of people who use ChatFlow to stay connected with friends, family, and colleagues.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <button className="px-10 py-4 bg-indigo-600 text-white text-lg font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all">
            Start Chatting Free
          </button>
          <button className="px-10 py-4 bg-white text-slate-700 text-lg font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all">
            View Demo
          </button>
        </div>
      </main>

      <footer className="w-full py-12 mt-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">© 2025 ChatFlow Inc. Built for the modern web.</p>
          <div className="flex gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-indigo-600 transition">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;