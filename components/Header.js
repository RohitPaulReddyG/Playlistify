
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const { data: session } = useSession();

  const handleSignIn = (provider) => {
    signIn(provider);
  };

  return (
    <header className="bg-gradient-to-r from-purple-700 to-purple-900 text-white py-4 shadow-lg">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M9 12L15 8V16L9 12Z" fill="currentColor"/>
          </svg>
          <h1 className="text-2xl font-bold">PlayListify</h1>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {!session ? (
            <>
              <button 
                onClick={() => handleSignIn('spotify')} 
                className="btn bg-green-600 hover:bg-green-700 text-white flex items-center"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Login with Spotify
              </button>
              
              <button 
                onClick={() => handleSignIn('google')} 
                className="btn bg-red-600 hover:bg-red-700 text-white flex items-center"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                Login with Google
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="hidden md:inline-block">Hello, {session.user?.name || 'User'}</span>
              <button 
                onClick={() => signOut()} 
                className="btn bg-red-600 hover:bg-red-700 text-white"
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
    