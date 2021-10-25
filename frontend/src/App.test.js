import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {BrowserRouter as Router} from 'react-router-dom'

import App from './App';

describe('App', () => {
  test('loads all puzzles on render', async () => {
    render(<App />, {wrapper: Router});
    userEvent.click(screen.getByRole('link', {name: /puzzles/i}))
    const header = await screen.findByText(/Candyscape/i)
    expect(header).toBeInTheDocument()
    const header2 = await screen.findByText(/Sloths/i)
    expect(header2).toBeInTheDocument()
    // const borrowButtons = await screen.findAllByRole('button', {name: /borrow/i})
    // userEvent.click(borrowButtons[0])
  })
  // test('if jwt is present in localStorage, user is automatically logged in', async () => {
  //   localStorage.setItem("jwt", 'testToken')
  //   render(<App />, {wrapper: Router});
  //   const userLink = await screen.findByRole('link', {name: /user/i})
  //   userEvent.click(userLink)
  //   screen.getByRole('')
  // })

})
