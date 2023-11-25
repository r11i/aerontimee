import { render, screen, waitFor, act } from '@testing-library/react';
import Home from '@/pages';
import { MockedComponentClass } from 'react-dom/test-utils';
import { useRouter } from 'next/router';

jest.mock('jose', () => require('node-jose'));


jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
  }));
describe('Home Component', () => {
  it('renders correctly', async () => {
    let component;
    
    await act(async () => {
      component = render(<Home />);
    });

    const loadingElement = screen.getByText(/loading/i);
    expect(loadingElement).toBeInTheDocument();

    // Wait for isLoading to become false
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).toBeNull();
    });


    expect(screen.getByText('MyTrips')).toBeInTheDocument();
    expect(screen.getAllByAltText('logo')[0]).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();

    // Assertions for elements in the first section
    expect(screen.getByText('TRACK YOUR FLIGHT')).toBeInTheDocument();
    expect(screen.getByText('WELCOME')).toBeInTheDocument();

    // Assertions for elements in the second section
    expect(screen.getByAltText('homepagebanner')).toBeInTheDocument();
    expect(screen.getByText('Filter')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Airline')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Origin')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Destination')).toBeInTheDocument();
    expect(screen.getByText('Start Departure Time')).toBeInTheDocument();
    // ... Add more assertions for other input fields, buttons, etc.

    // Assertions for elements in the third section
    expect(screen.getByTestId('flightData')).toBeInTheDocument(); // Assuming you have a test ID for the flightData element
    

    expect(screen.getByAltText('footer')).toBeInTheDocument();
    expect(screen.getByText('Track Your Flight')).toBeInTheDocument();
    expect(screen.getAllByText( 'Get Started' )[1]).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Wan Aufa Azis')).toBeInTheDocument();
    expect(screen.getByText('Khairunnisa Hurun ‘Iin')).toBeInTheDocument();
    expect(screen.getByText('Richard Haris')).toBeInTheDocument();

  });

  
});
