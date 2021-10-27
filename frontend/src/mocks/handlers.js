import { rest } from "msw";
import { render } from "react-dom";

const URL = 'http://localhost:3001/';
const puzzleList = [
    {category: "general",
    checked_out: false,
    created_at: "2021-09-09T22:48:57.712Z",
    id: 97,
    img_url: "https://cdn11.bigcommerce.com/s-psv5s7bpr6/images/stencil/796.1999999999999x796.1999999999999/products/1403/1875/33-15507-Candyscape__19072.1628702839.jpg",
    name: "Candyscape",
    num_of_pieces: 1500,
    pieces_missing: 0,
    updated_at: "2021-10-17T02:44:18.959Z"}, 
    {category: "general",
    checked_out: true,
    created_at: "2021-09-08T21:37:17.461Z",
    id: 69,
    img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTSLO---Sloths.jpg?v=1611352983",
    name: "Sloths",
    num_of_pieces: 1000,
    pieces_missing: 0,
    updated_at: "2021-10-15T07:03:29.150Z"},
    {category: "general",
    checked_out: false,
    created_at: "2021-09-08T21:37:17.472Z",
    id: 72,
    img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTHKW.jpg?v=1611350951",
    name: "Hike in the Woods",
    num_of_pieces: 1000,
    pieces_missing: 0,
    updated_at: "2021-10-15T07:03:31.311Z"},
    {category: "general",
    checked_out: true,
    created_at: "2021-09-08T21:37:17.548Z",
    id: 91,
    img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTOTR---Otters_1296x.jpg?v=1611351540",
    name: "Otters",
    num_of_pieces: 1000,
    pieces_missing: 0,
    updated_at: "2021-10-17T02:43:57.603Z"},
    {category: "general",
    checked_out: false,
    created_at: "2021-09-09T22:52:58.703Z",
    id: 98,
    img_url: "https://cdn11.bigcommerce.com/s-psv5s7bpr6/images/stencil/796.1999999999999x796.1999999999999/products/1378/1856/33-15515-CentralParkParadise__51270.1623420812.jpg",
    name: "Central Park",
    num_of_pieces: 1500,
    pieces_missing: 0,
    updated_at: "2021-10-17T02:43:54.970Z"},
    {category: "general",
    checked_out: false,
    created_at: "2021-09-08T21:37:17.453Z",
    id: 67,
    img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTCRR---Coral-Reef.jpg?v=1611351189",
    name: "Coral Reef",
    num_of_pieces: 1000,
    pieces_missing: 0,
    updated_at: "2021-10-17T21:44:48.727Z"},
    {category: "general",
    checked_out: false,
    created_at: "2021-09-08T21:37:17.465Z",
    id: 70,
    img_url: "https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTZOD---Zodiac.jpg?v=1611352340",
    name: "Zodiac",
    num_of_pieces: 1000,
    pieces_missing: 0,
    updated_at: "2021-10-19T05:57:10.865Z"}]
const user = {
    id: 1, 
    username: 'Test', 
    borrows: [
        {id: 1, active: true, check_out_date: '2021-01-01T12:00:00.000Z', date_returned: null, due_date: '2021-01-15T12:00:00.000Z', img_url: 'https://cdn.shopify.com/s/files/1/0522/9979/2582/products/PZTOTR---Otters_1296x.jpg?v=1611351540', name: 'Otters', num_of_pieces: 1000, pieces_missing: 0, puzzle_id: 91}
    ]}

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
            ctx.json({ user: user, jwt: 'testToken'})
        )
    }),
    rest.post(URL + 'users', (req, res, ctx) => {
        const { username, password } = req.body
        if (username === 'duplicateName') {
            return res(
                ctx.status(406),
                ctx.json({error: ['Username has already been taken']})
            )
        }
        if (password.length > 20) {
            return res(
                ctx.status(406),
                ctx.json({error: ['Password is too long (maximum is 20 characters)']})
            )
        }
        if (password.length < 6) {
            return res(
                ctx.status(406),
                ctx.json({error: ['Password is too short (minimum is 6 characters)']})
            )
        }
        return res(
            ctx.status(201),
            ctx.json({user: {id: 1, username: username, borrows: []}, jwt: 'testToken'})
        )
    }),
    rest.patch(URL + 'users/1', (req, res, ctx) => {
        const { password, new_password } = req.body
        if (password === 'wrongPassword') {
            return res(
                ctx.status(401),
                ctx.json({error: 'Your password is not correct.'})
            )
        }
        if (password === new_password) {
            return res(
                ctx.status(400),
                ctx.json({error: 'Your new password matches your old password. Are you sure you want to change your password?'})
            )
        }
        if (new_password.length > 20) {
            return res(
                ctx.status(406),
                ctx.json({error: ['Password is too long (maximum is 20 characters)']})
            )
        }
        if (new_password.length < 6) {
            return res(
                ctx.status(406),
                ctx.json({error: ['Password is too short (minimum is 6 characters)']})
            )
        }
        return res(
            ctx.status(202),
            ctx.json({message: 'Your password was updated.'})
        )
    }),
    rest.get(URL + 'puzzles', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({puzzles: puzzleList})
        )
    }),
    rest.get(URL + 'profile', (req, res, ctx) => {
        const token = req.headers._headers.authorization
        // console.log(typeof token, token)
        if (token !== 'Bearer testToken') {
            return res(
                ctx.status(401),
                ctx.json({message: 'Please log in'})
            )
        } else {
            return res(
                ctx.status(200),
                ctx.json({user: user})
            )

        }
    }),
    rest.post(URL + 'borrows', (req, res, ctx) => {
        const { puzzle_id } = req.body
        const puzzle = puzzleList.filter(el => el.id === puzzle_id)
        puzzle.checked_out = true
        const now = new Date()
        const dueDate = now + (60 * 60 * 24 * 7 * 3)
        const borrow = { active: true, check_out_date: now.toString(), date_returned: null, due_date: dueDate.toString(), id: 2, puzzle_id: puzzle_id, img_url: puzzle.img_url, name: puzzle.name, num_of_pieces: puzzle.num_of_pieces, pieces_missing: puzzle.pieces_missing }
        return res(
            ctx.status(200),
            ctx.json({borrow: borrow, puzzle: puzzle})
        )
     })
]

