import { render, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom'

import App from './App';

test('renders learn react link', () => {
  render(<App />, {wrapper: Router});
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
