import { render, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom'

import App from './App';

describe('App', () => {
  test('loads all puzzles on render', () => {
    render(<App />, {wrapper: Router});
    screen.getByRole('link', {name: /puzzles/i})
  })

})
