export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  testCases: { input: string; expected: string }[];
}

export const challenges: Challenge[] = [
  // Easy
  {
    id: 'easy-1',
    title: 'Two Sum',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.',
    difficulty: 'Easy',
    category: 'Arrays',
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', expected: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', expected: '[1,2]' },
    ],
  },
  {
    id: 'easy-2',
    title: 'Reverse String',
    description: 'Write a function that reverses a string. The input string is given as an array of characters.',
    difficulty: 'Easy',
    category: 'Strings',
    testCases: [
      { input: 's = ["h","e","l","l","o"]', expected: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', expected: '["h","a","n","n","a","H"]' },
    ],
  },
  {
    id: 'easy-3',
    title: 'Check for Palindrome',
    description: 'Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.',
    difficulty: 'Easy',
    category: 'Strings',
    testCases: [
        { input: 's = "A man, a plan, a canal: Panama"', expected: 'true' },
        { input: 's = "race a car"', expected: 'false' },
    ],
  },
    {
    id: 'easy-4',
    title: 'FizzBuzz',
    description: 'Write a program that outputs the string representation of numbers from 1 to n. But for multiples of three it should output “Fizz” instead of the number and for the multiples of five output “Buzz”. For numbers which are multiples of both three and five output “FizzBuzz”.',
    difficulty: 'Easy',
    category: 'Math',
    testCases: [
        { input: 'n = 3', expected: '["1", "2", "Fizz"]' },
        { input: 'n = 5', expected: '["1", "2", "Fizz", "4", "Buzz"]' },
    ],
  },
  {
    id: 'easy-5',
    title: 'Maximum Depth of Binary Tree',
    description: 'Given the root of a binary tree, return its maximum depth.',
    difficulty: 'Easy',
    category: 'Trees',
    testCases: [
        { input: 'root = [3,9,20,null,null,15,7]', expected: '3' },
        { input: 'root = [1,null,2]', expected: '2' },
    ],
  },
  {
    id: 'easy-6',
    title: 'Contains Duplicate',
    description: 'Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.',
    difficulty: 'Easy',
    category: 'Arrays',
    testCases: [
      { input: 'nums = [1,2,3,1]', expected: 'true' },
      { input: 'nums = [1,2,3,4]', expected: 'false' },
    ],
  },
  // Add 14 more easy questions...
  { id: 'easy-7', title: 'Single Number', description: 'Find the single number in an array where every other number appears twice.', difficulty: 'Easy', category: 'Arrays', testCases: [{input: '[2,2,1]', expected: '1'}] },
  { id: 'easy-8', title: 'Valid Anagram', description: 'Check if two strings are anagrams of each other.', difficulty: 'Easy', category: 'Strings', testCases: [{input: 's = "anagram", t = "nagaram"', expected: 'true'}] },
  { id: 'easy-9', title: 'Move Zeroes', description: 'Move all 0\'s to the end of an array while maintaining the relative order of the non-zero elements.', difficulty: 'Easy', category: 'Arrays', testCases: [{input: '[0,1,0,3,12]', expected: '[1,3,12,0,0]'}] },
  { id: 'easy-10', title: 'Best Time to Buy and Sell Stock', description: 'Find the maximum profit you can achieve from buying and selling a stock once.', difficulty: 'Easy', category: 'Arrays', testCases: [{input: '[7,1,5,3,6,4]', expected: '5'}] },
  { id: 'easy-11', title: 'Linked List Cycle', description: 'Determine if a linked list has a cycle in it.', difficulty: 'Easy', category: 'Linked List', testCases: [{input: 'head = [3,2,0,-4], pos = 1', expected: 'true'}] },
  { id: 'easy-12', title: 'Merge Two Sorted Lists', description: 'Merge two sorted linked lists and return it as a new sorted list.', difficulty: 'Easy', category: 'Linked List', testCases: [{input: 'l1 = [1,2,4], l2 = [1,3,4]', expected: '[1,1,2,3,4,4]'}] },
  { id: 'easy-13', title: 'Invert Binary Tree', description: 'Given the root of a binary tree, invert the tree, and return its root.', difficulty: 'Easy', category: 'Trees', testCases: [{input: '[4,2,7,1,3,6,9]', expected: '[4,7,2,9,6,3,1]'}] },
  { id: 'easy-14', title: 'Valid Parentheses', description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.', difficulty: 'Easy', category: 'Stacks', testCases: [{input: '"()[]{}"', expected: 'true'}] },
  { id: 'easy-15', title: 'Majority Element', description: 'Given an array nums of size n, return the majority element.', difficulty: 'Easy', category: 'Arrays', testCases: [{input: '[2,2,1,1,1,2,2]', expected: '2'}] },
  { id: 'easy-16', title: 'Climbing Stairs', description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?', difficulty: 'Easy', category: 'Dynamic Programming', testCases: [{input: 'n = 3', expected: '3'}] },
  { id: 'easy-17', title: 'Symmetric Tree', description: 'Given the root of a binary tree, check whether it is a mirror of itself.', difficulty: 'Easy', category: 'Trees', testCases: [{input: '[1,2,2,3,4,4,3]', expected: 'true'}] },
  { id: 'easy-18', title: 'Roman to Integer', description: 'Convert a roman numeral to an integer.', difficulty: 'Easy', category: 'Math', testCases: [{input: '"MCMXCIV"', expected: '1994'}] },
  { id: 'easy-19', title: 'Length of Last Word', description: 'Given a string s consisting of some words separated by some number of spaces, return the length of the last word in the string.', difficulty: 'Easy', category: 'Strings', testCases: [{input: '"Hello World"', expected: '5'}] },
  { id: 'easy-20', title: 'Implement strStr()', description: 'Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.', difficulty: 'Easy', category: 'Strings', testCases: [{input: 'haystack = "hello", needle = "ll"', expected: '2'}] },

  // Medium
  {
    id: 'medium-1',
    title: '3Sum',
    description: 'Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.',
    difficulty: 'Medium',
    category: 'Arrays',
    testCases: [
      { input: 'nums = [-1,0,1,2,-1,-4]', expected: '[[-1,-1,2],[-1,0,1]]' },
    ],
  },
  {
    id: 'medium-2',
    title: 'Longest Substring Without Repeating Characters',
    description: 'Given a string `s`, find the length of the longest substring without repeating characters.',
    difficulty: 'Medium',
    category: 'Strings',
    testCases: [
      { input: 's = "abcabcbb"', expected: '3' },
      { input: 's = "bbbbb"', expected: '1' },
    ],
  },
  // Add 18 more medium questions...
  { id: 'medium-3', title: 'Add Two Numbers', description: 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.', difficulty: 'Medium', category: 'Linked List', testCases: [{input: 'l1 = [2,4,3], l2 = [5,6,4]', expected: '[7,0,8]'}] },
  { id: 'medium-4', title: 'Container With Most Water', description: 'Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.', difficulty: 'Medium', category: 'Arrays', testCases: [{input: '[1,8,6,2,5,4,8,3,7]', expected: '49'}] },
  { id: 'medium-5', title: 'Group Anagrams', description: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order.', difficulty: 'Medium', category: 'Strings', testCases: [{input: '["eat","tea","tan","ate","nat","bat"]', expected: '[["bat"],["nat","tan"],["ate","eat","tea"]]'}] },
  { id: 'medium-6', title: 'Rotate Image', description: 'You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).', difficulty: 'Medium', category: 'Arrays', testCases: [{input: '[[1,2,3],[4,5,6],[7,8,9]]', expected: '[[7,4,1],[8,5,2],[9,6,3]]'}] },
  { id: 'medium-7', title: 'Spiral Matrix', description: 'Given an m x n matrix, return all elements of the matrix in spiral order.', difficulty: 'Medium', category: 'Arrays', testCases: [{input: '[[1,2,3],[4,5,6],[7,8,9]]', expected: '[1,2,3,6,9,8,7,4,5]'}] },
  { id: 'medium-8', title: 'Jump Game', description: 'You are given an integer array nums. You are initially positioned at the array\'s first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.', difficulty: 'Medium', category: 'Dynamic Programming', testCases: [{input: '[2,3,1,1,4]', expected: 'true'}] },
  { id: 'medium-9', title: 'Merge Intervals', description: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.', difficulty: 'Medium', category: 'Arrays', testCases: [{input: '[[1,3],[2,6],[8,10],[15,18]]', expected: '[[1,6],[8,10],[15,18]]'}] },
  { id: 'medium-10', title: 'Unique Paths', description: 'A robot is located at the top-left corner of a m x n grid. The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid. How many possible unique paths are there?', difficulty: 'Medium', category: 'Dynamic Programming', testCases: [{input: 'm = 3, n = 7', expected: '28'}] },
  { id: 'medium-11', title: 'Word Search', description: 'Given an m x n grid of characters board and a string word, return true if word exists in the grid.', difficulty: 'Medium', category: 'Backtracking', testCases: [{input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', expected: 'true'}] },
  { id: 'medium-12', title: 'Validate Binary Search Tree', description: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).', difficulty: 'Medium', category: 'Trees', testCases: [{input: '[5,1,4,null,null,3,6]', expected: 'false'}] },
  { id: 'medium-13', title: 'Kth Smallest Element in a BST', description: 'Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.', difficulty: 'Medium', category: 'Trees', testCases: [{input: 'root = [3,1,4,null,2], k = 1', expected: '1'}] },
  { id: 'medium-14', title: 'Product of Array Except Self', description: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].', difficulty: 'Medium', category: 'Arrays', testCases: [{input: '[1,2,3,4]', expected: '[24,12,8,6]'}] },
  { id: 'medium-15', title: 'Coin Change', description: 'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount.', difficulty: 'Medium', category: 'Dynamic Programming', testCases: [{input: 'coins = [1,2,5], amount = 11', expected: '3'}] },
  { id: 'medium-16', title: 'Number of Islands', description: 'Given an m x n 2D binary grid grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands.', difficulty: 'Medium', category: 'Graphs', testCases: [{input: 'grid with 1 island', expected: '1'}] },
  { id: 'medium-17', title: 'Top K Frequent Elements', description: 'Given an integer array nums and an integer k, return the k most frequent elements.', difficulty: 'Medium', category: 'Heaps', testCases: [{input: 'nums = [1,1,1,2,2,3], k = 2', expected: '[1,2]'}] },
  { id: 'medium-18', title: 'Find First and Last Position of Element in Sorted Array', description: 'Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.', difficulty: 'Medium', category: 'Binary Search', testCases: [{input: 'nums = [5,7,7,8,8,10], target = 8', expected: '[3,4]'}] },
  { id: 'medium-19', title: 'Generate Parentheses', description: 'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.', difficulty: 'Medium', category: 'Backtracking', testCases: [{input: 'n = 3', expected: '["((()))","(()())","(())()","()(())","()()()"]'}] },
  { id: 'medium-20', title: 'Decode Ways', description: 'A message containing letters from A-Z can be encoded into numbers using the following mapping: \'A\' -> "1", \'B\' -> "2", ..., \'Z\' -> "26". To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above. Given a string s containing only digits, return the number of ways to decode it.', difficulty: 'Medium', category: 'Dynamic Programming', testCases: [{input: 's = "226"', expected: '3'}] },

  // Hard
  {
    id: 'hard-1',
    title: 'Median of Two Sorted Arrays',
    description: 'Given two sorted arrays `nums1` and `nums2` of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).',
    difficulty: 'Hard',
    category: 'Binary Search',
    testCases: [
      { input: 'nums1 = [1,3], nums2 = [2]', expected: '2.0' },
      { input: 'nums1 = [1,2], nums2 = [3,4]', expected: '2.5' },
    ],
  },
  {
    id: 'hard-2',
    title: 'Regular Expression Matching',
    description: 'Given an input string `s` and a pattern `p`, implement regular expression matching with support for `.` and `*`.',
    difficulty: 'Hard',
    category: 'Dynamic Programming',
    testCases: [
      { input: 's = "aa", p = "a"', expected: 'false' },
      { input: 's = "aa", p = "a*"', expected: 'true' },
    ],
  },
  // Add 18 more hard questions...
  { id: 'hard-3', title: 'Trapping Rain Water', description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.', difficulty: 'Hard', category: 'Arrays', testCases: [{input: '[0,1,0,2,1,0,1,3,2,1,2,1]', expected: '6'}] },
  { id: 'hard-4', title: 'Largest Rectangle in Histogram', description: 'Given an array of integers heights representing the histogram\'s bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.', difficulty: 'Hard', category: 'Stacks', testCases: [{input: '[2,1,5,6,2,3]', expected: '10'}] },
  { id: 'hard-5', title: 'Merge k Sorted Lists', description: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.', difficulty: 'Hard', category: 'Heaps', testCases: [{input: 'lists = [[1,4,5],[1,3,4],[2,6]]', expected: '[1,1,2,3,4,4,5,6]'}] },
  { id: 'hard-6', title: 'Word Break II', description: 'Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.', difficulty: 'Hard', category: 'Dynamic Programming', testCases: [{input: 's = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]', expected: '["cats and dog", "cat sand dog"]'}] },
  { id: 'hard-7', title: 'Wildcard Matching', description: 'Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for \' ? \' and \' * \' where \' ? \' matches any single character and \' * \' matches any sequence of characters (including the empty sequence).', difficulty: 'Hard', category: 'Dynamic Programming', testCases: [{input: 's = "adceb", p = "*a*b"', expected: 'true'}] },
  { id: 'hard-8', title: 'N-Queens', description: 'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return all distinct solutions to the n-queens puzzle.', difficulty: 'Hard', category: 'Backtracking', testCases: [{input: 'n = 4', expected: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]'}] },
  { id: 'hard-9', title: 'Sudoku Solver', description: 'Write a program to solve a Sudoku puzzle by filling the empty cells.', difficulty: 'Hard', category: 'Backtracking', testCases: [{input: 'A 9x9 sudoku board', expected: 'The solved board'}] },
  { id: 'hard-10', title: 'Serialize and Deserialize Binary Tree', description: 'Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.', difficulty: 'Hard', category: 'Trees', testCases: [{input: 'root = [1,2,3,null,null,4,5]', expected: 'The same tree after deserialization'}] },
  { id: 'hard-11', title: 'Binary Tree Maximum Path Sum', description: 'A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. A path must contain at least one node and does not need to pass through the root. The path sum of a path is the sum of the node\'s values in the path. Given the root of a binary tree, return the maximum path sum of any non-empty path.', difficulty: 'Hard', category: 'Trees', testCases: [{input: '[-10,9,20,null,null,15,7]', expected: '42'}] },
  { id: 'hard-12', title: 'Minimum Window Substring', description: 'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".', difficulty: 'Hard', category: 'Sliding Window', testCases: [{input: 's = "ADOBECODEBANC", t = "ABC"', expected: '"BANC"'}] },
  { id: 'hard-13', title: 'Word Ladder', description: 'A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that: every adjacent pair of words differs by a single letter, every si for 1 <= i <= k is in wordList and sk == endWord. Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.', difficulty: 'Hard', category: 'Graphs', testCases: [{input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', expected: '5'}] },
  { id: 'hard-14', title: 'Find Median from Data Stream', description: 'The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values. Implement the MedianFinder class.', difficulty: 'Hard', category: 'Heaps', testCases: [{input: 'Operations sequence', expected: 'Medians after each addNum'}] },
  { id: 'hard-15', title: 'Text Justification', description: 'Given an array of strings words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.', difficulty: 'Hard', category: 'Strings', testCases: [{input: 'words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16', expected: 'Formatted text'}] },
  { id: 'hard-16', title: 'Edit Distance', description: 'Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You have the following three operations permitted on a word: Insert a character, Delete a character, Replace a character.', difficulty: 'Hard', category: 'Dynamic Programming', testCases: [{input: 'word1 = "horse", word2 = "ros"', expected: '3'}] },
  { id: 'hard-17', title: 'Integer to English Words', description: 'Convert a non-negative integer num to its English words representation.', difficulty: 'Hard', category: 'Math', testCases: [{input: '12345', expected: '"Twelve Thousand Three Hundred Forty Five"'}] },
  { id: 'hard-18', title: 'Burst Balloons', description: 'You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons. If you burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. Return the maximum coins you can collect by bursting the balloons wisely.', difficulty: 'Hard', category: 'Dynamic Programming', testCases: [{input: '[3,1,5,8]', expected: '167'}] },
  { id: 'hard-19', title: 'Sliding Window Maximum', description: 'You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.', difficulty: 'Hard', category: 'Sliding Window', testCases: [{input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', expected: '[3,3,5,5,6,7]'}] },
  { id: 'hard-20', title: 'Longest Valid Parentheses', description: 'Given a string containing just the characters \'(\' and \')\', return the length of the longest valid (well-formed) parentheses substring.', difficulty: 'Hard', category: 'Stacks', testCases: [{input: '")()())"', expected: '4'}] },
];
