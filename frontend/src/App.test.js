import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should have exact heading', () => {
    render(<App />);
    const mainHeading = screen.getByTestId('app-header-heading');
    expect(mainHeading.innerHTML).toBe('Productivity Tracker');
  });
});
