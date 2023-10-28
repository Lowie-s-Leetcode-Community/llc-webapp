import { render, screen } from '@testing-library/react';
import LandingPage from './Landing';

test('renders learn react link', () => {
  render(<LandingPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
