
"use client";

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowDown, ArrowRight, Search, Plus, Trash2, GitCommitHorizontal, CircleDot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';

// Basic Tree Node Structure
class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  x: number;
  y: number;
  parent: TreeNode | null;

  constructor(value: number, parent: TreeNode | null = null, x = 0, y = 0) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = parent;
    this.x = x;
    this.y = y;
  }
}

// B-Tree Visualizer Component
const TreeVisualizer = ({ tree, highlightNode }: { tree: TreeNode | null, highlightNode: number | null }) => {
  if (!tree) return <div className="text-center text-muted-foreground">Tree is empty. Insert a node to start.</div>;

  const nodes: { node: TreeNode; level: number }[] = [];
  const edges: { from: TreeNode; to: TreeNode }[] = [];

  const traverse = (node: TreeNode | null, level = 0) => {
    if (node) {
      nodes.push({ node, level });
      if (node.left) {
        edges.push({ from: node, to: node.left });
        traverse(node.left, level + 1);
      }
      if (node.right) {
        edges.push({ from: node, to: node.right });
        traverse(node.right, level + 1);
      }
    }
  };

  const assignPositions = (node: TreeNode | null, x = 0, y = 0, horizontalSpacing = 80) => {
    if (node) {
      node.x = x;
      node.y = y;
      const levelSpacing = Math.max(20, horizontalSpacing / 2);
      assignPositions(node.left, x - levelSpacing, y + 60, levelSpacing);
      assignPositions(node.right, x + levelSpacing, y + 60, levelSpacing);
    }
  };
  
  assignPositions(tree);
  traverse(tree);
  
  const minX = Math.min(...nodes.map(n => n.node.x));
  const maxX = Math.max(...nodes.map(n => n.node.x));
  const width = maxX - minX + 60;

  return (
    <div className="relative h-full min-h-[300px] w-full" style={{ width: `${width}px`, margin: '0 auto' }}>
      <AnimatePresence>
        {edges.map((edge, i) => {
            const angle = Math.atan2(edge.to.y - edge.from.y, edge.to.x - edge.from.x) * 180 / Math.PI;
            const distance = Math.sqrt(Math.pow(edge.to.x - edge.from.x, 2) + Math.pow(edge.to.y - edge.from.y, 2));

            return (
                 <motion.div
                    key={`line-${edge.from.value}-${edge.to.value}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute bg-muted-foreground"
                    style={{
                        left: `calc(50% + ${edge.from.x}px)`,
                        top: `${edge.from.y}px`,
                        height: '2px',
                        width: `${distance}px`,
                        transformOrigin: 'top left',
                        transform: `translate(19px, 19px) rotate(${angle}deg)`
                    }}
                />
            )
        })}
        {nodes.map(({ node }) => (
            <motion.div
            key={`node-${node.value}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`absolute flex items-center justify-center w-10 h-10 rounded-full border-2
                        ${highlightNode === node.value ? 'bg-primary border-primary-foreground shadow-lg scale-110' : 'bg-card border-primary'}
                        transition-all duration-300`}
            style={{ 
              left: `calc(50% + ${node.x}px)`, 
              top: `${node.y}px`,
              transform: 'translateX(-50%)',
            }}
          >
            <span className="text-sm font-bold">{node.value}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};


export function DataStructureVisualizer() {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [highlightNode, setHighlightNode] = useState<number | null>(null);
  const { toast } = useToast();

  const handleInsert = useCallback(() => {
    const value = parseInt(inputValue, 10);
    if (isNaN(value)) {
      toast({ title: "Invalid Input", description: "Please enter a number.", variant: 'destructive' });
      return;
    }

    if (!tree) {
      setTree(new TreeNode(value));
      setInputValue('');
      return;
    }

    const newTree = JSON.parse(JSON.stringify(tree)); // Deep copy
    let currentNode = newTree;
    while (true) {
      if (value < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = new TreeNode(value);
          break;
        }
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        if (!currentNode.right) {
          currentNode.right = new TreeNode(value);
          break;
        }
        currentNode = currentNode.right;
      } else {
        toast({ title: "Duplicate Value", description: "This value already exists in the tree." });
        return;
      }
    }

    setTree(newTree);
    setHighlightNode(value);
    setInputValue('');
    setTimeout(() => setHighlightNode(null), 1500);

  }, [inputValue, tree, toast]);

  const handleSearch = useCallback(() => {
    const value = parseInt(inputValue, 10);
    if (isNaN(value)) {
      toast({ title: "Invalid Input", description: "Please enter a number.", variant: 'destructive' });
      return;
    }
    
    let currentNode = tree;
    const path = [];
    while(currentNode) {
        path.push(currentNode.value);
        if(value === currentNode.value) {
            toast({ title: "Found!", description: `Value ${value} found in the tree.` });
            path.forEach((val, index) => {
                setTimeout(() => setHighlightNode(val), index * 400);
            });
            setTimeout(() => setHighlightNode(null), path.length * 400);
            setInputValue('');
            return;
        }
        currentNode = value < currentNode.value ? currentNode.left : currentNode.right;
    }
    
    toast({ title: "Not Found", description: `Value ${value} is not in the tree.`, variant: 'destructive' });
    setHighlightNode(null);
  }, [inputValue, tree, toast]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInsert();
    }
  }

  return (
    <div className="space-y-4">
        <Card>
            <CardHeader>
                <CardTitle>Binary Search Tree</CardTitle>
                <CardDescription>Insert, search, or delete nodes from the tree.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                 <Input 
                    placeholder="Enter a number..." 
                    className="max-w-xs"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    type="number"
                />
                <Button onClick={handleInsert}><Plus className="mr-2" /> Insert</Button>
                <Button variant="outline" onClick={handleSearch}><Search className="mr-2" /> Search</Button>
                <Button variant="destructive" disabled><Trash2 className="mr-2" /> Delete (soon)</Button>
            </CardContent>
        </Card>
        <Card className="min-h-[400px] w-full overflow-x-auto">
            <CardContent className="p-6">
                <TreeVisualizer tree={tree} highlightNode={highlightNode} />
            </CardContent>
        </Card>
    </div>
  );
}
