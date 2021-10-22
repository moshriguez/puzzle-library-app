import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {BrowserRouter as Router} from 'react-router-dom'
import Signup from "../Signup";

let user = {}
const setCurrentUser = (newUser) => {
    user = newUser
}

test('renders error message for duplicate username', async () => {
    render(<Signup setCurrentUser={setCurrentUser} />, {wrapper: Router})

    userEvent.type(screen.getByLabelText(/username/i), 'duplicateName')
    userEvent.type(screen.getByLabelText(/create a password/i), 'Password1')
    userEvent.type(screen.getByLabelText(/confirm/i), 'Password1')
    userEvent.click(screen.getByRole('button', {name: /create account/i}))
    await screen.findByText(/Username has already been taken/i)
})
test('renders error message when password and confirmation do not match', async () => {
    render(<Signup setCurrentUser={setCurrentUser} />, {wrapper: Router})

    userEvent.type(screen.getByLabelText(/username/i), 'Test')
    userEvent.type(screen.getByLabelText(/create a password/i), 'Password1')
    userEvent.type(screen.getByLabelText(/confirm/i), 'Password')
    userEvent.click(screen.getByRole('button', {name: /create account/i}))
    await screen.findByText(/The password you have entered does not match the password confirmation/i)
})
test('renders error message when password is not in correct format', async () => {
    render(<Signup setCurrentUser={setCurrentUser} />, {wrapper: Router})

    userEvent.type(screen.getByLabelText(/username/i), 'Test')
    userEvent.type(screen.getByLabelText(/create a password/i), 'test')
    userEvent.type(screen.getByLabelText(/confirm/i), 'test')
    userEvent.click(screen.getByRole('button', {name: /create account/i}))
    await screen.findByText(/Passwords must include a capital letter, a lowercase letter and a number/i)
})
test('renders error message when password is too short', async () => {
    render(<Signup setCurrentUser={setCurrentUser} />, {wrapper: Router})

    userEvent.type(screen.getByLabelText(/username/i), 'Test')
    userEvent.type(screen.getByLabelText(/create a password/i), 'Test1')
    userEvent.type(screen.getByLabelText(/confirm/i), 'Test1')
    userEvent.click(screen.getByRole('button', {name: /create account/i}))
    await screen.findByText(/Password is too short/i)
})
test('renders error message when password is too long', async () => {
    render(<Signup setCurrentUser={setCurrentUser} />, {wrapper: Router})

    userEvent.type(screen.getByLabelText(/username/i), 'Test')
    userEvent.type(screen.getByLabelText(/create a password/i), 'Test11111111111111111')
    userEvent.type(screen.getByLabelText(/confirm/i), 'Test11111111111111111')
    userEvent.click(screen.getByRole('button', {name: /create account/i}))
    await screen.findByText(/Password is too long/i)
})
test('creates new user if no errors', async () => {
    render(<Signup setCurrentUser={setCurrentUser} />, {wrapper: Router})
    
    userEvent.type(screen.getByLabelText(/username/i), 'Test')
    userEvent.type(screen.getByLabelText(/create a password/i), 'Password1')
    userEvent.type(screen.getByLabelText(/confirm/i), 'Password1')
    userEvent.click(screen.getByRole('button', {name: /create account/i}))
    await waitFor(() => expect(user.username).toBeDefined())
    await waitFor(() => expect(user.username).toEqual('Test'))
})