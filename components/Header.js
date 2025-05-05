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
    <header className="glass-card mx-4 mt-4">
      <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center py-5">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <svg className="w-8 h-8 text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M9 12L15 8V16L9 12Z" fill="currentColor"/>
          </svg>
          <h1 className="text-2xl font-bold gradient-text">PlayListify</h1>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {!session ? (
            <>
              <button 
                onClick={() => handleSignIn('spotify')} 
                data-provider="spotify"
                className="btn-gradient text-white font-medium py-2.5 px-6 rounded-full flex items-center space-x-3 hover:scale-105 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <span>Connect with Spotify</span>
              </button>
              
              <button 
                onClick={() => handleSignIn('google')} 
                data-provider="google"
                className="glass-card hover:bg-white/10 text-white font-medium py-2.5 px-6 rounded-full flex items-center space-x-3 hover:scale-105 transition-all duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                </svg>
                <span>Connect with Google</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {session.user?.image && (
                <div className="glass-card p-1 rounded-full ring-2 ring-indigo-500/20">
                  <img 
                    src={session.user.image} 
                    alt={session.user.name || 'User'} 
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              )}
              <span className="hidden md:inline-block glass-card px-4 py-1.5 rounded-full text-sm">
                {session.user?.name || 'User'}
              </span>
              <button 
                onClick={handleSignOut} 
                className="glass-card hover:bg-white/10 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 hover:scale-105 text-sm"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
