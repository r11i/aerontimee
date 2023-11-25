// register.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '@/pages/register'; // Update the path accordingly

jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null,
        refresh: jest.fn(),
      };
    }
  }));
  

  window.alert = jest.fn();

jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createClientComponentClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          then: jest.fn(() => ({ data: [], error: null })),
        })),
      })),
    })),
    auth: {
      signUp: jest.fn(() => ({ data: null, error: null })),
    },
  })),
}));

describe('Register Component', () => {
  it('registers a user successfully', async () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation();
    render(<Register />);

    const emailInput = screen.getByPlaceholderText('Input your email..');
    const passwordInput = screen.getByPlaceholderText('Input your password..');
    // const registerButton = screen.getByText('Register');
    const registerButton = screen.getByRole('button', { name: /Register/i });

    // Type values into the input fields
    fireEvent.change(emailInput, { target: { value: 'richardharis10@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    // Click the register button
    fireEvent.click(registerButton);


    await waitFor(() => {
        // Check if alert('User already exist!') is called
        expect(alertSpy).toHaveBeenCalledWith('User already exist!');
      });
  
      // Assert that the alert was called
      expect(alertSpy).toHaveBeenCalledTimes(1);
  
      // Clean up the spy
      alertSpy.mockRestore();
    // Wait for asynchronous operations to complete
    // await waitFor(() => {
    //     // Check if alert('User already exist!') is called
    //     expect(window.alert).toHaveBeenCalledWith('User already exist!');
    //   });
      

    // Wait for asynchronous operations to complete
    // await waitFor(() => {
    //     const userExistsMessage = screen.queryByText('User already exist!')
    //   expect(userExistsMessage).toBeInTheDocument();
    // //   expect(screen.queryByText('Error during registration:')).toBeInTheDocument();

    //     if (userExistsMessage) {
    //         // If the message is found, assert its content
    //         expect(userExistsMessage).toHaveTextContent('User already exist!');
    //     }
    // });

    // Check if router.refresh() is called
    // expect(require('next/navigation').useRouter().refresh).toHaveBeenCalled();
  });
});

