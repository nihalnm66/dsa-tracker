import { useState, useEffect } from "react";

const CO = {

  O: "Oracle",

  I: "IBM",

  A: "Accenture",

  D: "Dell",

  T: "Thomson Reuters",

  F: "Flexera",

  B: "Black Duck",

  R: "Relx",
  X: "RELX_EXTRA"

};

const CO_CLR = {

  O: { background: "#fee2e2", color: "#dc2626" },

  I: { background: "#dbeafe", color: "#1d4ed8" },

  A: { background: "#ede9fe", color: "#7c3aed" },

  D: { background: "#e0f2fe", color: "#0369a1" },

  T: { background: "#ffedd5", color: "#c2410c" },

  F: { background: "#d1fae5", color: "#065f46" },

  B: { background: "#e2e8f0", color: "#334155" },

  R: { background: "#ffedd5", color: "#ea580c" },
  X: { background: "#e0e7ff", color: "#4338ca" }

};

const PRI_CLR = {

  CRITICAL: { background: "#fef2f2", color: "#dc2626" },

  HIGH: { background: "#fff7ed", color: "#ea580c" },

  MEDIUM: { background: "#eff6ff", color: "#2563eb" },

  LOW: { background: "#f8fafc", color: "#64748b" },

};

const DIFF = {

  E: { background: "#dcfce7", color: "#15803d", label: "Easy" },

  M: { background: "#fef9c3", color: "#92400e", label: "Med" },

  H: { background: "#fee2e2", color: "#dc2626", label: "Hard" },

};

const CATS = [

  { id: "arrays", l: "Arrays", e: "🔢", p: "CRITICAL", n: "Tested by ALL companies — core of every OA round" },

  { id: "strings", l: "Strings", e: "🔤", p: "CRITICAL", n: "Always asked — master all manipulation & matching patterns" },

  { id: "hashmap", l: "HashMap & HashSet", e: "🗃️", p: "CRITICAL", n: "Turns O(n²) → O(n) — the single most used optimization trick" },

  { id: "twoptr", l: "Two Pointers", e: "👆", p: "HIGH", n: "Essential for sorted arrays, pair sums & in-place problems" },

  { id: "sliding", l: "Sliding Window", e: "🪟", p: "HIGH", n: "Substring/subarray OA questions — critical for 11+ LPA" },

  { id: "ll", l: "Linked Lists", e: "🔗", p: "CRITICAL", n: "Floyd's cycle, reversal, merge — extremely common in OAs" },

  { id: "stack", l: "Stack & Queue", e: "📚", p: "HIGH", n: "Monotonic stack is the key pattern behind many Mediums" },

  { id: "bs", l: "Binary Search", e: "🔍", p: "HIGH", n: "Apply on answer space too, not just sorted arrays" },

  { id: "trees", l: "Trees — BT & BST", e: "🌳", p: "CRITICAL", n: "BFS + DFS traversals — most asked category across companies" },

  { id: "graphs", l: "Graphs — BFS / DFS", e: "🕸️", p: "MEDIUM", n: "Grid = disguised graph — know BFS/DFS templates cold" },

  { id: "trie", l: "Trie (Prefix Tree)", e: "🌲", p: "MEDIUM", n: "Crucial for string matching and autocomplete systems" },

  { id: "uf", l: "Union-Find (Disjoint Set)", e: "🤝", p: "HIGH", n: "Essential for connected components and cycle detection" },

  { id: "dp", l: "Dynamic Programming", e: "💎", p: "HIGH", n: "Patterns: 1D knapsack, LIS, coin change, grid paths" },

  { id: "bt", l: "Recursion & Backtracking", e: "🔄", p: "MEDIUM", n: "Subsets / permutations — master the single backtrack template" },

  { id: "heap", l: "Heap / Priority Queue", e: "⬆️", p: "MEDIUM", n: "K-th element problems — Java PriorityQueue is your tool" },

  { id: "sort", l: "Sorting Algorithms", e: "🔀", p: "HIGH", n: "Code all 5 from scratch + explain time/space complexity" },

  { id: "bits", l: "Bit Manipulation", e: "💡", p: "LOW", n: "XOR tricks — useful for variety questions and bonus rounds" },

  { id: "math", l: "Math & Number Theory", e: "➕", p: "MEDIUM", n: "GCD, primes, Sieve of Eratosthenes — know the algorithms" },

  { id: "matrix", l: "Matrix — 2D Arrays", e: "📊", p: "MEDIUM", n: "In-place rotation, grid BFS, traversal patterns" },

];

