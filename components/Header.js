
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const { data: session } = useSession();

  const handleSignIn = (provider) => {
    signIn(provider);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-6 shadow-xl">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0 hover:scale-105 transition-transform duration-300">
          <div className="mr-3 bg-white/10 p-2 rounded-lg backdrop-blur-sm">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M9 12L15 8V16L9 12Z" fill="currentColor"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            PlayListify
          </h1>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {!session ? (
            <>
              <button 
                onClick={() => handleSignIn('spotify')} 
                data-provider="spotify"
                className="glass-effect hover:bg-white/20 text-white font-medium py-2.5 px-5 rounded-full transition-all duration-300 flex items-center space-x-2 hover:scale-105"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02z"/>
                </svg>
                <span>Login with Spotify</span>
              </button>
              
              <button 
                onClick={() => handleSignIn('google')} 
                data-provider="google"
                className="glass-effect hover:bg-white/20 text-white font-medium py-2.5 px-5 rounded-full transition-all duration-300 flex items-center space-x-2 hover:scale-105"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                <span>Login with Google</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {session.user?.image && (
                <div className="glass-effect p-1 rounded-full">
                  <img 
                    src={session.user.image} 
                    alt={session.user.name || 'User'} 
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              )}
              <span className="hidden md:inline-block glass-effect px-4 py-1 rounded-full">
                {session.user?.name || 'User'}
              </span>
              <button 
                onClick={handleSignOut} 
                className="glass-effect hover:bg-white/20 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 hover:scale-105"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
    