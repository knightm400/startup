# Memory Maze

## Specification Deliverable
### Elevator Pitch
Introducing "Memory Maze"-- the ultimate challenge for your memorizing skills! Immerse yourself in a simple game, where a 5x5 grid flashes squares sequentially. The way to win is to click the squares in the correct order. Sounds easy right? But hold on, each round amps up the challenge. With each successful round, the challenge increases difficulty as more squares join the memory dance. How far can you go before the grid outsmarts you? Sharpen your instincts and give your brain a good workout by challenging yourself to Memory Maze!

### Design


### Key features
* Allow users to create accounts and log in
* Display the user's name after log in
* Display of 5x5 grid
* Display of current round number to indicate difficulty level
* Ability to select any squares in 5x5 grid
* Highlight square(s) in different colors and in a sequential order for the user to click
* Scores from all users displayed in realtime
* Store user profiles, including high scores
* Results are persistently stored
* Display a leaderboard showing the highest scores achieved by users

### Technologies
I am going to use the required technologies in the following ways. 
* **HTML** - I will utilize HTML to create a structured application with separate pages for user authentication, gameplay interface, and the leaderboard. I will also utilize HTML to implement hyperlinks to navigate between different sections of the web program.
* **CSS**  - I will use CSS to make my gameplay interface visually appealing and have a responsive design. I will use proper whitespace, color schemes, and contrast to enhance the user experience. 
* **JavaScript** - I will employ Javascript with user authentication. I will also use it to develo pthe gameplay logic such as highlighting squares, handling user clicks, and managing progressive difficult. I will utilize backend endpoint calls for seamless interaction with the server. 
* **Service** - I will have backend service with the following endpoints:
    * Login
    * Gameplay
    * Scores
    * Websocket
* **Database** - I will implement a database to store user profiles including login credentials and high scores. I will also ensure secure storage of user credentials in the database and persistently store game progress and scores. 
* **Websocket** - I will integrate WebSocket for real-time communication between users. I will also use Websocket to broadcast data on each round (sequence of flashing squares)
* **React** - I will port the application to use the React web framework for enhanced modularity and maintainability. I will also leverage React components for the login page, gameplay interface, and leaderboard. 

