# PuzzleTheque

## Introduction
PuzzleTheque is a puzzle library app. Most people will only complete a jugsaw puzzle one time. Then the puzzle will sit on the shelf, taking up space and collecting dust. Why not just borrow the puzzle? The puzzle gets used more and you don't have to store puzzles.

PuzzleTheque helps facilitate the borrowing of puzzles. Users can login and borrow puzzles. They can also renew and return puzzles. Users can also contribute to the puzzle economy by donating a puzzle. 

## Technologies
Project is created with:
- React 17.0.2
- React Icons 4.3.1
- React-Router 5.2.0
- Ruby 2.6.1
- Rails 6.1.4
- Postgres 1.1
- Rack-cors 1.1
- JWT 2.2
- bcrypt 3.1.7
- JSON 2.5
- Active Record 6.1
- Active Model Serializers 0.10.12

## Launch
To launch the backend, cd into the backend directory and run:

```
$ bundle install
$ rails db:migrate
$ rails db:seed
$ rails s
```
Then to launch the frontend, cd into the frontend directory and run:
```
$ yarn install
$ yarn start
```

## Video Demo
<a href="https://www.loom.com/share/ac4af1c5f89c4b3c958c3842bfc7e63c" target="_blank">PuzzleTheque Walkthrough Video</a>

## Models
![Model Relationships](./model-relationships.png)

- User:
    - username
    - password
- Puzzle:
    - name
    - checked_out
    - pieces_missing
    - category
    - img_url
    - num_of_pieces
- Borrow:
    - user_id
    - puzzle_id
    - check_out_date
    - due_date
    - date_returned
    - active

## User Stories:
Users will be able to:
- [x] log into the application - very basic, just type in username
- [x] Create new user
- [x] Browse available puzzles
- [x] Checkout puzzles - which will add a user_id to puzzle
- [x] View checked out puzzles
- [x] Return puzzles - which will remove the user’s id from the puzzle
- [x] Delete account - removes user from db
- [x] Renew puzzle - doubles the time the user can have the puzzle checked out;
- [x] Contribute to the puzzle economy - if member has extra puzzles to contribute, they can fill in a form and this will add the new puzzle to the DB


## Stretch Goals:
- [x] fix backend user model to use field name 'username' - this is causing way too much confusion!
- [x] Limits on renewing: max 2 renews (9 weeks)
- [x] Limits on the amount of puzzles that can be checked out by a given user
- [x] Transform into a Ruby on Rails app
- [x] Transition to using functional components rather than class components
    ####Components to transition:
    - [x] Contribute
    - [x] Login
    - [x] PuzzleCard
    - [x] PuzzleContainer
    - [x] Signup
    - [x] Splash
    - [x] UserContainer
    - [x] UserPuzzleCard
    - [x] App
- [x] Add better User login with proper auth
    - [x] backend
    - [x] frontend
- [x] user can change their password
- [x] Add popup message to confirm that user wants to delete their account
- [x] Make it so there is a record of what puzzles a user has checked out
    - [x] Add an active attribute to Borrow
    - [x] Borrows are create with Active set to true
    - [x] Active is set to false when the puzzle is returned
    - [x] Borrows no longer have to be destroyed
    - [x] Add a date returned field to Borrow model
    - [x] Add some way to interact with borrow history on frontend
    - [x] What happens when a user deletes their account?
        - delete all borrows associated with user
- [x] add the 'login to borrow...' message to a popup message and un-disable the buttons
- [x] Work on better responsive layout
- [x] Double check that errors are being handled consistantly across app
- [ ] Add 'forgot my password' functionality
- [ ] add a sorting functionality to sort puzzles by number of pieces
- [ ] user can change their username
- [ ] add pagination to puzzles page
- [ ] add testing
    #### High Value Features:
    - [ ] user can borrow puzzle
    - [ ] user can return puzzle
    #### Edge Cases in High Value Features:
    - [ ] user can only borrow 5 puzzles
    - [x] user cannot borrow an unavailable puzzle
    #### Unit Tests:
    - [x] all error messages for Login, Signup & ChangePassword


- [ ] Require user to return all puzzles before deleting account - right now they are taking all our puzzles!!!
- [ ] Users can review puzzles with a rating and text review - this will create a new model, reviews, which will have a one to many relationship with users and puzzles. Will need to alias users as reviewers and puzzles as puzzle_reviews so AR doesn’t get confused.
- [ ] Add a librarian feature so users can’t return their puzzles. Librarian would be a type of user or its own class who has the ability to return puzzles
- [ ] Library fines - a fines column could live on users and users could get fines for late returns; also librarian class could assign fines for damaged puzzles?
