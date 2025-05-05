
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  const handleSignIn = () => {
    // Use NextAuth's signIn method instead of direct Spotify authorization
    signIn('spotify');
  };

  return (
    <header className="bg-purple-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">PlayListify</h1>
        <div>
          {session ? (
            <button onClick={() => signOut()} className="bg-red-500 p-2 rounded">Logout</button>
          ) : (
            <button onClick={handleSignIn} className="bg-green-500 p-2 rounded">Login with Spotify</button>
          )}
        </div>
      </div>
    </header>
  );
}
    