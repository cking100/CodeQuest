
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Play, Pause, RotateCcw, Footprints, GitCommitHorizontal } from 'lucide-react';
import { useInterval } from '@/hooks/use-interval';
import { AnimatePresence, motion } from 'framer-motion';

const fibonacciCode = [
  "function fibonacci(n) {",
  "  if (n <= 1) {",
  "    return n;",
  "  }",
  "  return fibonacci(n - 1) + fibonacci(n - 2);",
  "}"
];

// Pre-calculated execution steps for fibonacci(4)
const executionSteps = [
    { callStack: [{ name: 'fib(4)', line: 0 }], line: 0, output: null },
    { callStack: [{ name: 'fib(4)', line: 1 }], line: 1, output: null },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(3)', line: 0 }], line: 0, output: null },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(3)', line: 1 }], line: 1, output: null },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(3)', line: 4 }, { name: 'fib(2)', line: 0 }], line: 0, output: null },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(3)', line: 4 }, { name: 'fib(2)', line: 1 }], line: 1, output: null },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(3)', line: 4 }, { name: 'fib(2)', line: 4 }, { name: 'fib(1)', line: 0 }], line: 0, output: null },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(3)', line: 4 }, { name: 'fib(2)', line: 4 }, { name: 'fib(1)', line: 1 }], line: 1, output: null },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(3)', line: 4 }, { name: 'fib(2)', line: 4 }, { name: 'fib(1)', line: 2 }], line: 2, output: 1 },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(3)', line: 4 }, { name: 'fib(2)', line: 4 }], line: 4, output: null },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(3)', line: 4 }, { name: 'fib(2)', line: 4 }, { name: 'fib(0)', line: 0 }], line: 0, output: null },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(3)', line: 4 }, { name: 'fib(2)', line: 4 }, { name: 'fib(0)', line: 1 }], line: 1, output: null },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(3)', line: 4 }, { name: 'fib(2)', line: 4 }, { name: 'fib(0)', line: 2 }], line: 2, output: 0 },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(3)', line: 4 }, { name: 'fib(2)', line: 4 }], line: 4, output: '1 + 0' },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(3)', line: 4 }, { name: 'fib(2)', line: 5 }], line: 5, output: 1 },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(3)', line: 4 }], line: 4, output: null },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(3)', line: 4 }, { name: 'fib(1)', line: 0 }], line: 0, output: null },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(3)', line: 4 }, { name: 'fib(1)', line: 1 }], line: 1, output: null },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(3)', line: 4 }, { name: 'fib(1)', line: 2 }], line: 2, output: 1 },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(3)', line: 4 }], line: 4, output: '1 + 1' },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(3)', line: 5 }], line: 5, output: 2 },
    { callStack: [{ name: 'fib(4)', line: 4 }], line: 4, output: null },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(2)', line: 0 }], line: 0, output: null },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(2)', line: 1 }], line: 1, output: null },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(2)', line: 4 }, { name: 'fib(1)', line: 0 }], line: 0, output: null },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(2)', line: 4 }, { name: 'fib(1)', line: 1 }], line: 1, output: null },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(2)', line: 4 }, { name: 'fib(1)', line: 2 }], line: 2, output: 1 },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(2)', line: 4 }], line: 4, output: null },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(2)', line: 4 }, { name: 'fib(0)', line: 0 }], line: 0, output: null },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(2)', line: 4 }, { name: 'fib(0)', line: 1 }], line: 1, output: null },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(2)', line: 4 }, { name: 'fib(0)', line: 2 }], line: 2, output: 0 },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(2)', line: 4 }], line: 4, output: '1 + 0' },
    { callStack: [{ name: 'fib(4)', line: 4 }, { name: 'fib(2)', line: 5 }], line: 5, output: 1 },
    { callStack: [{ name: 'fib(4)', line: 4 }], line: 4, output: '2 + 1' },
    { callStack: [{ name: 'fib(4)', line: 5 }], line: 5, output: 3 },
    { callStack: [], line: -1, output: 'Result: 3' },
];

export function ExecutionFlowVisualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleStart = () => {
    if (currentStep >= executionSteps.length - 1) {
        setCurrentStep(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => setIsPlaying(false);
  
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  useInterval(() => {
    if (isPlaying && currentStep < executionSteps.length - 1) {
      setCurrentStep(step => step + 1);
    } else if (isPlaying) {
      setIsPlaying(false);
    }
  }, isPlaying ? 300 : null);

  const { callStack, line, output } = executionSteps[currentStep];

  return (
    <div className="grid md:grid-cols-2 gap-6 font-code">
      <div>
        <Card>
            <CardHeader>
                <CardTitle>Code</CardTitle>
                <CardDescription>Visualizing `fibonacci(4)`</CardDescription>
            </CardHeader>
            <CardContent className="bg-muted rounded-b-lg p-4">
                {fibonacciCode.map((codeLine, index) => (
                    <div key={index} className={`relative transition-colors duration-200 rounded px-2 ${line === index ? 'bg-primary/30' : ''}`}>
                         <AnimatePresence>
                         {line === index && (
                             <motion.div
                                 layoutId="highlight"
                                 className="absolute left-0 top-0 h-full w-full bg-primary/20 rounded"
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 1 }}
                                 exit={{ opacity: 0 }}
                             />
                         )}
                         </AnimatePresence>
                        <pre className="relative z-10 whitespace-pre-wrap"><span className="text-muted-foreground select-none mr-4">{index+1}</span>{codeLine}</pre>
                    </div>
                ))}
            </CardContent>
        </Card>
        <div className="flex gap-2 justify-center mt-4">
            <Button onClick={isPlaying ? handlePause : handleStart} size="icon" title={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? <Pause /> : <Play />}
            </Button>
            <Button onClick={handleReset} variant="outline" size="icon" title="Reset">
                <RotateCcw />
            </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><GitCommitHorizontal /> Call Stack</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 min-h-[200px] bg-muted/40 rounded-lg p-4">
            <AnimatePresence>
            {callStack.length > 0 ? callStack.slice().reverse().map((call, index) => (
              <motion.div 
                key={call.name + index}
                layout
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="p-2 bg-card rounded border text-sm shadow-sm"
              >
                {call.name} <span className="text-muted-foreground text-xs">(line: {call.line + 1})</span>
              </motion.div>
            )) : <div className="text-muted-foreground text-center pt-8">Stack is empty.</div> }
            </AnimatePresence>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
          </CardHeader>
          <CardContent className="min-h-[50px] bg-muted/40 rounded-lg p-4">
            <p className="text-lg font-bold text-center text-primary">{output}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
