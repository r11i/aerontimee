// import { render, screen, fireEvent, act } from '@testing-library/react';
// import Login from '@/pages/login';

// jest.mock('next/image', () => ({
//   __esModule: true,
//   default: jest.fn(),
// }));

// jest.mock('@supabase/auth-helpers-nextjs', () => ({
//     createClientComponentClient: jest.fn(() => ({
//       auth: {
//         getUser: jest.fn(),
//         signInWithPassword: jest.fn(),
//         // add other necessary methods as needed
//       },
//     })),
//   }));
  

// jest.mock('next/navigation', () => ({
//   useRouter: jest.fn(),
// }));

// describe('Login component', () => {
//   it('renders login form', async () => {
//     render(<Login />);
    
//     // Check if the login form is rendered
//     const emailInput = screen.getByLabelText(/email/i);
//     const passwordInput = screen.getByLabelText(/password/i);
//     const loginButton = screen.getByText(/login/i);

//     expect(emailInput).toBeInTheDocument();
//     expect(passwordInput).toBeInTheDocument();
//     expect(loginButton).toBeInTheDocument();
//   });

//   it('handles login', async () => {
//     // Mock useRouter
//     const mockPush = jest.fn();
//     jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({
//       push: mockPush,
//     });

//     // Mock createClientComponentClient
//     const mockSignInWithPassword = jest.fn();
//     const mockGetUser = jest.fn().mockResolvedValue({ data: { user: null } });
//     const mockAuth = {
//       signInWithPassword: mockSignInWithPassword,
//       getUser: mockGetUser,
//     };
//     jest.mock('@supabase/auth-helpers-nextjs', () => ({
//       createClientComponentClient: jest.fn(() => ({
//         auth: mockAuth,
//       })),
//     }));

//     render(<Login />);

//     // Simulate user input
//     const emailInput = screen.getByLabelText(/email/i);
//     const passwordInput = screen.getByLabelText(/password/i);
//     const loginButton = screen.getByText(/login/i);

//     act(() => {
//       fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//       fireEvent.change(passwordInput, { target: { value: 'password123' } });
//     });

//     // Mock successful login
//     mockSignInWithPassword.mockResolvedValue({ error: null });

//     await act(async () => {
//       fireEvent.click(loginButton);
//     });

//     // Check if the router is called after successful login
//     expect(mockPush).toHaveBeenCalledWith('/');

//     // Mock login error
//     mockSignInWithPassword.mockResolvedValue({ error: 'Login error' });

//     await act(async () => {
//       fireEvent.click(loginButton);
//     });

//     // Check if an alert is shown on login error
//     expect(window.alert).toHaveBeenCalledWith('Credential not found');
//   });
// });


// login.test.js
// import React from 'react';
// import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import Login from '@/pages/login'; // Adjust the import path based on your project structure

// // Mocking the useRouter hook
// jest.mock("next/navigation", () => ({
//   useRouter() {
//     return {
//       prefetch: () => null,
//       push: jest.fn(),
//     };
//   }
// }));

// // Mocking the supabase module
// jest.mock('@supabase/auth-helpers-nextjs', () => ({
//   createClientComponentClient: jest.fn(() => ({
//     auth: {
//       signInWithPassword: jest.fn(async () => ({ data: { email: 'test@example.com', password: 'password123' } })),
//       getUser: jest.fn(async () => ({ data: { user: null } })),
//     },
//   })),
// }));

// describe('Login component', () => {
//   it('renders login form correctly', async () => {
//     let component;
    
//     await act(async () => {
//       component = render(<Login />);
//     });

//     // const loadingElement = screen.getByText(/loading/i);
//     // expect(loadingElement).toBeInTheDocument();

//     // // Wait for isLoading to become false
//     // await waitFor(() => {
//     //   expect(screen.queryByText(/loading/i)).toBeNull();
//     // });
//     // render(<Login />);

//     // Ensure that the login form is rendered
//     expect(screen.getByLabelText('Email')).toBeInTheDocument();
//     expect(screen.getByLabelText('Password')).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
//   });

//   it('handles login correctly', async () => {

//     let component;
    
//     await act(async () => {
//       component = render(<Login />);
//     });
//     // render(<Login />);

//     // Mocking user input
//     fireEvent.change(screen.getByPlaceholderText('Input your email..'), { target: { value: 'test@example.com' } });
//     fireEvent.change(screen.getByPlaceholderText('Input your password..'), { target: { value: 'password123' } });

//     // Mocking the supabase signInWithPassword function
//     const mockSignInWithPassword = jest.fn(async () => ({  email: 'test@example.com', password: 'password123'  }));
//     const mockAuthClient = {
//       signInWithPassword: mockSignInWithPassword,
//       getUser: jest.fn(async () => ({ data: { user: { /* mocked user data */ } } })),
//     };

//     jest.mock('@supabase/auth-helpers-nextjs', () => ({
//       createClientComponentClient: jest.fn(() => ({
//         auth: mockAuthClient,
//       })),
//     }));

//     // Triggering login
//     fireEvent.click(screen.getByRole('button', { name: 'Login' }));

//     // Ensure that the signInWithPassword function is called with the correct arguments
//     await waitFor(() => {
//       // expect(mockSignInWithPassword).toHaveBeenCalledWith({
//       //   email: 'test@example.com',
//       //   password: 'password123',
//       // });
//       expect(mockSignInWithPassword).toHaveBeenCalledTimes(1);
//     });

//     // await waitFor(() => {
//     //   expect(require('next/navigation').useRouter().push).toHaveBeenCalledWith('/');
//     // });

//     // You can also test the redirection logic after successful login
//   });
// });


import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '@/pages/login';
import { act } from 'react-dom/test-utils';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createClientComponentClient: jest.fn(() => ({
    auth: {
      signInWithPassword: jest.fn(() => ({ error: null })),
      getUser: jest.fn(() => ({ data: { user: null } })),
    },
  })),
}));
const signInWithPasswordMock = jest.fn(() => ({ error: null }));
describe('Login Component', () => {
  test('redirects to "/" after successful login', async () => {
    render(<Login />);

    // Mock input values
    const emailInput = screen.getByPlaceholderText('Input your email..');
    const passwordInput = screen.getByPlaceholderText('Input your password..');
    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password');

    // Mock API call response
    // const signInWithPasswordMock = jest.fn(() => ({ error: null }));
    // jest.spyOn(
    //   require('@supabase/auth-helpers-nextjs'),
    //   'createClientComponentClient'
    // ).mockImplementationOnce(() => ({
    //   auth: {
    //     signInWithPassword: signInWithPasswordMock,
    //     getUser: jest.fn(() => ({ data: { user: null } })),
    //   },
    // }));

    // Trigger the login function
    fireEvent.click(screen.getByText('Login'));

    // Wait for the redirect
    // Trigger the login function
    await act(async () => {
      fireEvent.click(screen.getByText('Login'));
      await waitFor(() => {
        // Your assertions
        expect(signInWithPasswordMock).toHaveBeenCalled();
        expect(signInWithPasswordMock).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password',
        });
        expect(require('next/navigation').useRouter().push).toHaveBeenCalledWith('/');
      });
    });
  });
});