const P = {

  arrays: [

    ["Two Sum", 1, "E", ["O", "I", "A", "D", "T", "F", "B", "R", "X"]],

    ["Best Time to Buy and Sell Stock", 121, "E", ["O", "I", "A", "D", "T", "F", "B", "R", "X"]],

    ["Contains Duplicate", 217, "E", ["O", "I", "A", "D", "T", "F", "B", "R", "X"]],

    ["Maximum Subarray", 53, "E", ["O", "I", "A", "D", "T", "F", "R", "X"]],

    ["Product of Array Except Self", 238, "M", ["O", "A", "D", "T", "B", "R", "X"]],

    ["Maximum Product Subarray", 152, "M", ["O", "D", "T"]],

    ["Find Minimum in Rotated Sorted Array", 153, "M", ["O", "D", "B"]],

    ["Search in Rotated Sorted Array", 33, "M", ["O", "I", "D", "B"]],

    ["3Sum", 15, "M", ["O", "A", "D", "T", "B", "R", "X"]],

    ["Container With Most Water", 11, "M", ["O", "A", "D", "B", "R", "X"]],

    ["Subarray Sum Equals K", 560, "M", ["O", "I", "A", "D", "T", "F"]],

    ["Majority Element", 169, "E", ["O", "I", "A", "D", "T", "F", "R", "X"]],

    ["Move Zeroes", 283, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Rotate Array", 189, "M", ["I", "A", "D"]],

    ["Find the Duplicate Number", 287, "M", ["O", "D"]],

    ["Missing Number", 268, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Single Number", 136, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Sort Colors", 75, "M", ["O", "A", "D"]],

    ["Merge Intervals", 56, "M", ["O", "D", "T", "R", "X"]],

    ["Insert Interval", 57, "M", ["O"]],

    ["Meeting Rooms II", 253, "M", ["T", "A"]],

    ["Pascals Triangle", 118, "E", ["I", "A"]],

    ["Spiral Matrix", 54, "M", ["O", "D", "R", "X"]],

    ["Set Matrix Zeroes", 73, "M", ["O", "D", "R", "X"]],

    ["Next Permutation", 31, "M", ["O", "D", "R", "X"]],

    ["Zero Array Transformation II", 3356, "M", ["R", "X"]],

    ["Largest Number", 179, "M", ["R", "X"]]

  
    ["Check if One String Swap Can Make Strings Equal", 1790, "M", ["X"]],
    ["Count Unhappy Friends", 1583, "M", ["X"]],
    ["Maximum Passengers on Blocked Grid (Custom HackerRank Matrix DP)", 0, "M", ["X"]],
    ["Disk Space Analysis / Sliding Window Minimum (Custom HackerRank)", 0, "M", ["X"]],
    ["Maximize Earnings / Weighted Interval Scheduling (Custom HackerRank)", 0, "H", ["X"]],
],

  strings: [

    ["Valid Anagram", 242, "E", ["O", "I", "A", "D", "T", "F", "B", "R", "X"]],

    ["Valid Palindrome", 125, "E", ["O", "I", "A", "D", "T", "F", "B", "R", "X"]],

    ["Longest Common Prefix", 14, "E", ["O", "I", "A", "D", "T", "F", "X"]],

    ["Longest Substring Without Repeating Characters", 3, "M", ["O", "I", "A", "D", "T", "F", "B", "R", "X"]],

    ["Longest Palindromic Substring", 5, "M", ["O", "D", "T", "B", "R", "X"]],

    ["String to Integer Atoi", 8, "M", ["I", "A"]],

    ["Reverse Words in a String", 151, "M", ["O", "I", "A", "D", "T", "F", "R", "X"]],

    ["First Unique Character in a String", 387, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Group Anagrams", 49, "M", ["O", "D", "T", "B", "R", "X"]],

    ["Find All Anagrams in a String", 438, "M", ["O", "D"]],

    ["Permutation in String", 567, "M", ["O", "D", "T"]],

    ["Minimum Window Substring", 76, "H", ["O", "D", "B", "R", "X"]],

    ["Decode String", 394, "M", ["O", "D"]],

    ["Isomorphic Strings", 205, "E", ["I", "A"]],

    ["Generate Parentheses", 22, "M", ["O", "D"]],

    ["Longest Repeating Character Replacement", 424, "M", ["D", "T", "B"]],

    ["Valid Parentheses", 20, "E", ["O", "I", "A", "D", "T", "F", "R", "X"]],

    ["Roman to Integer", 13, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Integer to Roman", 12, "M", ["O", "D"]],

    ["Count and Say", 38, "M", ["I", "F"]],

    ["Find Index of First Occurrence", 28, "E", ["R", "X"]],



    ["String Compression", 443, "M", ["R", "X"]],


    ["Group Shifted Strings", 249, "M", ["R", "X"]],

    ["Shortest Word Distance II", 244, "M", ["R", "X"]],

    ["Valid Word Abbreviation", 408, "E", ["R", "X"]],

    ["Minimum Remove to Make Valid Parentheses", 1249, "M", ["R"]]

  
    ["Minimum Remove to Make Valid Parentheses", 1249, "M", ["X"]],
    ["Repeated String Match", 686, "M", ["X"]],
    ["Maximum Number of Occurrences of a Substring", 1297, "M", ["X"]],
    ["Guess the Word / String Processing (Custom HackerRank)", 0, "H", ["X"]],
],

  hashmap: [

    ["Two Sum II Input Array Is Sorted", 167, "E", ["O", "I", "A", "D", "T", "F", "R", "X"]],

    ["Top K Frequent Elements", 347, "M", ["O", "D", "T", "B", "R", "X"]],

    ["Longest Consecutive Sequence", 128, "M", ["O", "A", "D", "B", "R", "X"]],

    ["Valid Sudoku", 36, "M", ["O"]],

    ["Word Pattern", 290, "E", ["I", "A"]],

    ["Happy Number", 202, "E", ["I", "F"]],

    ["4Sum II", 454, "M", ["O"]],

    ["Contains Duplicate II", 219, "E", ["I"]],

    ["Intersection of Two Arrays II", 350, "E", ["I", "F"]],

    ["Find the Difference", 389, "E", ["I"]],

    ["Insert Delete GetRandom O(1)", 380, "M", ["B"]],

  
    ["Maximize Amount After Two Days of Conversions (Custom Variant)", 0, "M", ["X"]],
    ["Minimum Occurrence Character Search (Custom HackerRank)", 0, "M", ["X"]],
],

  twoptr: [

    ["Remove Duplicates from Sorted Array", 26, "E", ["O", "I", "A", "D", "T", "F", "R", "X"]],

    ["Remove Element", 27, "E", ["O", "I", "A", "D", "T", "F", "R", "X"]],

    ["Merge Sorted Array", 88, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Squares of a Sorted Array", 977, "E", ["I", "A"]],

    ["Backspace String Compare", 844, "E", ["I", "A"]],

    ["Minimum Size Subarray Sum", 209, "M", ["O", "D", "X"]],

    ["3Sum Closest", 16, "M", ["O", "D"]],

    ["4Sum", 18, "M", ["O", "D"]],

    ["Trapping Rain Water", 42, "H", ["O", "A", "D", "B", "R", "X"]],

    ["Partition Array Positive Negative Separation", 0, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Next Permutation", 31, "M", ["R"]],

  
    ["Minimum Street Lights Coverage (Custom HackerRank Interval Greedy)", 0, "M", ["X"]],
],

  sliding: [

    ["Maximum Average Subarray I", 643, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Longest Substring Without Repeating Characters", 3, "M", ["O", "I", "A", "D", "T", "F"]],

    ["Longest Substring with At Most K Distinct Characters", 340, "M", ["O", "D"]],

    ["Fruit Into Baskets", 904, "M", ["O"]],

    ["Sliding Window Maximum", 239, "H", ["O", "D"]],

    ["Max Consecutive Ones III", 1004, "M", ["O", "D"]],

    ["Minimum Operations to Reduce X to Zero", 1658, "M", ["O", "D", "T"]],

    ["Permutation in String", 567, "M", ["O", "D", "T"]],

    ["Longest Repeating Character Replacement", 424, "M", ["D", "T"]],

    ["Count Number of Nice Subarrays", 1248, "M", ["O", "D"]],

    ["Longest Continuous Subarray With Absolute Diff Limit", 1438, "M", ["R", "X"]],

    ["Max Sum of Distinct Subarrays With Length K", 2461, "M", ["R", "X"]],

    ["Continuous Subarrays", 2762, "M", ["R", "X"]],

    ["Longest Subarray of 1's After Deleting One Element", 1493, "M", ["R", "X"]],

  
    ["Moving Average from Data Stream", 346, "E", ["X"]],
],

  ll: [

    ["Reverse Linked List", 206, "E", ["O", "I", "A", "D", "T", "F", "B", "R", "X"]],

    ["Merge Two Sorted Lists", 21, "E", ["O", "I", "A", "D", "T", "F", "B", "R", "X"]],

    ["Linked List Cycle", 141, "E", ["O", "I", "A", "D", "T", "F", "B", "R", "X"]],

    ["Linked List Cycle II", 142, "M", ["O", "D"]],

    ["Middle of the Linked List", 876, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Remove Nth Node From End of List", 19, "M", ["O", "I", "A", "D", "T", "F", "B", "X"]],

    ["Palindrome Linked List", 234, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Intersection of Two Linked Lists", 160, "E", ["O", "I"]],

    ["Add Two Numbers", 2, "M", ["O", "D", "T", "B", "X"]],

    ["Copy List with Random Pointer", 138, "M", ["O", "D", "B"]],

    ["Merge k Sorted Lists", 23, "H", ["O", "D", "X"]],

    ["Reorder List", 143, "M", ["O", "D", "B", "X"]],

    ["Remove Duplicates from Sorted List", 83, "E", ["I", "A"]],

    ["Rotate List", 61, "M", ["O", "D"]],

    ["Sort List", 148, "M", ["O", "D", "T"]],

    ["LRU Cache", 146, "M", ["B", "R", "X"]],

    ["LFU Cache", 460, "H", ["B"]],

  ],

  stack: [

    ["Valid Parentheses", 20, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Min Stack", 155, "M", ["O", "I", "A", "D", "T", "F", "X"]],

    ["Implement Queue using Stacks", 232, "E", ["I", "A", "X"]],

    ["Implement Stack using Queues", 225, "E", ["I"]],

    ["Daily Temperatures", 739, "M", ["O", "D", "T", "X"]],

    ["Next Greater Element I & II", 0, "E", ["O", "I", "A", "D", "T", "F", "X"]],

    ["Next Greater Element II", 503, "M", ["O", "D"]],

    ["Largest Rectangle in Histogram", 84, "H", ["O"]],

    ["Evaluate Reverse Polish Notation", 150, "M", ["O", "I"]],

    ["Remove All Adjacent Duplicates In String", 1047, "E", ["I", "A", "R", "X"]],

    ["Basic Calculator II", 227, "M", ["O", "D"]],

    ["Asteroid Collision", 735, "M", ["O", "D"]],

    ["Decode String", 394, "M", ["O", "D"]],

  ],

  bs: [

    ["Binary Search", 704, "E", ["O", "I", "A", "D", "T", "F", "B"]],

    ["Search in Rotated Sorted Array", 33, "M", ["O", "I", "D", "B"]],

    ["Find Minimum in Rotated Sorted Array", 153, "M", ["O", "D", "B"]],

    ["Find Peak Element", 162, "M", ["O", "D"]],

    ["First Bad Version", 278, "E", ["I", "A"]],

    ["Search a 2D Matrix", 74, "M", ["O", "D", "B"]],

    ["Kth Smallest Element in a Sorted Matrix", 378, "M", ["O"]],

    ["Find K Closest Elements", 658, "M", ["O", "D"]],

    ["Capacity To Ship Packages Within D Days", 1011, "M", ["O", "D"]],

    ["Koko Eating Bananas", 875, "M", ["O", "B"]],

    ["Sqrtx", 69, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Count Negative Numbers in a Sorted Matrix", 1351, "E", ["I", "F"]],

  ],

  trees: [

    ["Maximum Depth of Binary Tree", 104, "E", ["O", "I", "A", "D", "T", "F", "B", "R", "X"]],

    ["Minimum Depth of Binary Tree", 111, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Invert Binary Tree", 226, "E", ["O", "I", "A", "D", "T", "F", "B"]],

    ["Same Tree", 100, "E", ["O", "I", "A", "D", "T", "F", "B"]],

    ["Symmetric Tree", 101, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Path Sum", 112, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Balanced Binary Tree", 110, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Diameter of Binary Tree", 543, "E", ["O", "I", "A", "D", "T", "F", "R", "X"]],

    ["Sum of Left Leaves", 404, "E", ["I", "A"]],

    ["Binary Tree Inorder Traversal", 94, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Binary Tree Preorder Traversal", 144, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Binary Tree Postorder Traversal", 145, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Binary Tree Level Order Traversal", 102, "M", ["O", "I", "A", "D", "T", "F", "B", "R", "X"]],

    ["Binary Tree Zigzag Level Order Traversal", 103, "M", ["O", "D"]],

    ["Binary Tree Right Side View", 199, "M", ["O", "A", "D", "B", "R", "X"]],

    ["Lowest Common Ancestor of a Binary Search Tree", 235, "M", ["O", "I", "A", "D", "T", "F", "B"]],

    ["Lowest Common Ancestor of a Binary Tree", 236, "M", ["O", "D", "R", "X"]],

    ["Validate Binary Search Tree", 98, "M", ["O", "I", "A", "D", "T", "F", "B"]],

    ["Kth Smallest Element in a BST", 230, "M", ["O", "D", "T", "B"]],

    ["Flatten Binary Tree to Linked List", 114, "M", ["O", "D"]],

    ["Path Sum II", 113, "M", ["O", "D"]],

    ["Maximum Width of Binary Tree", 662, "M", ["O", "D"]],

    ["Construct Binary Tree from Preorder and Inorder Traversal", 105, "M", ["O", "D", "B"]],

    ["Delete Node in a BST", 450, "M", ["O", "D"]],

    ["Binary Tree Maximum Path Sum", 124, "H", ["O", "B"]],





    ["Subtree of Another Tree", 572, "E", ["B"]],

    ["Convert Sorted List to Binary Search Tree", 109, "M", ["R", "X"]],

    ["Sum Root to Leaf Numbers", 129, "M", ["R", "X"]],

    ["Find Leaves of Binary Tree", 366, "M", ["R", "X"]],

    ["Convert Binary Search Tree to Sorted Doubly Linked List", 426, "M", ["R", "X"]],

  ],

  graphs: [

    ["Number of Islands", 200, "M", ["O", "A", "D", "T", "B", "R", "X"]],

    ["Flood Fill", 733, "E", ["I", "A"]],

    ["Max Area of Island", 695, "M", ["O", "D", "T", "B"]],

    ["Rotting Oranges", 994, "M", ["O", "A", "D", "T", "B", "R", "X"]],

    ["Find if Path Exists in Graph", 1971, "E", ["I", "F"]],

    ["Clone Graph", 133, "M", ["O", "D", "B", "X"]],

    ["Course Schedule", 207, "M", ["O", "D", "B", "R", "X"]],

    ["Course Schedule II", 210, "M", ["O", "B"]],

    ["Pacific Atlantic Water Flow", 417, "M", ["O", "D"]],

    ["Surrounded Regions", 130, "M", ["O", "D"]],

    ["Number of Connected Components in an Undirected Graph", 323, "M", ["O", "D"]],

    ["Keys and Rooms", 841, "M", ["I", "D"]],


    ["Number of Distinct Islands", 694, "M", ["R", "X"]],

    ["Minimum Time to Visit a Cell In a Grid", 2577, "H", ["R", "X"]],

  
    ["Number of Islands II", 305, "H", ["X"]],
],

  trie: [

    ["Implement Trie", 208, "M", ["B"]],

    ["Design Add and Search Words", 211, "M", ["B"]],


    ["Word Search II", 212, "H", ["B"]],

    ["Search Suggestions System", 1268, "M", ["R", "X"]],

  ],

  uf: [


    ["Redundant Connection", 684, "M", ["B"]],


    ["Word Ladder", 127, "H", ["B"]],

    ["Word Ladder II", 126, "H", ["R"]],

  ],

  dp: [

    ["Climbing Stairs", 70, "E", ["O", "I", "A", "D", "T", "F", "B", "R", "X"]],

    ["Min Cost Climbing Stairs", 746, "E", ["I", "A"]],

    ["Fibonacci Number", 509, "E", ["I", "A"]],

    ["House Robber", 198, "M", ["O", "I", "A", "D", "T", "F", "B", "R", "X"]],

    ["House Robber II", 213, "M", ["O", "D"]],

    ["Jump Game", 55, "M", ["O", "D", "T"]],

    ["Jump Game II", 45, "M", ["O", "D"]],

    ["Coin Change", 322, "M", ["O", "A", "D", "T", "B", "R", "X"]],

    ["Coin Change II", 518, "M", ["O", "D"]],

    ["Unique Paths", 62, "M", ["O", "A", "D"]],

    ["Unique Paths II", 63, "M", ["O"]],

    ["Minimum Path Sum", 64, "M", ["O", "D"]],

    ["Longest Increasing Subsequence", 300, "M", ["O", "D", "T", "B", "R", "X"]],

    ["Word Break", 139, "M", ["O", "D", "T", "R", "X"]],

    ["Decode Ways", 91, "M", ["O", "T"]],

    ["Partition Equal Subset Sum", 416, "M", ["O", "D"]],

    ["Target Sum", 494, "M", ["O", "D"]],

    ["Perfect Squares", 279, "M", ["O", "D"]],

    ["Longest Common Subsequence", 1143, "M", ["B", "R", "X"]],



    ["Edit Distance", 72, "H", ["B"]],

    ["Regular Expression Matching", 10, "H", ["B"]],

  
    ["Expression Add Operators", 282, "H", ["X"]],
],

  bt: [

    ["Subsets", 78, "M", ["O", "D", "B", "R", "X"]],

    ["Subsets II", 90, "M", ["O", "B"]],

    ["Permutations", 46, "M", ["O", "D", "T", "B", "R", "X"]],

    ["Permutations II", 47, "M", ["O"]],

    ["Combinations", 77, "M", ["O", "D"]],

    ["Combination Sum", 39, "M", ["O", "D", "T", "B", "R", "X"]],

    ["Combination Sum II", 40, "M", ["O"]],

    ["Letter Combinations of a Phone Number", 17, "M", ["O", "A", "D"]],

    ["Word Search", 79, "M", ["O", "D", "B", "R", "X"]],

    ["Palindrome Partitioning", 131, "M", ["O"]],

  ],

  heap: [

    ["Kth Largest Element in an Array", 215, "M", ["O", "D", "T", "B"]],

    ["K Closest Points to Origin", 973, "M", ["O", "D", "B", "R", "X"]],

    ["Task Scheduler", 621, "M", ["O", "T"]],

    ["Reorganize String", 767, "M", ["O", "D"]],

    ["Find Median from Data Stream", 295, "H", ["O"]],

    ["Kth Largest Element in a Stream", 703, "E", ["I", "F", "B"]],

    ["Last Stone Weight", 1046, "E", ["I", "F", "B"]],

    ["Top K Frequent Words", 692, "M", ["O", "D"]],

    ["Minimum Difference in Sums After Removal of Elements", 2163, "H", ["R", "X"]],

  ],

  sort: [

    ["Bubble Sort — Write from Scratch", 0, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Selection Sort — Write from Scratch", 0, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Insertion Sort — Write from Scratch", 0, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Merge Sort — Implement + Explain Complexity", 0, "M", ["O", "I", "A", "D", "T", "F"]],

    ["Quick Sort — Implement + Explain Worst Case", 0, "M", ["O", "I", "A", "D", "T", "F"]],

    ["Counting Sort — When and How to Use", 0, "M", ["O", "D"]],

    ["Largest Number", 179, "M", ["O", "D"]],

    ["Sort Array by Parity", 905, "E", ["I", "A"]],

  ],

  bits: [

    ["Single Number", 136, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Single Number II", 137, "M", ["O"]],

    ["Number of 1 Bits", 191, "E", ["I", "A"]],

    ["Counting Bits", 338, "E", ["I", "A"]],

    ["Reverse Bits", 190, "E", ["I"]],

    ["Power of Two", 231, "E", ["I", "A"]],

    ["Sum of Two Integers", 371, "M", ["O", "D"]],

    ["Missing Number", 268, "E", ["O", "I", "A", "D", "T", "F"]],

  ],

  math: [

    ["Palindrome Number", 9, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Reverse Integer", 7, "M", ["O", "I", "A", "D", "T", "F"]],

    ["Powx n", 50, "M", ["O", "D"]],

    ["Factorial Trailing Zeroes", 172, "M", ["O", "I"]],

    ["Count Primes", 204, "M", ["I", "A"]],

    ["GCD and LCM Euclidean Algorithm", 0, "E", ["O", "I", "A", "D", "T", "F"]],

    ["Excel Sheet Column Number", 171, "E", ["I", "A"]],


    ["Best Time to Buy and Sell Stock II", 122, "M", ["R", "X"]],

    ["Gas Station", 134, "M", ["R", "X"]],

    ["Split Array Largest Sum", 410, "H", ["R", "X"]],

    ["Random Pick with Weight", 528, "M", ["R", "X"]],

    ["Maximum Swap", 670, "M", ["R", "X"]],

    ["The kth Factor of n", 1492, "M", ["R", "X"]],

  
    ["Minimum Operations to Make Character Frequencies Equal (Custom Hard DP/Greedy)", 0, "H", ["X"]],
    ["FIFO Tax Calculation Simulation (Custom HackerRank)", 0, "M", ["X"]],
],

  matrix: [

    ["Rotate Image", 48, "M", ["O", "D", "R", "X"]],

    ["Spiral Matrix", 54, "M", ["O", "D", "R"]],

    ["Set Matrix Zeroes", 73, "M", ["O", "D", "R"]],

    ["Search a 2D Matrix", 74, "M", ["O", "D"]],

    ["Game of Life", 289, "M", ["O"]],

    ["Diagonal Traverse", 498, "M", ["I"]],

    ["Lucky Numbers in a Matrix", 1380, "E", ["I", "F"]],

    ["Toeplitz Matrix", 766, "E", ["I", "F"]],

  ],

};

const mkSlug = (name) =>

  name

    .toLowerCase()

    .replace(/[^a-z0-9]+/g, "-")

    .replace(/^-|-$/g, "");

export default function DSATracker() {

  const [checked, setChecked] = useState({});

  const [filter, setFilter] = useState("ALL");

  const [search, setSearch] = useState("");

  const [exp, setExp] = useState({ arrays: true });

  useEffect(() => {

    try {

      const r = localStorage.getItem("dsa_master_v1");

      if (r) setChecked(JSON.parse(r));

    } catch {}

  }, []);

  const toggle = (key) => {

    setChecked((prev) => {

      const next = { ...prev };

      if (next[key]) delete next[key];

      else next[key] = true;

      try {

        localStorage.setItem("dsa_master_v1", JSON.stringify(next));

      } catch {}

      return next;

    });

  };

  let filteredTotal = 0;

  let filteredDone = 0;

  CATS.forEach((cat) => {

    const probs = P[cat.id] || [];

    probs.forEach((prob, i) => {

      const cos = prob[3];

      if (filter === "ALL" || cos.includes(filter)) {

        filteredTotal++;

        if (checked[`${cat.id}_${i}`]) {

          filteredDone++;

        }

      }

    });

  });

  const pct = filteredTotal ? Math.round((filteredDone / filteredTotal) * 100) : 0;

  return (

    <div

      style={{

        fontFamily: "system-ui,-apple-system,sans-serif",

        background: "#f1f5f9",

        minHeight: "100vh",

      }}

    >

      <div

        style={{

          position: "sticky",

          top: 0,

          zIndex: 50,

          background: "white",

          borderBottom: "1px solid #e2e8f0",

          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",

        }}

      >

        <div style={{ maxWidth: 820, margin: "0 auto", padding: "14px 16px" }}>

          <div

            style={{

              display: "flex",

              justifyContent: "space-between",

              alignItems: "flex-start",

              marginBottom: 8,

            }}

          >

            <div>

              <div style={{ fontWeight: 800, fontSize: 17, color: "#0f172a" }}>

                🎯 DSA Master Checklist

              </div>

              <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>

                Oracle · IBM · Accenture · Dell · Thomson Reuters · Flexera · Black Duck · Relx · RELX_EXTRA

              </div>

            </div>

            <div style={{ textAlign: "right" }}>

              <div>

                <span

                  style={{ fontWeight: 800, fontSize: 24, color: "#3b82f6" }}

                >

                  {filteredDone}

                </span>

                <span

                  style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}

                >

                  /{filteredTotal}

                </span>

              </div>

              <div

                style={{

                  fontSize: 11,

                  color: pct === 100 ? "#10b981" : "#64748b",

                  fontWeight: 600,

                }}

              >

                {pct}% done

              </div>

            </div>

          </div>

          <div

            style={{

              height: 7,

              background: "#e2e8f0",

              borderRadius: 99,

              marginBottom: 10,

            }}

          >

            <div

              style={{

                height: 7,

                background:

                  pct === 100

                    ? "#10b981"

                    : "linear-gradient(90deg,#3b82f6,#6366f1)",

                borderRadius: 99,

                width: `${pct}%`,

                transition: "width 0.4s ease",

              }}

            />

          </div>

          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>

            {["ALL", "O", "I", "A", "D", "T", "F", "B", "R", "X"].map((co) => (

              <button

                key={co}

                onClick={() => setFilter(co)}

                style={{

                  padding: "4px 11px",

                  borderRadius: 99,

                  fontSize: 11,

                  fontWeight: 600,

                  border: "1.5px solid",

                  cursor: "pointer",

                  ...(filter === co

                    ? {

                        background: "#3b82f6",

                        color: "white",

                        borderColor: "#3b82f6",

                      }

                    : {

                        background: "white",

                        color: "#475569",

                        borderColor: "#cbd5e1",

                      }),

                }}

              >

                {co === "ALL" ? "All" : CO[co]}

              </button>

            ))}

          </div>

        </div>

      </div>

      <div

        style={{ maxWidth: 820, margin: "0 auto", padding: "12px 16px 48px" }}

      >

        <input

          placeholder="🔎  Search any problem by name..."

          value={search}

          onChange={(e) => setSearch(e.target.value)}

          style={{

            width: "100%",

            padding: "10px 14px",

            borderRadius: 10,

            border: "1.5px solid #e2e8f0",

            fontSize: 13,

            marginBottom: 10,

            boxSizing: "border-box",

            outline: "none",

            background: "white",

          }}

        />

        {CATS.map((cat) => {

          const probs = P[cat.id] || [];

          const indexed = probs.map((prob, i) => ({

            prob,

            i,

            key: `${cat.id}_${i}`,

          }));

          const companyProbs = indexed.filter(({ prob: [ , , , cos] }) => {

            return filter === "ALL" || cos.includes(filter);

          });

          const visible = companyProbs.filter(({ prob: [name] }) => {

            return !search || name.toLowerCase().includes(search.toLowerCase());

          });

          if (!visible.length && search) return null;

          const catTotal = companyProbs.length;

          const catDone = companyProbs.filter(({ key }) => checked[key]).length;

          const catPct = catTotal ? Math.round((catDone / catTotal) * 100) : 0;

          const isOpen = !!exp[cat.id];

          return (

            <div

              key={cat.id}

              style={{

                marginBottom: 8,

                background: "white",

                borderRadius: 12,

                border: "1px solid #e2e8f0",

                overflow: "hidden",

                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",

                opacity: catTotal === 0 ? 0.6 : 1,

              }}

            >

              <button

                onClick={() => setExp((e) => ({ ...e, [cat.id]: !e[cat.id] }))}

                disabled={catTotal === 0}

                style={{

                  width: "100%",

                  padding: "12px 16px",

                  display: "flex",

                  alignItems: "center",

                  gap: 12,

                  background: "none",

                  border: "none",

                  cursor: catTotal === 0 ? "default" : "pointer",

                  textAlign: "left",

                }}

              >

                <span style={{ fontSize: 22, flexShrink: 0 }}>{cat.e}</span>

                <div style={{ flex: 1, minWidth: 0 }}>

                  <div

                    style={{

                      display: "flex",

                      alignItems: "center",

                      gap: 7,

                      flexWrap: "wrap",

                      marginBottom: 2,

                    }}

                  >

                    <span

                      style={{

                        fontWeight: 700,

                        fontSize: 14,

                        color: "#0f172a",

                      }}

                    >

                      {cat.l}

                    </span>

                    <span

                      style={{

                        fontSize: 10,

                        fontWeight: 700,

                        padding: "2px 7px",

                        borderRadius: 99,

                        background: PRI_CLR[cat.p].background,

                        color: PRI_CLR[cat.p].color,

                      }}

                    >

                      {cat.p}

                    </span>

                  </div>

                  <div style={{ fontSize: 11, color: "#94a3b8" }}>

                    {catTotal === 0 ? "No verified problems for this company." : cat.n}

                  </div>

                </div>

                <div

                  style={{

                    display: "flex",

                    alignItems: "center",

                    gap: 10,

                    flexShrink: 0,

                  }}

                >

                  <div style={{ textAlign: "right" }}>

                    <div

                      style={{

                        fontSize: 12,

                        fontWeight: 600,

                        color: catPct === 100 && catTotal > 0 ? "#10b981" : "#475569",

                      }}

                    >

                      {catDone}/{catTotal}

                    </div>

                    <div

                      style={{

                        width: 60,

                        height: 4,

                        background: "#e2e8f0",

                        borderRadius: 99,

                        marginTop: 3,

                      }}

                    >

                      <div

                        style={{

                          width: `${catPct}%`,

                          height: 4,

                          background: catPct === 100 ? "#10b981" : "#3b82f6",

                          borderRadius: 99,

                          transition: "width 0.3s",

                        }}

                      />

                    </div>

                  </div>

                  <span style={{ color: "#94a3b8", fontSize: 10, width: 12 }}>

                    {catTotal === 0 ? "−" : isOpen ? "▲" : "▼"}

                  </span>

                </div>

              </button>

              {isOpen && catTotal > 0 && (

                <div style={{ borderTop: "1px solid #f1f5f9" }}>

                  {visible.map(({ prob: [name, lc, diff, cos], key }) => {

                    const isDone = !!checked[key];

                    return (

                      <div

                        key={key}

                        onClick={() => toggle(key)}

                        style={{

                          display: "flex",

                          alignItems: "center",

                          gap: 10,

                          padding: "9px 16px",

                          cursor: "pointer",

                          borderBottom: "1px solid #f8fafc",

                          background: isDone ? "#f0fdf4" : "white",

                          transition: "background 0.1s",

                        }}

                      >

                        <div

                          style={{

                            width: 20,

                            height: 20,

                            borderRadius: 5,

                            border: `2px solid ${

                              isDone ? "#10b981" : "#d1d5db"

                            }`,

                            background: isDone ? "#10b981" : "white",

                            display: "flex",

                            alignItems: "center",

                            justifyContent: "center",

                            flexShrink: 0,

                            transition: "all 0.15s",

                          }}

                        >

                          {isDone && (

                            <span

                              style={{

                                color: "white",

                                fontSize: 11,

                                fontWeight: 800,

                                lineHeight: 1,

                              }}

                            >

                              ✓

                            </span>

                          )}

                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>

                          <div

                            style={{

                              fontSize: 13,

                              fontWeight: 500,

                              color: isDone ? "#9ca3af" : "#1e293b",

                              textDecoration: isDone ? "line-through" : "none",

                            }}

                          >

                            {lc > 0 && (

                              <span

                                style={{

                                  color: "#94a3b8",

                                  fontSize: 11,

                                  marginRight: 4,

                                }}

                              >

                                #{lc}

                              </span>

                            )}

                            {name}

                          </div>

                          <div

                            style={{

                              display: "flex",

                              gap: 3,

                              flexWrap: "wrap",

                              marginTop: 4,

                            }}

                          >

                            {cos.map((co) => (

                              <span

                                key={co}

                                style={{

                                  fontSize: 9,

                                  padding: "1px 5px",

                                  borderRadius: 4,

                                  fontWeight: 700,

                                  background: CO_CLR[co]?.background || "#e2e8f0",

                                  color: CO_CLR[co]?.color || "#334155",

                                }}

                              >

                                {co === "T" ? "T.Reuters" : CO[co]}

                              </span>

                            ))}

                          </div>

                        </div>

                        <div

                          style={{

                            display: "flex",

                            alignItems: "center",

                            gap: 6,

                            flexShrink: 0,

                          }}

                        >

                          <span

                            style={{

                              fontSize: 11,

                              padding: "2px 8px",

                              borderRadius: 99,

                              fontWeight: 600,

                              background: DIFF[diff].background,

                              color: DIFF[diff].color,

                            }}

                          >

                            {DIFF[diff].label}

                          </span>

                          {lc > 0 && (

                            <a

                              href={`https://leetcode.com/problems/${mkSlug(

                                name

                              )}/`}

                              target="_blank"

                              rel="noopener noreferrer"

                              onClick={(e) => e.stopPropagation()}

                              style={{

                                fontSize: 10,

                                color: "#3b82f6",

                                padding: "2px 6px",

                                borderRadius: 4,

                                border: "1px solid #bfdbfe",

                                textDecoration: "none",

                                fontWeight: 700,

                              }}

                            >

                              LC ↗

                            </a>

                          )}

                        </div>

                      </div>

                    );

                  })}

                </div>

              )}

            </div>

          );

        })}

        <div

          style={{

            background: "white",

            borderRadius: 12,

            border: "1px solid #e2e8f0",

            padding: 16,

            marginTop: 4,

          }}

        >

          <div

            style={{

              fontWeight: 700,

              fontSize: 13,

              color: "#1e293b",

              marginBottom: 12,

            }}

          >

            📊 Progress by Difficulty

          </div>

          <div

            style={{

              display: "grid",

              gridTemplateColumns: "1fr 1fr 1fr",

              gap: 10,

              marginBottom: 12,

            }}

          >

            {[

              ["E", "#dcfce7", "#15803d", "Easy"],

              ["M", "#fef9c3", "#92400e", "Medium"],

              ["H", "#fee2e2", "#dc2626", "Hard"],

            ].map(([d, bg, c, label]) => {

              const all = CATS.flatMap((cat) =>

                (P[cat.id] || []).map((prob, i) => ({

                  d: prob[2],

                  cos: prob[3],

                  key: `${cat.id}_${i}`,

                }))

              ).filter((x) => x.d === d && (filter === "ALL" || x.cos.includes(filter)));

              const dn = all.filter((x) => checked[x.key]).length;

              return (

                <div

                  key={d}

                  style={{

                    textAlign: "center",

                    padding: "12px 8px",

                    background: bg,

                    borderRadius: 10,

                  }}

                >

                  <div style={{ fontWeight: 800, fontSize: 22, color: c }}>

                    {dn}/{all.length}

                  </div>

                  <div

                    style={{

                      fontSize: 11,

                      color: c,

                      fontWeight: 600,

                      marginTop: 2,

                    }}

                  >

                    {label}

                  </div>

                </div>

              );

            })}

          </div>

          <div

            style={{

              fontSize: 11,

              color: "#94a3b8",

              textAlign: "center",

              marginTop: 4,

            }}

          >

            ✅ Your progress saves automatically across sessions

          </div>

        </div>

      </div>

    </div>

  );

}
