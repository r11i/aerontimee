import React from 'react';
import { useState, useEffect } from 'react'
import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'


function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    // Check for an active session when the component mounts
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Redirect to home if a session is found
        router.push('/');
        return
      }
    };

    checkSession();
  }, []);

  const handleLogIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    // router.refresh()
    router.push('/')
  }
  return (
    <div style={{ color: 'white', position: 'relative', height: '100vh', width: '100vw' }}>
      <div style={{ width: '65%', height: '100vh', right: '0', position: 'absolute' }}>
        <div style={{ position: 'relative', height: '100vh' }}>
          <Image
            alt='gambar'
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            src="/Vector7.png"
            height={862}
            width={1002}
          />
          <div
            style={{
              top: '50%',
              transform: 'translate(0%, -50%)',
              left: '40%',
              zIndex: 1,
              position: 'absolute',
              width: '50%',
              height: 'fit-content',
            }}
          >
            <div style={{ marginBottom: '50px' }}>
              <p style={{ fontSize: '48px', color: '#E0F7FC', fontWeight: 'bold', textAlign: 'center' }}>LOGIN</p>
              <p style={{ fontSize: '18px', textAlign: 'center' }}>Sign in to continue</p>
            </div>
            {/* <form action="process_registration.php" method="post"> */}
              <label htmlFor="email">Email</label>
              <input
                style={{
                  color: 'black',
                  width: '100%',
                  padding: '9px 19px 9px 19px',
                  borderRadius: '10px',
                  display: 'block',
                }}
                type="text"
                id="email"
                name="email"
                placeholder="Input your email.."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                style={{
                  marginBottom: '60px',
                  color: 'black',
                  width: '100%',
                  padding: '9px 19px 9px 19px',
                  borderRadius: '10px',
                  display: 'block',
                }}
                type="text"
                id="password"
                name="password"
                placeholder="Input your password.."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                onClick={handleLogIn}
                style={{
                  fontWeight: 'bold',
                  borderRadius: '15px',
                  width: '100%',
                  padding: '11px 25px 11px 25px',
                  backgroundColor: '#76B3DD',
                  cursor: 'pointer',
                }}
              >
                Login
              </button>
            {/* </form> */}
            <p style={{ textAlign: 'center', marginTop: '10px' }}>
              Don't have an account? <a href="/register" style={{ color: '#76B3DD' }}>Sign up</a>
            </p>
          </div>
        </div>
      </div>
      <Image alt="gambar" style={{ height: '100vh', position: 'absolute', zIndex: -1 }} src="/homepagebanner.png" width={900} height={862} />
      <div style={{ position: 'relative', height: '100vh' }}>
        <div style={{ position: 'absolute', left: '51px', top: '100px' }}>
          <p style={{ fontWeight: 'bold', fontSize: '36px' }}>WELCOME</p>
          <p style={{ fontSize: '48px', fontWeight: 'bold' }}>BACK.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
