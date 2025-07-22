
"use client";

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useInterval } from '@/hooks/use-interval';
import { Play, Pause, RotateCcw, Shuffle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ALGORITHMS = {
  bubbleSort: {
    name: 'Bubble Sort',
    snippet: `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
      }
    }
  }
  return arr;
}`,
    generator: generateBubbleSortSteps,
  },
  selectionSort: {
    name: 'Selection Sort',
    snippet: `function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}`,
    generator: generateSelectionSortSteps,
  },
  insertionSort: {
    name: 'Insertion Sort',
    snippet: `function insertionSort(arr) {
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    generator: generateInsertionSortSteps,
  }
};

type AlgorithmKey = keyof typeof ALGORITHMS;

type SortStep = {
  array: number[];
  compare: number[];
  swap: number[];
  sorted: number[];
};

function generateBubbleSortSteps(initialArray: number[]): SortStep[] {
  const arr = [...initialArray];
  const steps: SortStep[] = [];
  const n = arr.length;
  const sorted: number[] = [];

  steps.push({ array: [...arr], compare: [], swap: [], sorted: [...sorted] });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ array: [...arr], compare: [j, j + 1], swap: [], sorted: [...sorted] });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({ array: [...arr], compare: [j, j + 1], swap: [j, j + 1], sorted: [...sorted] });
      }
    }
    sorted.push(n - 1 - i);
  }
  sorted.push(0);
  steps.push({ array: [...arr], compare: [], swap: [], sorted: [...sorted] });
  return steps;
};

function generateSelectionSortSteps(initialArray: number[]): SortStep[] {
    const arr = [...initialArray];
    const steps: SortStep[] = [];
    const n = arr.length;
    const sorted: number[] = [];

    steps.push({ array: [...arr], compare: [], swap: [], sorted: [...sorted] });

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        steps.push({ array: [...arr], compare: [minIndex], swap: [], sorted: [...sorted] });
        for (let j = i + 1; j < n; j++) {
            steps.push({ array: [...arr], compare: [minIndex, j], swap: [], sorted: [...sorted] });
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
                 steps.push({ array: [...arr], compare: [minIndex, j], swap: [], sorted: [...sorted] });
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            steps.push({ array: [...arr], compare: [i, minIndex], swap: [i, minIndex], sorted: [...sorted] });
        }
        sorted.push(i);
    }
    sorted.push(n-1);
    steps.push({ array: [...arr], compare: [], swap: [], sorted: [...sorted] });
    return steps;
}

function generateInsertionSortSteps(initialArray: number[]): SortStep[] {
    const arr = [...initialArray];
    const steps: SortStep[] = [];
    const n = arr.length;
    
    steps.push({ array: [...arr], compare: [], swap: [], sorted: [0] });

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        steps.push({ array: [...arr], compare: [i, j], swap: [], sorted: Array.from({length: i}, (_, k) => k) });
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            steps.push({ array: [...arr], compare: [j, j+1], swap: [j+1], sorted: Array.from({length: i}, (_, k) => k) });
            j = j - 1;
        }
        arr[j + 1] = key;
        steps.push({ array: [...arr], compare: [j+1], swap: [], sorted: Array.from({length: i + 1}, (_, k) => k) });
    }
    
    steps.push({ array: [...arr], compare: [], swap: [], sorted: Array.from({length: n}, (_, k) => k) });
    return steps;
}


const generateRandomArray = (size = 15) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
};

export function AlgorithmVisualizer() {
    const [algorithm, setAlgorithm] = useState<AlgorithmKey>('bubbleSort');
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(200);
    const [arrayData, setArrayData] = useState(generateRandomArray());
    const [sortSteps, setSortSteps] = useState<SortStep[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const { toast } = useToast();
    
    const selectedAlgorithm = ALGORITHMS[algorithm];

    const generateSteps = () => {
        const steps = selectedAlgorithm.generator(arrayData);
        setSortSteps(steps);
        setCurrentStep(0);
        return steps;
    }

    const handleStart = () => {
        const steps = (sortSteps.length === 0 || currentStep === 0) ? generateSteps() : sortSteps;
        if (currentStep >= steps.length - 1) {
            setCurrentStep(0);
        }
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const handleReset = () => {
        setIsPlaying(false);
        setCurrentStep(0);
        setSortSteps([]);
        toast({ title: 'Visualizer Reset', description: 'Ready for a new visualization.'});
    };

    const handleRandomize = () => {
        setIsPlaying(false);
        setCurrentStep(0);
        const newArray = generateRandomArray();
        setArrayData(newArray);
        setSortSteps([]);
    };
    
    useInterval(() => {
        if (isPlaying && currentStep < sortSteps.length - 1) {
            setCurrentStep(step => step + 1);
        } else if (isPlaying) {
             setIsPlaying(false);
             toast({ title: 'Visualization Complete!' });
        }
    }, isPlaying ? speed : null);

    const chartData = (sortSteps[currentStep]?.array || arrayData).map((value, index) => ({
        name: `${index}`,
        value,
    }));

    const { compare, swap, sorted } = sortSteps[currentStep] || { compare: [], swap: [], sorted: [] };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-4">
        <Card>
            <CardHeader>
                <CardTitle>
                    <Select value={algorithm} onValueChange={(val) => setAlgorithm(val as AlgorithmKey)}>
                        <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder="Select an algorithm" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(ALGORITHMS).map(([key, value]) => (
                                <SelectItem key={key} value={key}>{value.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Textarea
                    value={selectedAlgorithm.snippet}
                    readOnly
                    className="flex-grow w-full h-72 rounded-b-none border-0 font-code text-base bg-muted"
                />
            </CardContent>
        </Card>
        <div className="flex gap-2 justify-center">
            <Button onClick={isPlaying ? handlePause : handleStart} size="icon" title={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? <Pause /> : <Play />}
            </Button>
            <Button onClick={handleReset} variant="outline" size="icon" title="Reset">
                <RotateCcw />
            </Button>
            <Button onClick={handleRandomize} variant="outline" size="icon" title="Randomize Array">
                <Shuffle />
            </Button>
        </div>
      </div>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Visualization</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" tick={{fontSize: 12}} />
              <YAxis domain={[0, 100]} />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                    <Cell 
                        key={`cell-${index}`} 
                        fill={
                            sorted.includes(index) ? 'hsl(var(--chart-2))' :
                            swap.includes(index) ? 'hsl(var(--destructive))' : 
                            compare.includes(index) ? 'hsl(var(--primary))' : 
                            'hsl(var(--primary) / 0.4)'
                        } 
                    />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
           <p className="text-center text-sm text-muted-foreground mt-4">Step: {currentStep} / {sortSteps.length > 0 ? sortSteps.length -1 : 'N/A'}</p>
        </CardContent>
      </Card>
    </div>
  );
}
