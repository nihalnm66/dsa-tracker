import { useState, useEffect } from "react";

const CO = {
  O: "Oracle",
  I: "IBM",
  A: "Accenture",
  D: "Dell",
  T: "Thomson Reuters",
  F: "Flexera",
  S: "Smarsh",
  C: "Capillary",
  L: "⭑",
  B: "Black Duck",
  R: "Relx"
};

const CO_CLR = {
  O: { background: "#fee2e2", color: "#dc2626" },
  I: { background: "#dbeafe", color: "#1d4ed8" },
  A: { background: "#ede9fe", color: "#7c3aed" },
  D: { background: "#e0f2fe", color: "#0369a1" },
  T: { background: "#ffedd5", color: "#c2410c" },
  F: { background: "#d1fae5", color: "#065f46" },
  S: { background: "#ccfbf1", color: "#0f766e" },
  C: { background: "#fbcfe8", color: "#be185d" },
  L: { background: "#fef08a", color: "#854d0e" },
  B: { background: "#e2e8f0", color: "#334155" },
  R: { background: "#ffedd5", color: "#ea580c" }
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
    ["Two Sum", 1, "E", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Best Time to Buy and Sell Stock", 121, "E", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Contains Duplicate", 217, "E", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Maximum Subarray", 53, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Product of Array Except Self", 238, "M", ["O", "A", "D", "T", "B", "R"]],
    ["Maximum Product Subarray", 152, "M", ["O", "D", "T", "R"]],
    ["Find Minimum in Rotated Sorted Array", 153, "M", ["O", "D", "B", "R"]],
    ["Search in Rotated Sorted Array", 33, "M", ["O", "I", "D", "B", "R"]],
    ["3Sum", 15, "M", ["O", "A", "D", "T", "B", "R"]],
    ["Container With Most Water", 11, "M", ["O", "A", "D", "B", "R"]],
    ["Subarray Sum Equals K", 560, "M", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Majority Element", 169, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Move Zeroes", 283, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Rotate Array", 189, "M", ["I", "A", "D", "R"]],
    ["Find the Duplicate Number", 287, "M", ["O", "D", "R"]],
    ["Missing Number", 268, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Single Number", 136, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Sort Colors", 75, "M", ["O", "A", "D", "R"]],
    ["Merge Intervals", 56, "M", ["O", "D", "T", "R"]],
    ["Insert Interval", 57, "M", ["O", "R"]],
    ["Meeting Rooms II", 253, "M", ["T", "A", "R"]],
    ["Pascals Triangle", 118, "E", ["I", "A", "R"]],
    ["Spiral Matrix", 54, "M", ["O", "D", "R"]],
    ["Set Matrix Zeroes", 73, "M", ["O", "D", "R"]],
    ["Next Permutation", 31, "M", ["O", "D", "R"]],
    ["Zero Array Transformation II", 3356, "M", ["R"]],
    ["Largest Number", 179, "M", ["R"]]
  ],
  strings: [
    ["Valid Anagram", 242, "E", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Valid Palindrome", 125, "E", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Longest Common Prefix", 14, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Longest Substring Without Repeating Characters", 3, "M", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Longest Palindromic Substring", 5, "M", ["O", "D", "T", "B", "R"]],
    ["String to Integer Atoi", 8, "M", ["I", "A", "R"]],
    ["Reverse Words in a String", 151, "M", ["O", "I", "A", "D", "T", "F", "R"]],
    ["First Unique Character in a String", 387, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Group Anagrams", 49, "M", ["O", "D", "T", "B", "R"]],
    ["Find All Anagrams in a String", 438, "M", ["O", "D", "R"]],
    ["Permutation in String", 567, "M", ["O", "D", "T", "R"]],
    ["Minimum Window Substring", 76, "H", ["O", "D", "B", "R"]],
    ["Decode String", 394, "M", ["O", "D", "R"]],
    ["Isomorphic Strings", 205, "E", ["I", "A", "R"]],
    ["Generate Parentheses", 22, "M", ["O", "D", "R"]],
    ["Longest Repeating Character Replacement", 424, "M", ["D", "T", "B", "R"]],
    ["Valid Parentheses", 20, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Roman to Integer", 13, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Integer to Roman", 12, "M", ["O", "D", "R"]],
    ["Count and Say", 38, "M", ["I", "F", "R"]],
    ["Find Index of First Occurrence", 28, "E", ["S", "L", "R"]],
    ["Repeated Substring Pattern", 459, "E", ["L", "R"]],
    ["Rotate String", 796, "E", ["L", "R"]],
    ["String Compression", 443, "M", ["S", "C", "L", "R"]],
    ["Minimum Steps to Make Anagram", 1347, "M", ["S", "R"]],
    ["Group Shifted Strings", 249, "M", ["R"]],
    ["Shortest Word Distance II", 244, "M", ["R"]],
    ["Valid Word Abbreviation", 408, "E", ["R"]],
    ["Minimum Remove to Make Valid Parentheses", 1249, "M", ["R"]]
  ],
  hashmap: [
    ["Two Sum II Input Array Is Sorted", 167, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Top K Frequent Elements", 347, "M", ["O", "D", "T", "B", "R"]],
    ["Longest Consecutive Sequence", 128, "M", ["O", "A", "D", "B", "R"]],
    ["Valid Sudoku", 36, "M", ["O", "R"]],
    ["Word Pattern", 290, "E", ["I", "A", "R"]],
    ["Happy Number", 202, "E", ["I", "F", "R"]],
    ["4Sum II", 454, "M", ["O", "R"]],
    ["Contains Duplicate II", 219, "E", ["I", "R"]],
    ["Intersection of Two Arrays II", 350, "E", ["I", "F", "R"]],
    ["Find the Difference", 389, "E", ["I", "R"]],
    ["Insert Delete GetRandom O(1)", 380, "M", ["B", "R"]],
  ],
  twoptr: [
    ["Remove Duplicates from Sorted Array", 26, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Remove Element", 27, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Merge Sorted Array", 88, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Squares of a Sorted Array", 977, "E", ["I", "A", "R"]],
    ["Backspace String Compare", 844, "E", ["I", "A", "R"]],
    ["Minimum Size Subarray Sum", 209, "M", ["O", "D", "R"]],
    ["3Sum Closest", 16, "M", ["O", "D", "R"]],
    ["4Sum", 18, "M", ["O", "D", "R"]],
    ["Trapping Rain Water", 42, "H", ["O", "A", "D", "B", "R"]],
    ["Partition Array Positive Negative Separation", 0, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Next Permutation", 31, "M", ["R"]],
  ],
  sliding: [
    ["Maximum Average Subarray I", 643, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Longest Substring Without Repeating Characters", 3, "M", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Longest Substring with At Most K Distinct Characters", 340, "M", ["O", "D", "R"]],
    ["Fruit Into Baskets", 904, "M", ["O", "R"]],
    ["Sliding Window Maximum", 239, "H", ["O", "D", "R"]],
    ["Max Consecutive Ones III", 1004, "M", ["O", "D", "R"]],
    ["Minimum Operations to Reduce X to Zero", 1658, "M", ["O", "D", "T", "R"]],
    ["Permutation in String", 567, "M", ["O", "D", "T", "R"]],
    ["Longest Repeating Character Replacement", 424, "M", ["D", "T", "R"]],
    ["Count Number of Nice Subarrays", 1248, "M", ["O", "D", "R"]],
    ["Longest Continuous Subarray With Absolute Diff Limit", 1438, "M", ["R"]],
    ["Max Sum of Distinct Subarrays With Length K", 2461, "M", ["R"]],
    ["Continuous Subarrays", 2762, "M", ["R"]],
    ["Longest Subarray of 1's After Deleting One Element", 1493, "M", ["R"]],
  ],
  ll: [
    ["Reverse Linked List", 206, "E", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Merge Two Sorted Lists", 21, "E", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Linked List Cycle", 141, "E", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Linked List Cycle II", 142, "M", ["O", "D", "R"]],
    ["Middle of the Linked List", 876, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Remove Nth Node From End of List", 19, "M", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Palindrome Linked List", 234, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Intersection of Two Linked Lists", 160, "E", ["O", "I", "R"]],
    ["Add Two Numbers", 2, "M", ["O", "D", "T", "B", "R"]],
    ["Copy List with Random Pointer", 138, "M", ["O", "D", "B", "R"]],
    ["Merge k Sorted Lists", 23, "H", ["O", "D", "R"]],
    ["Reorder List", 143, "M", ["O", "D", "B", "R"]],
    ["Remove Duplicates from Sorted List", 83, "E", ["I", "A", "R"]],
    ["Rotate List", 61, "M", ["O", "D", "R"]],
    ["Sort List", 148, "M", ["O", "D", "T", "R"]],
    ["LRU Cache", 146, "M", ["B", "R"]],
    ["LFU Cache", 460, "H", ["B", "R"]],
  ],
  stack: [
    ["Valid Parentheses", 20, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Min Stack", 155, "M", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Implement Queue using Stacks", 232, "E", ["I", "A", "R"]],
    ["Implement Stack using Queues", 225, "E", ["I", "R"]],
    ["Daily Temperatures", 739, "M", ["O", "D", "T", "R"]],
    ["Next Greater Element I", 496, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Next Greater Element II", 503, "M", ["O", "D", "R"]],
    ["Largest Rectangle in Histogram", 84, "H", ["O", "R"]],
    ["Evaluate Reverse Polish Notation", 150, "M", ["O", "I", "R"]],
    ["Remove All Adjacent Duplicates In String", 1047, "E", ["I", "A", "R"]],
    ["Basic Calculator II", 227, "M", ["O", "D", "R"]],
    ["Asteroid Collision", 735, "M", ["O", "D", "R"]],
    ["Decode String", 394, "M", ["O", "D", "R"]],
  ],
  bs: [
    ["Binary Search", 704, "E", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Search in Rotated Sorted Array", 33, "M", ["O", "I", "D", "B", "R"]],
    ["Find Minimum in Rotated Sorted Array", 153, "M", ["O", "D", "B", "R"]],
    ["Find Peak Element", 162, "M", ["O", "D", "R"]],
    ["First Bad Version", 278, "E", ["I", "A", "R"]],
    ["Search a 2D Matrix", 74, "M", ["O", "D", "B", "R"]],
    ["Kth Smallest Element in a Sorted Matrix", 378, "M", ["O", "R"]],
    ["Find K Closest Elements", 658, "M", ["O", "D", "R"]],
    ["Capacity To Ship Packages Within D Days", 1011, "M", ["O", "D", "R"]],
    ["Koko Eating Bananas", 875, "M", ["O", "B", "R"]],
    ["Sqrtx", 69, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Count Negative Numbers in a Sorted Matrix", 1351, "E", ["I", "F", "R"]],
  ],
  trees: [
    ["Maximum Depth of Binary Tree", 104, "E", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Minimum Depth of Binary Tree", 111, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Invert Binary Tree", 226, "E", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Same Tree", 100, "E", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Symmetric Tree", 101, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Path Sum", 112, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Balanced Binary Tree", 110, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Diameter of Binary Tree", 543, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Sum of Left Leaves", 404, "E", ["I", "A", "R"]],
    ["Binary Tree Inorder Traversal", 94, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Binary Tree Preorder Traversal", 144, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Binary Tree Postorder Traversal", 145, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Binary Tree Level Order Traversal", 102, "M", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Binary Tree Zigzag Level Order Traversal", 103, "M", ["O", "D", "R"]],
    ["Binary Tree Right Side View", 199, "M", ["O", "A", "D", "B", "R"]],
    ["Lowest Common Ancestor of a Binary Search Tree", 235, "M", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Lowest Common Ancestor of a Binary Tree", 236, "M", ["O", "D", "R"]],
    ["Validate Binary Search Tree", 98, "M", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Kth Smallest Element in a BST", 230, "M", ["O", "D", "T", "B", "R"]],
    ["Flatten Binary Tree to Linked List", 114, "M", ["O", "D", "R"]],
    ["Path Sum II", 113, "M", ["O", "D", "R"]],
    ["Maximum Width of Binary Tree", 662, "M", ["O", "D", "R"]],
    ["Construct Binary Tree from Preorder and Inorder Traversal", 105, "M", ["O", "D", "B", "R"]],
    ["Delete Node in a BST", 450, "M", ["O", "D", "R"]],
    ["Binary Tree Maximum Path Sum", 124, "H", ["O", "B", "R"]],
    ["Convert Sorted Array to BST", 108, "E", ["L", "R"]],
    ["Populating Next Right Pointers", 116, "M", ["S", "L", "R"]],
    ["Count Complete Tree Nodes", 222, "M", ["L", "R"]],
    ["Trim a BST", 669, "M", ["S", "R"]],
    ["Subtree of Another Tree", 572, "E", ["B", "R"]],
    ["Convert Sorted List to Binary Search Tree", 109, "M", ["R"]],
    ["Sum Root to Leaf Numbers", 129, "M", ["R"]],
    ["Find Leaves of Binary Tree", 366, "M", ["R"]],
    ["Convert Binary Search Tree to Sorted Doubly Linked List", 426, "M", ["R"]],
  ],
  graphs: [
    ["Number of Islands", 200, "M", ["O", "A", "D", "T", "B", "R"]],
    ["Flood Fill", 733, "E", ["I", "A", "R"]],
    ["Max Area of Island", 695, "M", ["O", "D", "T", "B", "R"]],
    ["Rotting Oranges", 994, "M", ["O", "A", "D", "T", "B", "R"]],
    ["Find if Path Exists in Graph", 1971, "E", ["I", "F", "R"]],
    ["Clone Graph", 133, "M", ["O", "D", "B", "R"]],
    ["Course Schedule", 207, "M", ["O", "D", "B", "R"]],
    ["Course Schedule II", 210, "M", ["O", "B", "R"]],
    ["Pacific Atlantic Water Flow", 417, "M", ["O", "D", "R"]],
    ["Surrounded Regions", 130, "M", ["O", "D", "R"]],
    ["Number of Connected Components in an Undirected Graph", 323, "M", ["O", "D", "R"]],
    ["Keys and Rooms", 841, "M", ["I", "D", "R"]],
    ["Network Delay Time", 743, "M", ["S", "R"]],
    ["Number of Distinct Islands", 694, "M", ["R"]],
    ["Minimum Time to Visit a Cell In a Grid", 2577, "H", ["R"]],
  ],
  trie: [
    ["Implement Trie", 208, "M", ["S", "C", "B", "R"]],
    ["Design Add and Search Words", 211, "M", ["S", "C", "B", "R"]],
    ["Replace Words", 648, "M", ["S", "C", "R"]],
    ["Word Search II", 212, "H", ["B", "R"]],
    ["Search Suggestions System", 1268, "M", ["R"]],
  ],
  uf: [
    ["Number of Provinces", 547, "M", ["S", "R"]],
    ["Redundant Connection", 684, "M", ["S", "B", "R"]],
    ["Accounts Merge", 721, "M", ["S", "R"]],
    ["Word Ladder", 127, "H", ["B", "R"]],
    ["Word Ladder II", 126, "H", ["R"]],
  ],
  dp: [
    ["Climbing Stairs", 70, "E", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Min Cost Climbing Stairs", 746, "E", ["I", "A", "R"]],
    ["Fibonacci Number", 509, "E", ["I", "A", "R"]],
    ["House Robber", 198, "M", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["House Robber II", 213, "M", ["O", "D", "R"]],
    ["Jump Game", 55, "M", ["O", "D", "T", "R"]],
    ["Jump Game II", 45, "M", ["O", "D", "R"]],
    ["Coin Change", 322, "M", ["O", "A", "D", "T", "B", "R"]],
    ["Coin Change II", 518, "M", ["O", "D", "R"]],
    ["Unique Paths", 62, "M", ["O", "A", "D", "R"]],
    ["Unique Paths II", 63, "M", ["O", "R"]],
    ["Minimum Path Sum", 64, "M", ["O", "D", "R"]],
    ["Longest Increasing Subsequence", 300, "M", ["O", "D", "T", "B", "R"]],
    ["Word Break", 139, "M", ["O", "D", "T", "R"]],
    ["Decode Ways", 91, "M", ["O", "T", "R"]],
    ["Partition Equal Subset Sum", 416, "M", ["O", "D", "R"]],
    ["Target Sum", 494, "M", ["O", "D", "R"]],
    ["Perfect Squares", 279, "M", ["O", "D", "R"]],
    ["Longest Common Subsequence", 1143, "M", ["S", "C", "L", "B", "R"]],
    ["Triangle", 120, "M", ["S", "C", "L", "R"]],
    ["Maximal Square", 221, "M", ["C", "R"]],
    ["Edit Distance", 72, "H", ["B", "R"]],
    ["Regular Expression Matching", 10, "H", ["B", "R"]],
  ],
  bt: [
    ["Subsets", 78, "M", ["O", "D", "B", "R"]],
    ["Subsets II", 90, "M", ["O", "B", "R"]],
    ["Permutations", 46, "M", ["O", "D", "T", "B", "R"]],
    ["Permutations II", 47, "M", ["O", "R"]],
    ["Combinations", 77, "M", ["O", "D", "R"]],
    ["Combination Sum", 39, "M", ["O", "D", "T", "B", "R"]],
    ["Combination Sum II", 40, "M", ["O", "R"]],
    ["Letter Combinations of a Phone Number", 17, "M", ["O", "A", "D", "R"]],
    ["Word Search", 79, "M", ["O", "D", "B", "R"]],
    ["Palindrome Partitioning", 131, "M", ["O", "R"]],
  ],
  heap: [
    ["Kth Largest Element in an Array", 215, "M", ["O", "D", "T", "B", "R"]],
    ["K Closest Points to Origin", 973, "M", ["O", "D", "B", "R"]],
    ["Task Scheduler", 621, "M", ["O", "T", "R"]],
    ["Reorganize String", 767, "M", ["O", "D", "R"]],
    ["Find Median from Data Stream", 295, "H", ["O", "R"]],
    ["Kth Largest Element in a Stream", 703, "E", ["I", "F", "B", "R"]],
    ["Last Stone Weight", 1046, "E", ["I", "F", "B", "R"]],
    ["Top K Frequent Words", 692, "M", ["O", "D", "R"]],
    ["Minimum Difference in Sums After Removal of Elements", 2163, "H", ["R"]],
  ],
  sort: [
    ["Bubble Sort — Write from Scratch", 0, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Selection Sort — Write from Scratch", 0, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Insertion Sort — Write from Scratch", 0, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Merge Sort — Implement + Explain Complexity", 0, "M", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Quick Sort — Implement + Explain Worst Case", 0, "M", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Counting Sort — When and How to Use", 0, "M", ["O", "D", "R"]],
    ["Largest Number", 179, "M", ["O", "D", "R"]],
    ["Sort Array by Parity", 905, "E", ["I", "A", "R"]],
  ],
  bits: [
    ["Single Number", 136, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Single Number II", 137, "M", ["O", "R"]],
    ["Number of 1 Bits", 191, "E", ["I", "A", "R"]],
    ["Counting Bits", 338, "E", ["I", "A", "R"]],
    ["Reverse Bits", 190, "E", ["I", "R"]],
    ["Power of Two", 231, "E", ["I", "A", "R"]],
    ["Sum of Two Integers", 371, "M", ["O", "D", "R"]],
    ["Missing Number", 268, "E", ["O", "I", "A", "D", "T", "F", "R"]],
  ],
  math: [
    ["Palindrome Number", 9, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Reverse Integer", 7, "M", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Powx n", 50, "M", ["O", "D", "R"]],
    ["Factorial Trailing Zeroes", 172, "M", ["O", "I", "R"]],
    ["Count Primes", 204, "M", ["I", "A", "R"]],
    ["GCD and LCM Euclidean Algorithm", 0, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Excel Sheet Column Number", 171, "E", ["I", "A", "R"]],
    ["Nth Ugly Number", 264, "M", ["S", "R"]],
    ["Best Time to Buy and Sell Stock II", 122, "M", ["R"]],
    ["Gas Station", 134, "M", ["R"]],
    ["Split Array Largest Sum", 410, "H", ["R"]],
    ["Random Pick with Weight", 528, "M", ["R"]],
    ["Maximum Swap", 670, "M", ["R"]],
    ["The kth Factor of n", 1492, "M", ["R"]],
  ],
  matrix: [
    ["Rotate Image", 48, "M", ["O", "D", "R"]],
    ["Spiral Matrix", 54, "M", ["O", "D", "R"]],
    ["Set Matrix Zeroes", 73, "M", ["O", "D", "R"]],
    ["Search a 2D Matrix", 74, "M", ["O", "D", "R"]],
    ["Game of Life", 289, "M", ["O", "R"]],
    ["Diagonal Traverse", 498, "M", ["I", "R"]],
    ["Lucky Numbers in a Matrix", 1380, "E", ["I", "F", "R"]],
    ["Toeplitz Matrix", 766, "E", ["I", "F", "R"]],
  ],
};

// Full 104-question RELX/Elsevier/LexisNexis compendium supplied by the user.
const RELX_EXTRA = [
  {"section": "Arrays & Matrices", "name": "Two Sum", "lc": "1"},
  {"section": "Arrays & Matrices", "name": "Best Time to Buy and Sell Stock", "lc": "121"},
  {"section": "Arrays & Matrices", "name": "Best Time to Buy and Sell Stock II", "lc": "122"},
  {"section": "Arrays & Matrices", "name": "Contains Duplicate", "lc": "217"},
  {"section": "Arrays & Matrices", "name": "Maximum Subarray", "lc": "53"},
  {"section": "Arrays & Matrices", "name": "Product of Array Except Self", "lc": "238"},
  {"section": "Arrays & Matrices", "name": "3Sum", "lc": "15"},
  {"section": "Arrays & Matrices", "name": "Container With Most Water", "lc": "11"},
  {"section": "Arrays & Matrices", "name": "Majority Element", "lc": "169"},
  {"section": "Arrays & Matrices", "name": "Merge Intervals", "lc": "56"},
  {"section": "Arrays & Matrices", "name": "Spiral Matrix", "lc": "54"},
  {"section": "Arrays & Matrices", "name": "Set Matrix Zeroes", "lc": "73"},
  {"section": "Arrays & Matrices", "name": "Next Permutation", "lc": "31"},
  {"section": "Arrays & Matrices", "name": "Zero Array Transformation II", "lc": "3356"},
  {"section": "Arrays & Matrices", "name": "Largest Number", "lc": "179"},
  {"section": "Arrays & Matrices", "name": "Rotate Image", "lc": "48"},
  {"section": "Arrays & Matrices", "name": "Remove Element", "lc": "27"},
  {"section": "Arrays & Matrices", "name": "Check if One String Swap Can Make Strings Equal", "lc": "1790"},
  {"section": "Arrays & Matrices", "name": "Count Unhappy Friends", "lc": "1583"},
  {"section": "Arrays & Matrices", "name": "Maximum Passengers on Blocked Grid (Custom HackerRank Matrix DP)", "lc": "0"},
  {"section": "Arrays & Matrices", "name": "Disk Space Analysis / Sliding Window Minimum (Custom HackerRank)", "lc": "0"},
  {"section": "Arrays & Matrices", "name": "Maximize Earnings / Weighted Interval Scheduling (Custom HackerRank)", "lc": "0"},
  {"section": "Strings & Text Manipulation", "name": "Valid Anagram", "lc": "242"},
  {"section": "Strings & Text Manipulation", "name": "Valid Palindrome", "lc": "125"},
  {"section": "Strings & Text Manipulation", "name": "Longest Substring Without Repeating Characters", "lc": "3"},
  {"section": "Strings & Text Manipulation", "name": "Longest Palindromic Substring", "lc": "5"},
  {"section": "Strings & Text Manipulation", "name": "Reverse Words in a String", "lc": "151"},
  {"section": "Strings & Text Manipulation", "name": "Group Anagrams", "lc": "49"},
  {"section": "Strings & Text Manipulation", "name": "Minimum Window Substring", "lc": "76"},
  {"section": "Strings & Text Manipulation", "name": "Valid Parentheses", "lc": "20"},
  {"section": "Strings & Text Manipulation", "name": "Find Index of First Occurrence in String", "lc": "28"},
  {"section": "Strings & Text Manipulation", "name": "String Compression", "lc": "443"},
  {"section": "Strings & Text Manipulation", "name": "Group Shifted Strings", "lc": "249"},
  {"section": "Strings & Text Manipulation", "name": "Shortest Word Distance II", "lc": "244"},
  {"section": "Strings & Text Manipulation", "name": "Valid Word Abbreviation", "lc": "408"},
  {"section": "Strings & Text Manipulation", "name": "Minimum Remove to Make Valid Parentheses", "lc": "1249"},
  {"section": "Strings & Text Manipulation", "name": "Longest Common Prefix", "lc": "14"},
  {"section": "Strings & Text Manipulation", "name": "Repeated String Match", "lc": "686"},
  {"section": "Strings & Text Manipulation", "name": "Maximum Number of Occurrences of a Substring", "lc": "1297"},
  {"section": "Strings & Text Manipulation", "name": "Guess the Word / String Processing (Custom HackerRank)", "lc": "0"},
  {"section": "Hashing, Two Pointers & Sliding Window", "name": "Two Sum II - Input Array Is Sorted", "lc": "167"},
  {"section": "Hashing, Two Pointers & Sliding Window", "name": "Top K Frequent Elements", "lc": "347"},
  {"section": "Hashing, Two Pointers & Sliding Window", "name": "Longest Consecutive Sequence", "lc": "128"},
  {"section": "Hashing, Two Pointers & Sliding Window", "name": "Remove Duplicates from Sorted Array", "lc": "26"},
  {"section": "Hashing, Two Pointers & Sliding Window", "name": "Trapping Rain Water", "lc": "42"},
  {"section": "Hashing, Two Pointers & Sliding Window", "name": "Minimum Size Subarray Sum", "lc": "209"},
  {"section": "Hashing, Two Pointers & Sliding Window", "name": "Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit", "lc": "1438"},
  {"section": "Hashing, Two Pointers & Sliding Window", "name": "Max Sum of Distinct Subarrays With Length K", "lc": "2461"},
  {"section": "Hashing, Two Pointers & Sliding Window", "name": "Continuous Subarrays", "lc": "2762"},
  {"section": "Hashing, Two Pointers & Sliding Window", "name": "Longest Subarray of 1's After Deleting One Element", "lc": "1493"},
  {"section": "Hashing, Two Pointers & Sliding Window", "name": "Minimum Street Lights Coverage (Custom HackerRank Interval Greedy)", "lc": "0"},
  {"section": "Hashing, Two Pointers & Sliding Window", "name": "Moving Average from Data Stream", "lc": "346"},
  {"section": "Hashing, Two Pointers & Sliding Window", "name": "Maximize Amount After Two Days of Conversions", "lc": "3021 / Custom Variant"},
  {"section": "Hashing, Two Pointers & Sliding Window", "name": "Minimum Occurrence Character Search (Custom HackerRank)", "lc": "0"},
  {"section": "Linked Lists", "name": "Reverse Linked List", "lc": "206"},
  {"section": "Linked Lists", "name": "Merge Two Sorted Lists", "lc": "21"},
  {"section": "Linked Lists", "name": "Linked List Cycle", "lc": "141"},
  {"section": "Linked Lists", "name": "LRU Cache", "lc": "146"},
  {"section": "Linked Lists", "name": "Reorder List", "lc": "143"},
  {"section": "Linked Lists", "name": "Remove Nth Node From End of List", "lc": "19"},
  {"section": "Linked Lists", "name": "Add Two Numbers", "lc": "2"},
  {"section": "Linked Lists", "name": "Merge K Sorted Lists", "lc": "23"},
  {"section": "Stacks & Queues", "name": "Remove All Adjacent Duplicates In String", "lc": "1047"},
  {"section": "Stacks & Queues", "name": "Min Stack", "lc": "155"},
  {"section": "Stacks & Queues", "name": "Daily Temperatures", "lc": "739"},
  {"section": "Stacks & Queues", "name": "Next Greater Element I & II", "lc": "496, 503"},
  {"section": "Stacks & Queues", "name": "Implement Queue using Stacks", "lc": "232"},
  {"section": "Trees — BT & BST", "name": "Maximum Depth of Binary Tree", "lc": "104"},
  {"section": "Trees — BT & BST", "name": "Diameter of Binary Tree", "lc": "543"},
  {"section": "Trees — BT & BST", "name": "Binary Tree Level Order Traversal", "lc": "102"},
  {"section": "Trees — BT & BST", "name": "Binary Tree Right Side View", "lc": "199"},
  {"section": "Trees — BT & BST", "name": "Lowest Common Ancestor of a Binary Tree", "lc": "236"},
  {"section": "Trees — BT & BST", "name": "Convert Sorted List to Binary Search Tree", "lc": "109"},
  {"section": "Trees — BT & BST", "name": "Sum Root to Leaf Numbers", "lc": "129"},
  {"section": "Trees — BT & BST", "name": "Find Leaves of Binary Tree", "lc": "366"},
  {"section": "Trees — BT & BST", "name": "Convert Binary Search Tree to Sorted Doubly Linked List", "lc": "426"},
  {"section": "Graphs, Matrices & Tries", "name": "Number of Islands", "lc": "200"},
  {"section": "Graphs, Matrices & Tries", "name": "Number of Islands II", "lc": "305"},
  {"section": "Graphs, Matrices & Tries", "name": "Rotting Oranges", "lc": "994"},
  {"section": "Graphs, Matrices & Tries", "name": "Course Schedule I & II", "lc": "207, 210"},
  {"section": "Graphs, Matrices & Tries", "name": "Number of Distinct Islands", "lc": "694"},
  {"section": "Graphs, Matrices & Tries", "name": "Minimum Time to Visit a Cell In a Grid", "lc": "2577"},
  {"section": "Graphs, Matrices & Tries", "name": "Clone Graph", "lc": "133"},
  {"section": "Graphs, Matrices & Tries", "name": "Search Suggestions System / Trie", "lc": "1268"},
  {"section": "Dynamic Programming & Backtracking", "name": "Climbing Stairs", "lc": "70"},
  {"section": "Dynamic Programming & Backtracking", "name": "House Robber", "lc": "198"},
  {"section": "Dynamic Programming & Backtracking", "name": "Coin Change", "lc": "322"},
  {"section": "Dynamic Programming & Backtracking", "name": "Longest Increasing Subsequence", "lc": "300"},
  {"section": "Dynamic Programming & Backtracking", "name": "Word Break", "lc": "139"},
  {"section": "Dynamic Programming & Backtracking", "name": "Longest Common Subsequence", "lc": "1143"},
  {"section": "Dynamic Programming & Backtracking", "name": "Subsets", "lc": "78"},
  {"section": "Dynamic Programming & Backtracking", "name": "Permutations", "lc": "46"},
  {"section": "Dynamic Programming & Backtracking", "name": "Combination Sum", "lc": "39"},
  {"section": "Dynamic Programming & Backtracking", "name": "Word Search", "lc": "79"},
  {"section": "Dynamic Programming & Backtracking", "name": "Expression Add Operators", "lc": "282"},
  {"section": "Heaps, Math & Greedy", "name": "K Closest Points to Origin", "lc": "973"},
  {"section": "Heaps, Math & Greedy", "name": "Minimum Difference in Sums After Removal of Elements", "lc": "2163"},
  {"section": "Heaps, Math & Greedy", "name": "Gas Station", "lc": "134"},
  {"section": "Heaps, Math & Greedy", "name": "Split Array Largest Sum", "lc": "410"},
  {"section": "Heaps, Math & Greedy", "name": "Random Pick with Weight", "lc": "528"},
  {"section": "Heaps, Math & Greedy", "name": "Maximum Swap", "lc": "670"},
  {"section": "Heaps, Math & Greedy", "name": "The kth Factor of n", "lc": "1492"},
  {"section": "Heaps, Math & Greedy", "name": "Minimum Operations to Make Character Frequencies Equal (Custom Hard DP/Greedy)", "lc": "0"},
  {"section": "Heaps, Math & Greedy", "name": "FIFO Tax Calculation Simulation (Custom HackerRank)", "lc": "0"},
];

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

  // RELX_EXTRA is included in ALL and RELX progress.
  if (filter === "ALL" || filter === "R") {
    filteredTotal += RELX_EXTRA.length;
    filteredDone += RELX_EXTRA.filter((_, i) => checked[`relx_extra_${i}`]).length;
  }

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
                Oracle · IBM · Accenture · Dell · Thomson Reuters · Flexera · Smarsh · Capillary · ⭑ · Black Duck · Relx · RELX Extra
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
            {["ALL", "O", "I", "A", "D", "T", "F", "S", "C", "L", "B", "R"].map((co) => (
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
          placeholder="🔎  Search any problem by name..."
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
          {(filter === "ALL" || filter === "R") && (
          <div style={{ marginBottom: 8, background: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>🧩</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>RELX Extra — Full Reported Compendium</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>104 reported questions across RELX, Elsevier and LexisNexis assessments</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#475569" }}>
                {RELX_EXTRA.filter((_, i) => checked[`relx_extra_${i}`]).length}/{RELX_EXTRA.length}
              </div>
            </div>
            <div>
              {RELX_EXTRA.filter(({ name }) => !search || name.toLowerCase().includes(search.toLowerCase())).map(({ name, lc, section }, i) => {
                const key = `relx_extra_${i}`;
                const isDone = !!checked[key];
                const numericLc = /^\d+$/.test(lc) ? lc : null;
                return (
                  <div key={key} onClick={() => toggle(key)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 16px", cursor: "pointer", borderBottom: "1px solid #f8fafc", background: isDone ? "#f0fdf4" : "white" }}>
                    <div style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${isDone ? "#10b981" : "#d1d5db"}`, background: isDone ? "#10b981" : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {isDone && <span style={{ color: "white", fontSize: 11, fontWeight: 800 }}>✓</span>}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: isDone ? "#9ca3af" : "#1e293b", textDecoration: isDone ? "line-through" : "none" }}>
                        {numericLc && <span style={{ color: "#94a3b8", fontSize: 11, marginRight: 4 }}>#{numericLc}</span>}{name}
                      </div>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 4 }}>
                        <span style={{ fontSize: 9, padding: "1px 5px", borderRadius: 4, fontWeight: 700, background: CO_CLR.R.background, color: CO_CLR.R.color }}>RELX EXTRA</span>
                        <span style={{ fontSize: 9, padding: "1px 5px", borderRadius: 4, fontWeight: 700, background: "#f1f5f9", color: "#64748b" }}>{section}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

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
