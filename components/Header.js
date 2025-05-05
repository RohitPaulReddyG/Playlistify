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
    <header className="glass-card m-4">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center py-6">
        <h1 className="text-3xl font-bold gradient-text mb-4 md:mb-0">PlayListify</h1>
        
        <div className="flex flex-wrap gap-3">
          {!session ? (
            <>
              <button 
                onClick={() => handleSignIn('spotify')} 
                data-provider="spotify"
                className="btn-gradient text-white font-medium py-2.5 px-5 rounded-full flex items-center space-x-2 hover:scale-105 transition-all duration-300"
              >
                <span>Login with Spotify</span>
              </button>
              
              <button 
                onClick={() => handleSignIn('google')} 
                data-provider="google"
                className="glass-card hover:bg-white/20 text-white font-medium py-2.5 px-5 rounded-full flex items-center space-x-2 hover:scale-105 transition-all duration-300"
              >
                <span>Login with Google</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {session.user?.image && (
                <div className="glass-card p-1 rounded-full">
                  <img 
                    src={session.user.image} 
                    alt={session.user.name || 'User'} 
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              )}
              <span className="hidden md:inline-block glass-card px-4 py-1 rounded-full">
                {session.user?.name || 'User'}
              </span>
              <button 
                onClick={handleSignOut} 
                className="glass-card hover:bg-white/20 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 hover:scale-105"
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
