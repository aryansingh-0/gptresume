'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function AdminSignup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    toast.error("unauthorise user.")
    // const res = await fetch('/api/admin/signup', {
    //   method: 'POST',
    //   body: JSON.stringify({ username, password }),
    // });

    // const data = await res.json();
    // if (data.success) {
    //   router.push('/admin/login');
    // } else {
    //   alert(data.message);
    // }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Admin Signup </h1>
       <input
        placeholder="Username"
        className="border p-2 w-full mb-3"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup} className="bg-green-600 text-white px-4 py-2 rounded">
        Signup
      </button>  
      <div className='w-full flex items-center
      justify-center
      '>
        <Link href={'/'}>
        <button className='bg-highlight p-4 text-white rounded-2xl'>
  Home Page
</button>
        </Link>

      </div>
    </div>
  );
}
