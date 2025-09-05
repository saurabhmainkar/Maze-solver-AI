import { useEffect, useRef, useState } from 'react';
import { MazeGrid, cellTypes, Position } from '@shared/schema';
import { isStartPosition, isGoalPosition } from '@/lib/maze';

interface MazeCanvasProps {
  maze: MazeGrid;
  rows: number;
  cols: number;
  visitedCells: Position[];
  backtrackCells: Position[];
  solutionPath: Position[];
  currentPosition: Position | null;
  isEditing: boolean;
  editMode: 'wall' | 'path';
  onCellClick: (row: number, col: number) => void;
}

export default function MazeCanvas({
  maze,
  rows,
  cols,
  visitedCells,
  backtrackCells,
  solutionPath,
  currentPosition,
  isEditing,
  editMode,
  onCellClick,
}: MazeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 600 });
  
  // Calculate the appropriate cell size based on maze dimensions
  useEffect(() => {
    const maxWidth = 600;
    const maxHeight = 600;
    
    const cellSize = Math.min(
      Math.floor(maxWidth / cols),
      Math.floor(maxHeight / rows),
      40
    );
    
    setCanvasSize({
      width: cols * cellSize,
      height: rows * cellSize
    });
  }, [rows, cols]);
  
  // Draw the maze whenever relevant props change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const cellSize = canvas.width / cols;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw cells
    for (let k = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = j * cellSize;
        const y = i * cellSize;
        
        if (isStartPosition([i, j])) {
          // Start cell
          ctx.fillStyle = '#38bdf8';  // Light blue
          ctx.fillRect(x, y, cellSize, cellSize);
          ctx.fillStyle = 'white';
          ctx.font = `${cellSize/2}px Inter`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('S', x + cellSize/2, y + cellSize/2);
        } else if (isGoalPosition([i, j], rows, cols)) {
          // Goal cell
          ctx.fillStyle = '#34d399';  // Light green
          ctx.fillRect(x, y, cellSize, cellSize);
          ctx.fillStyle = 'white';
          ctx.font = `${cellSize/2}px Inter`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('G', x + cellSize/2, y + cellSize/2);
        } else if (maze[i][j] === cellTypes.WALL) {
          // Wall
          ctx.fillStyle = '#1F2937';
          ctx.fillRect(x, y, cellSize, cellSize);
        } else {
          // Path
          ctx.fillStyle = 'white';
          ctx.fillRect(x, y, cellSize, cellSize);
        }
        
        // Draw border
        ctx.strokeStyle = '#E5E7EB';
        ctx.strokeRect(x, y, cellSize, cellSize);
      }
    }
    
    // Draw visited cells
    for (const [i, j] of visitedCells) {
      if (!isStartPosition([i, j]) && !isGoalPosition([i, j], rows, cols)) {
        const x = j * cellSize;
        const y = i * cellSize;
        ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';  // Light red
        ctx.fillRect(x, y, cellSize, cellSize);
      }
    }
    
    // Draw backtracked cells
    for (const [i, j] of backtrackCells) {
      if (!isStartPosition([i, j]) && !isGoalPosition([i, j], rows, cols)) {
        const x = j * cellSize;
        const y = i * cellSize;
        ctx.fillStyle = 'rgba(239, 68, 68, 0.6)';  // Darker red
        ctx.fillRect(x, y, cellSize, cellSize);
      }
    }
    
    // Draw solution path
    for (const [i, j] of solutionPath) {
      if (!isStartPosition([i, j]) && !isGoalPosition([i, j], rows, cols)) {
        const x = j * cellSize;
        const y = i * cellSize;
        ctx.fillStyle = '#10B981';  // Green
        ctx.fillRect(x, y, cellSize, cellSize);
      }
    }
    
    // Draw current position
    if (currentPosition) {
      const [i, j] = currentPosition;
      if (!isStartPosition([i, j]) && !isGoalPosition([i, j], rows, cols)) {
        const x = j * cellSize;
        const y = i * cellSize;
        ctx.fillStyle = '#F59E0B';  // Amber
        ctx.fillRect(x, y, cellSize, cellSize);
      }
    }
  }, [
    maze, 
    rows, 
    cols, 
    visitedCells, 
    backtrackCells, 
    solutionPath, 
    currentPosition
  ]);
  
  // Handle click on the canvas to edit the maze
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isEditing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const cellSize = canvas.width / cols;
    
    const j = Math.floor(x / cellSize);
    const i = Math.floor(y / cellSize);
    
    // Don't allow editing start or goal cells
    if (isStartPosition([i, j]) || isGoalPosition([i, j], rows, cols)) {
      return;
    }
    
    onCellClick(i, j);
  };
  
  return (
    <div className="relative overflow-auto">
      <canvas 
        ref={canvasRef}
        width={canvasSize.width} 
        height={canvasSize.height}
        className="border border-gray-300 mx-auto"
        onClick={handleCanvasClick}
      />
    </div>
  );
}
