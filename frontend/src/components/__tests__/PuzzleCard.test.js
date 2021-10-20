import { render, screen } from "@testing-library/react";
import PuzzleCard from "../PuzzleCard";

test('if puzzle is checked out, "borrow" button is disabled', () => {
    const puzzle = {name: 'test', checked_out: true, num_of_pieces: 100, pieces_missing: 0 }
    render(<PuzzleCard type='puzzle' puzzle={puzzle}/>)

    expect(screen.getByRole('button', {name: /borrow/i})).toBeDisabled()
})

test('if puzzle is available, "borrow" button is enabled', () => {
    const puzzle = {name: 'test', checked_out: false, num_of_pieces: 100, pieces_missing: 0 }
    render(<PuzzleCard type='puzzle' puzzle={puzzle}/>)

    expect(screen.getByRole('button', {name: /borrow/i})).toBeEnabled()
})

test('history puzzle card renders correctly', () => {
    const puzzle = {name: 'test', checked_out: false, check_out_date: '01-01-2000', date_returned: '02-02-2000', windowWidth: 700 }
    render(<PuzzleCard type='history' puzzle={puzzle}/>)

    expect(screen.getByText(/Returned/)).toBeInTheDocument()
}) 

