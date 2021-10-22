import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import ChangePassword from "../ChangePassword";

let formOpen = true
const setFormOpen = () => {
    formOpen = false
}
let message = ''
const setPopupMessage = (txt) => {
    message = txt
}
describe('Change Password', () => {
    test('renders error message if password is incorrect', async () => {
        render(<ChangePassword userId={1}/>, {wrapper: Router})

        userEvent.type(screen.getByLabelText(/old password/i), 'wrongPassword')
        userEvent.type(screen.getByLabelText(/^new password/i), 'Password1')
        userEvent.type(screen.getByLabelText(/confirm/i), 'Password1')
        userEvent.click(screen.getByRole('button', /submit/i))
        await screen.findByText(/Your password is not correct/i)
    })
    test('renders error message if password and new password are the same', async () => {
        render(<ChangePassword userId={1}/>, {wrapper: Router})

        userEvent.type(screen.getByLabelText(/old password/i), 'Password1')
        userEvent.type(screen.getByLabelText(/^new password/i), 'Password1')
        userEvent.type(screen.getByLabelText(/confirm/i), 'Password1')
        userEvent.click(screen.getByRole('button', /submit/i))
        await screen.findByText(/Your new password matches your old password/i)
    })
    test('renders error message when password is too long', async () => {
        render(<ChangePassword userId={1}/>, {wrapper: Router})

        userEvent.type(screen.getByLabelText(/old password/i), 'Password1')
        userEvent.type(screen.getByLabelText(/^new password/i), 'Test11111111111111111')
        userEvent.type(screen.getByLabelText(/confirm/i), 'Test11111111111111111')
        userEvent.click(screen.getByRole('button', /submit/i))
        await screen.findByText(/Password is too long/i)
    })
    test('renders error message when password is too short', async () => {
        render(<ChangePassword userId={1}/>, {wrapper: Router})

        userEvent.type(screen.getByLabelText(/old password/i), 'Password1')
        userEvent.type(screen.getByLabelText(/^new password/i), 'Test1')
        userEvent.type(screen.getByLabelText(/confirm/i), 'Test1')
        userEvent.click(screen.getByRole('button', /submit/i))
        await screen.findByText(/Password is too short/i)
    })
    test('renders error message when password and confirmation do not match', async () => {
        render(<ChangePassword userId={1}/>, {wrapper: Router})

        userEvent.type(screen.getByLabelText(/old password/i), 'Password1')
        userEvent.type(screen.getByLabelText(/^new password/i), 'Password2')
        userEvent.type(screen.getByLabelText(/confirm/i), 'Password')
        userEvent.click(screen.getByRole('button', /submit/i))
        await screen.findByText(/The password you have entered does not match the password confirmation/i)
    })
    test('renders error message when password is not in correct format', async () => {
        render(<ChangePassword userId={1}/>, {wrapper: Router})

        userEvent.type(screen.getByLabelText(/old password/i), 'Password1')
        userEvent.type(screen.getByLabelText(/^new password/i), 'test')
        userEvent.type(screen.getByLabelText(/confirm/i), 'test')
        userEvent.click(screen.getByRole('button', /submit/i))
        await screen.findByText(/Passwords must include a capital letter/i)
    })
    test('successful password change sets modal message and closes form', async () => {
        render(<ChangePassword userId={1} setPopupMessage={setPopupMessage} setFormOpen={setFormOpen}/>, {wrapper: Router})

        userEvent.type(screen.getByLabelText(/old password/i), 'Password1')
        userEvent.type(screen.getByLabelText(/^new password/i), 'Password2')
        userEvent.type(screen.getByLabelText(/confirm/i), 'Password2')
        userEvent.click(screen.getByRole('button', /submit/i))
        await waitFor(() => expect(formOpen).toBe(true))
        await waitFor(() => expect(message).toEqual('Your password was updated.'))
    })
})