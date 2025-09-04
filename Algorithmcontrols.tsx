import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, StepForward, RotateCcw } from "lucide-react";
//Coded in HTML
interface AlgorithmControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (value: number[]) => void;
  isRunning: boolean;
  isPaused: boolean;
}

export default function AlgorithmControls({
  onPlay,
  onPause,
  onStep,
  onReset,
  speed,
  onSpeedChange,
  isRunning,
  isPaused
}: AlgorithmControlsProps) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-4">
      <div className="flex space-x-2">
        <Button 
          id="playBtn" 
          onClick={onPlay}
          disabled={isRunning && !isPaused}
          className="bg-primary hover:bg-primary/90 text-white font-medium"
        >
          <Play className="h-5 w-5 mr-1" />
          Play
        </Button>
        <Button 
          id="pauseBtn" 
          onClick={onPause}
          disabled={!isRunning || isPaused}
          className="bg-gray-500 hover:bg-gray-600 text-white font-medium"
        >
          <Pause className="h-5 w-5 mr-1" />
          Pause
        </Button>
        <Button 
          id="stepBtn" 
          onClick={onStep}
          disabled={isRunning && !isPaused}
          className="bg-control hover:bg-control/90 text-white font-medium"
        >
          <StepForward className="h-5 w-5 mr-1" />
          Step
        </Button>
        <Button 
          id="resetBtn" 
          onClick={onReset}
          variant="outline"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
        >
          <RotateCcw className="h-5 w-5 mr-1" />
          Reset
        </Button>
      </div>
      
      <div className="flex items-center gap-2 ml-auto">
        <label htmlFor="speedSlider" className="text-sm font-medium text-gray-700">
          Speed:
        </label>
        <Slider
          id="speedSlider"
          min={1}
          max={10}
          step={1}
          value={[speed]}
          onValueChange={onSpeedChange}
          className="w-32 accent-primary"
        />
      </div>
    </div>
  );
}
