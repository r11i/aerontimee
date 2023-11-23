'use client'

import React from 'react';
import Image from 'next/image';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()
  // const handleRegister = async () => {
  //   await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       emailRedirectTo: `/api/auth/`,
  //     },
  //   })
  //   router.refresh()
  // }

  const handleRegister = async () => {
    // Check if email already exists using Supabase authentication API

    // If email doesn't exist, proceed with registration
    const { error: registrationError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Use your desired options
      },
    });

    if (registrationError) {
      console.error("Error during registration:", registrationError.message);
      alert(registrationError.message);
      return;
    }

    router.refresh();
  }

  return (
    <div style={{color: 'white', position: 'relative', height: '100vh', width: '100vw'}}>
      <div style={{width: '65%', height: '100vh', right: '0', position: 'absolute'}}>
        <div style={{position: 'relative', height: '100vh'}}>
          <Image alt="gambar" style={{position: 'absolute', width: '100%', height: '100%'}} src="/Vector7.png" height={862} width={1002}/>
          <div style={{top: '50%', translate: '0% -50%', left: '40%', zIndex: '1', position: 'absolute', width: '50%', height: 'fit-content'}}>
            <div style={{marginBottom: '50px'}}>
              <p style={{fontSize: '48px', color: '#E0F7FC', fontWeight: 'bold', textAlign: 'center'}}>SIGN UP</p>
              <p style={{fontSize: '18px', textAlign: 'center'}}>Create a new account</p>
            </div>
            {/* <form action="process_registration.php" method="post"> */}
              <label htmlFor="email">Email</label>
              <input style={{color: 'black', width: '100%', padding: '9px 19px 9px 19px', borderRadius: '10px', display: 'block'}} type="text" id="email" name="email" placeholder="Input your email.." onChange={(e) => setEmail(e.target.value)} value={email} required></input>
              <label htmlFor="password">Password</label>
              <input style={{color: 'black', width: '100%',padding: '9px 19px 9px 19px', borderRadius: '10px', display: 'block'}} type="text" id="password" name="password" placeholder="Input your password.." onChange={(e) => setPassword(e.target.value)} value={password} required></input>
              {/* <label htmlFor="name">Confirm password</label>
              <input style={{marginBottom: '60px', color: 'black', width: '100%',padding: '9px 19px 9px 19px', borderRadius: '10px', display: 'block'}} type="text" id="confirm-password" name="confirm-password" placeholder="Confirm your password.." required></input> */}
              <button onClick={handleRegister} style={{fontWeight: 'bold', borderRadius: '15px', width: '100%', padding: '11px 25px 11px 25px', backgroundColor: '#76B3DD', cursor:'pointer', marginTop: '20px'}}>Register</button>
            {/* </form> */}
            <p style={{textAlign: 'center', marginTop: '10px'}}>Already have an account? <a href='/login' style={{color: '#76B3DD'}}>Login</a></p>
            
          </div>
        </div>
      </div>
      <Image alt="gambar" style={{height: '100vh', position: 'absolute', zIndex: '-1'}} src="/homepagebanner.png" width={900} height={862} />
      <div style={{position: 'relative', height: '100vh'}}>
        <div style={{position: 'absolute', left: '51px', top: '100px'}}>
          <p style={{fontWeight: 'bold', fontSize: '36px'}}>REGISTER TO</p>
          <p style={{fontSize: '48px', fontWeight: 'bold'}}>TRACK YOUR<br></br>FLIGHT.</p>
        </div>
      </div>

      
    </div>
  );
}

export default App;
