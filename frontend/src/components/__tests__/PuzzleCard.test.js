import { render, screen } from "@testing-library/react";
import PuzzleCard from "../PuzzleCard";

test('if puzzle is checked out, "borrow" button is disabled', () => {
    const puzzle = {name: 'test', checked_out: true, num_of_pieces: 100, pieces_missing: 0 }
    render(<PuzzleCard type='puzzle' puzzle={puzzle}/>)

    screen.debug()
})