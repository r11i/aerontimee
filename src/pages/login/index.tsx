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
      setIsLoading(false)
    };

    checkSession();
  }, []);

  // const handleLogIn = async () => {
  //   await supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   })
  //   // router.refresh()
  //   router.push('/')
  // }

  const handleLogIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) {
        // Display an alert if there was an error during login
        alert('Credential not found');
      } else {
        // If login is successful, redirect to the home page
        router.push('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
      // You can handle other types of errors here
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  
  if(isLoading) 
    return (
    <p className='flex justify-center items-center w-screen h-screen'>
      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
    </p>
    )
  
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
