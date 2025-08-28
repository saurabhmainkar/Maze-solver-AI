import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ControlPanelProps {
  rows: number;
  cols: number;
  onSizeChange: (rows: number, cols: number) => void;
  onGenerateRandomMaze: () => void;
  onClearMaze: () => void;
  algorithmType: string;
  onAlgorithmChange: (algorithm: string) => void;
  editMode: 'wall' | 'path';
  onEditModeChange: (mode: 'wall' | 'path') => void;
  isRunning: boolean;
}

export default function ControlPanel({
  rows,
  cols,
  onSizeChange,
  onGenerateRandomMaze,
  onClearMaze,
  algorithmType,
  onAlgorithmChange,
  editMode,
  onEditModeChange,
  isRunning
}: ControlPanelProps) {
  const [rowsInput, setRowsInput] = useState(rows.toString());
  const [colsInput, setColsInput] = useState(cols.toString());
  
  const handleResizeClick = () => {
    const newRows = parseInt(rowsInput);
    const newCols = parseInt(colsInput);
    
    if (isNaN(newRows) || isNaN(newCols) || newRows < 2 || newCols < 2) {
      alert('Please enter valid dimensions (minimum 2x2)');
      return;
    }
    
    if (newRows > 30 || newCols > 30) {
      alert('Maximum maze size is 30x30');
      setRowsInput(Math.min(newRows, 30).toString());
      setColsInput(Math.min(newCols, 30).toString());
      return;
    }
    
    onSizeChange(newRows, newCols);
  };
  
  return (
    <div className="lg:w-80 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-medium text-gray-800 mb-4">Controls</h2>
      
      {/* Size controls */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Maze Size</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="rows" className="text-sm text-gray-600 mb-1">Rows</Label>
            <Input 
              id="rows" 
              type="number" 
              min="2" 
              max="30" 
              value={rowsInput}
              onChange={(e) => setRowsInput(e.target.value)}
              disabled={isRunning}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="cols" className="text-sm text-gray-600 mb-1">Columns</Label>
            <Input 
              id="cols" 
              type="number" 
              min="2" 
              max="30" 
              value={colsInput}
              onChange={(e) => setColsInput(e.target.value)}
              disabled={isRunning}
              className="w-full"
            />
          </div>
        </div>
        <Button 
          id="resizeBtn" 
          onClick={handleResizeClick}
          disabled={isRunning}
          variant="outline"
          className="mt-2 w-full bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          Apply Size
        </Button>
      </div>
      
      {/* Maze generation */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Maze Generation</h3>
        <Button 
          id="randomMazeBtn" 
          onClick={onGenerateRandomMaze}
          disabled={isRunning}
          className="w-full mb-2 bg-control hover:bg-control/90 text-white"
        >
          Generate Random Maze
        </Button>
        <Button 
          id="clearMazeBtn" 
          onClick={onClearMaze}
          disabled={isRunning}
          variant="outline"
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          Clear Maze
        </Button>
      </div>
      
      {/* Algorithm selection */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Algorithm</h3>
        <Select 
          value={algorithmType} 
          onValueChange={onAlgorithmChange}
          disabled={isRunning}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Algorithm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dfs">Depth-First Search (DFS)</SelectItem>
            <SelectItem value="bfs" disabled>Breadth-First Search (BFS)</SelectItem>
            <SelectItem value="astar" disabled>A* Algorithm</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Editing mode */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Edit Mode</h3>
        <RadioGroup 
          value={editMode} 
          onValueChange={(value) => onEditModeChange(value as 'wall' | 'path')}
          disabled={isRunning}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="wall" id="wall" />
            <Label htmlFor="wall">Wall</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="path" id="path" />
            <Label htmlFor="path">Path</Label>
          </div>
        </RadioGroup>
      </div>
      
      {/* Instructions */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Instructions</h3>
        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
          <li>Click on cells to create/remove walls</li>
          <li>Start is always top-left corner</li>
          <li>Goal is always bottom-right corner</li>
          <li>Press Play to start the algorithm</li>
          <li>Adjust speed with the slider</li>
        </ul>
      </div>
    </div>
  );
}
