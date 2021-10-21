import { rest } from "msw";

const URL = 'http://localhost:3001/';

export const handlers = [
    rest.post(URL + 'login', (req, res, ctx) => {
        const { username, password } = req.body
        if (username === 'mispelledUsername') {
            return res(
                ctx.status(401),
                ctx.json({error: 'We do not have a record of that username. Double check your spelling and try again.'})
            )
        }
        if (password === 'wrongPassword') {
            return res(
                ctx.status(401),
                ctx.json({error: 'Your password is not correct.'})
            )
        }
        return res(
            ctx.status(200),
            ctx.json({ user: {id: 1, username: 'Test', borrows: [{id: 1, active: true, check_out_date: '2021-01-01T12:00:00.000Z', date_returned: '2021-01-02T12:00:00.000Z', due_date: '2021-01-15T12:00:00.000Z', img_url: '', name: 'Puzzle1', num_of_pieces: 100, pieces_missing: 0, puzzle_id: 1}]}, jwt: 'testToken'})
        )
    }),
    rest.post(URL + 'users', (req, res, ctx) => {
        const { username, password } = req.body
        if (username === 'duplicateName') {
            return res(
                ctx.status(406),
                ctx.json({error: 'Username has already been taken'})
            )
        }
        if (password.length > 20) {
            return res(
                ctx.status(406),
                ctx.json({error: 'Password is too long (maximum is 20 characters)'})
            )
        }
        if (password.length < 6) {
            return res(
                ctx.status(406),
                ctx.json({error: 'Password is too short (minimum is 6 characters)'})
            )
        }
        return res(
            ctx.status(201),
            ctx.json({user: {id: 1, username: 'Test', borrows: []}, jwt: 'testToken'})
        )
    })
    
]