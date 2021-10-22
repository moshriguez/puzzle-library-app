import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {BrowserRouter as Router} from 'react-router-dom'

import App from './App';

describe('App', () => {
  test('loads all puzzles on render', () => {
    render(<App />, {wrapper: Router});
    userEvent.click(screen.getByRole('link', {name: /puzzles/i}))
    // screen.getByRole('')
  })
  test('if jwt is present in localStorage, user is automatically logged in', () => {
    localStorage.setItem("jwt", 'testToken')
    render(<App />, {wrapper: Router});
  })

})
