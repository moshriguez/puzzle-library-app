import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {BrowserRouter as Router} from 'react-router-dom'
import Login from "../Login";

let user = {}
let borrows = []
const setCurrentUser = (newUser) => {
    user = newUser
}
const setBorrowsAndHistory = (newBorrows) => {
    borrows = newBorrows
}

test('renders error message for incorrect username', async () => {
    render(<Login setCurrentUser={setCurrentUser} setBorrowsAndHistory={setBorrowsAndHistory} />, {wrapper: Router})
    
    userEvent.type(screen.getByLabelText(/username/i), 'mispelledUsername')
    userEvent.click(screen.getByRole('button', {name: /login/i}))
    await screen.findByText(/We do not have a record of that username/i)
})

test('renders error message for incorrect password', async () => {
    render(<Login setCurrentUser={setCurrentUser} setBorrowsAndHistory={setBorrowsAndHistory} />, {wrapper: Router})
    
    userEvent.type(screen.getByLabelText(/username/i), 'Test')
    userEvent.type(screen.getByLabelText(/password/i), 'wrongPassword')
    userEvent.click(screen.getByRole('button', {name: /login/i}))
    await screen.findByText(/Your password is not correct/i)
})
test('user is logged in and borrows are saved when correct login credentials are used', async () => {
    render(<Login setCurrentUser={setCurrentUser} setBorrowsAndHistory={setBorrowsAndHistory} />, {wrapper: Router})
    
    userEvent.type(screen.getByLabelText(/username/i), 'Test')
    userEvent.type(screen.getByLabelText(/password/i), 'Password1')
    userEvent.click(screen.getByRole('button', {name: /login/i}))
    await waitFor(() => expect(user.username).toBeDefined())
    await waitFor(() => expect(user.username).toEqual('Test'))
    await waitFor(() => expect(borrows).not.toHaveLength(0))
})
test('when user logs in, jwt is saved to localStorage', () => {
    render(<Login setCurrentUser={setCurrentUser} setBorrowsAndHistory={setBorrowsAndHistory} />, {wrapper: Router})
    
    userEvent.type(screen.getByLabelText(/username/i), 'Test')
    userEvent.type(screen.getByLabelText(/password/i), 'Password1')
    userEvent.click(screen.getByRole('button', {name: /login/i}))
    expect(localStorage.getItem('jwt')).toEqual('testToken')
})