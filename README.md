Maze Solver 🧩

A simple maze solver that finds a path from the start to the goal using classic pathfinding algorithms. This project demonstrates fundamental computer science concepts like graph traversal, recursion, and search strategies.

🚀 Features

Supports multiple solving strategies:

Depth-First Search (DFS)

Breadth-First Search (BFS)

(Optional: A* if implemented)

Reads mazes from text files or 2D arrays

Visualizes the maze and solution path in the console (or GUI, if added)

Detects unsolvable mazes
   git clone https://github.com/yourusername/student-marks-management-system.git
maze-solver/
│── src/              # Source code
│   ├── maze.py       # Maze class (parsing & representation)
│   ├── solver.py     # Pathfinding algorithms
│   └── main.py       # Entry point
│
│── mazes/            # Sample maze text files
│   ├── maze1.txt
│   └── maze2.txt
│
│── README.md         # Project description

🖥️ Usage
1. Clone the repo
2. git clone https://github.com/yourusername/maze-solver.git
cd maze-solver
2. Run the solver
python main.py mazes/maze1.txt --method bfs

🧠 Algorithms

DFS: Explores as far as possible before backtracking (may not find the shortest path).

BFS: Explores level by level, always finds the shortest path if one exists.

A* (if implemented): Uses heuristics for efficient solving.

📸 Screenshots <img width="2556" height="1524" alt="Screenshot 2025-09-15 132835" src="https://github.com/user-attachments/assets/3026a431-ca3e-46e3-b2b3-097d45b905cb" />



Add terminal or GUI screenshots of your maze being solved.

🛠️ Tech Stack

Language: Python Javascript HTML

Paradigm: Object-Oriented 

Libraries: Standard libraries only (unless you added visualization tools)

🤝 Contributing

Pull requests are welcome! If you’d like to add new algorithms (Dijkstra, Greedy, etc.) or visualization, feel free to fork and submit.

📜 License

This project is open-source and available under the MIT License
.
