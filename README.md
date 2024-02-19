# Memory Maze

## Specification Deliverable
### Elevator Pitch
Introducing "Memory Maze"-- the ultimate challenge for your memorizing skills! Immerse yourself in a simple game, where a 5x5 grid flashes individual squares in a certain pattern. The way to win is to click the squares in the correct order and exit the maze. Sounds easy right? But hold on, each round amps up the challenge. With each successful round, the challenge increases difficulty as more squares join the memory dance. How far can you go before the grid outsmarts you? Sharpen your instincts and give your brain a good workout by challenging yourself to Memory Maze!

### Design
![This image shows the design of my user authentication, gameplay, leaderboard, and tutorial pages](images/IMG_8452.jpg)
![This image shows the design of my tutorial page](images/IMG_8453.jpg)

### Key features
* Allow users to create accounts and log in
* Display the user's name after log in
* Display of 5x5 grid
* Display of current round number to indicate difficulty level
* Display of "lives" showing how many tries the user has left to successfully pass a level
* Ability to select any squares in 5x5 grid starting with the top left square and ending with the bottom right square
* Highlight square(s) in different colors and in a sequential order for the user to click
* Ability for the user to show the sequence a second time
* Ability for the user to restart the game
* Scores from all users displayed in realtime
* Store user profiles, including high scores
* Results are persistently stored
* Display a leaderboard showing the highest scores achieved by users

### Technologies
I am going to use the required technologies in the following ways. 
* **HTML** - I will utilize HTML to create a structured application with separate pages for user authentication, gameplay interface, the leaderboard, and the tutorial. I will also utilize HTML to implement hyperlinks to navigate between different sections of the web program.
* **CSS**  - I will use CSS to make my gameplay interface visually appealing and have a responsive design. I will use proper whitespace, color schemes, and contrast to enhance the user experience. 
* **JavaScript** - I will employ Javascript with user authentication. I will also use it to develop the gameplay logic such as highlighting squares, handling user clicks, and managing progressive difficulty. I will utilize backend endpoint calls for seamless interaction with the server. 
* **Service** - I will have backend service with the following endpoints:
    * Login
    * Gameplay
    * Scores
    * Tutorial
    * Websocket
* **Database** - I will implement a database to store user profiles including login credentials and high scores. I will also ensure secure storage of user credentials in the database and persistently store game progress and scores. 
* **Websocket** - I will integrate WebSocket for real-time communication between users. I will also use Websocket to broadcast data on each round (sequence of flashing squares).
* **React** - I will port the application to use the React web framework for enhanced modularity and maintainability. I will also leverage React components for the login page, gameplay interface leaderboard, and tutorial.

