import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import ChangePassword from "../ChangePassword";

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
})