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
  B: { background: "#e2e8f0", color: "#334155" }, // Slate/Dark Gray
  R: { background: "#ffedd5", color: "#ea580c" }  // Orange
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
    ["Merge Intervals", 56, "M", ["O", "D", "T", "R"]],
    ["Find Minimum in Rotated Sorted Array", 153, "M", ["O", "D", "B"]],
    ["Search in Rotated Sorted Array", 33, "M", ["O", "I", "D", "B"]],
    ["3Sum", 15, "M", ["O", "A", "D", "T", "B", "R"]],
    ["Container With Most Water", 11, "M", ["O", "A", "D", "B", "R"]],
    ["Majority Element", 169, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Zero Array Transformation II", 3356, "M", ["R"]],
    ["Largest Number", 179, "M", ["R"]]
  ],
  strings: [
    ["Valid Anagram", 242, "E", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Valid Palindrome", 125, "E", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Longest Substring Without Repeating Characters", 3, "M", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Longest Palindromic Substring", 5, "M", ["O", "D", "T", "B", "R"]],
    ["Reverse Words in a String", 151, "M", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Group Anagrams", 49, "M", ["O", "D", "T", "B", "R"]],
    ["Minimum Window Substring", 76, "H", ["O", "D", "B", "R"]],
    ["Longest Repeating Character Replacement", 424, "M", ["D", "T", "B"]],
    ["Valid Parentheses", 20, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["String Compression", 443, "M", ["S", "C", "L", "R"]],
    ["Group Shifted Strings", 249, "M", ["R"]],
    ["Shortest Word Distance II", 244, "M", ["R"]],
    ["Valid Word Abbreviation", 408, "E", ["R"]],
    ["Minimum Remove to Make Valid Parentheses", 1249, "M", ["R"]]
  ],
  hashmap: [
    ["Two Sum II Input Array Is Sorted", 167, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Top K Frequent Elements", 347, "M", ["O", "D", "T", "B", "R"]],
    ["Longest Consecutive Sequence", 128, "M", ["O", "A", "D", "B", "R"]],
    ["Insert Delete GetRandom O(1)", 380, "M", ["B"]],
  ],
  twoptr: [
    ["Remove Element", 27, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Trapping Rain Water", 42, "H", ["O", "A", "D", "B", "R"]],
    ["Next Permutation", 31, "M", ["R"]],
  ],
  sliding: [
    ["Longest Continuous Subarray With Absolute Diff Limit", 1438, "M", ["R"]],
    ["Max Sum of Distinct Subarrays With Length K", 2461, "M", ["R"]],
  ],
  ll: [
    ["Reverse Linked List", 206, "E", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Merge Two Sorted Lists", 21, "E", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Linked List Cycle", 141, "E", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Remove Nth Node From End of List", 19, "M", ["O", "I", "A", "D", "T", "F", "B"]],
    ["Add Two Numbers", 2, "M", ["O", "D", "T", "B"]],
    ["Copy List with Random Pointer", 138, "M", ["O", "D", "B"]],
    ["Reorder List", 143, "M", ["O", "D", "B"]],
    ["LRU Cache", 146, "M", ["B", "R"]],
    ["LFU Cache", 460, "H", ["B"]],
  ],
  bs: [
    ["Binary Search", 704, "E", ["O", "I", "A", "D", "T", "F", "B"]],
    ["Search a 2D Matrix", 74, "M", ["O", "D", "B"]],
    ["Koko Eating Bananas", 875, "M", ["O", "B"]],
  ],
  trees: [
    ["Maximum Depth of Binary Tree", 104, "E", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Invert Binary Tree", 226, "E", ["O", "I", "A", "D", "T", "F", "B"]],
    ["Same Tree", 100, "E", ["O", "I", "A", "D", "T", "F", "B"]],
    ["Diameter of Binary Tree", 543, "E", ["O", "I", "A", "D", "T", "F", "R"]],
    ["Binary Tree Level Order Traversal", 102, "M", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Binary Tree Right Side View", 199, "M", ["O", "A", "D", "B", "R"]],
    ["Lowest Common Ancestor of a BST", 235, "M", ["O", "I", "A", "D", "T", "F", "B"]],
    ["Lowest Common Ancestor of a Binary Tree", 236, "M", ["O", "D", "R"]],
    ["Validate Binary Search Tree", 98, "M", ["O", "I", "A", "D", "T", "F", "B"]],
    ["Kth Smallest Element in a BST", 230, "M", ["O", "D", "T", "B"]],
    ["Construct Binary Tree from Preorder and Inorder Traversal", 105, "M", ["O", "D", "B"]],
    ["Binary Tree Maximum Path Sum", 124, "H", ["O", "B"]],
    ["Subtree of Another Tree", 572, "E", ["B"]],
    ["Convert Sorted List to Binary Search Tree", 109, "M", ["R"]],
    ["Sum Root to Leaf Numbers", 129, "M", ["R"]],
  ],
  graphs: [
    ["Number of Islands", 200, "M", ["O", "A", "D", "T", "B", "R"]],
    ["Max Area of Island", 695, "M", ["O", "D", "T", "B"]],
    ["Rotting Oranges", 994, "M", ["O", "A", "D", "T", "B", "R"]],
    ["Clone Graph", 133, "M", ["O", "D", "B"]],
    ["Course Schedule", 207, "M", ["O", "D", "B", "R"]],
    ["Course Schedule II", 210, "M", ["O", "B"]],
    ["Number of Distinct Islands", 694, "M", ["R"]],
  ],
  trie: [
    ["Implement Trie", 208, "M", ["S", "C", "B"]],
    ["Design Add and Search Words", 211, "M", ["S", "C", "B"]],
    ["Word Search II", 212, "H", ["B"]],
  ],
  uf: [
    ["Redundant Connection", 684, "M", ["S", "B"]],
    ["Word Ladder", 127, "H", ["B"]],
  ],
  dp: [
    ["Climbing Stairs", 70, "E", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["House Robber", 198, "M", ["O", "I", "A", "D", "T", "F", "B", "R"]],
    ["Coin Change", 322, "M", ["O", "A", "D", "T", "B", "R"]],
    ["Longest Increasing Subsequence", 300, "M", ["O", "D", "T", "B", "R"]],
    ["Word Break", 139, "M", ["O", "D", "T", "R"]],
    ["Longest Common Subsequence", 1143, "M", ["S", "C", "L", "B", "R"]],
    ["Edit Distance", 72, "H", ["B"]],
    ["Regular Expression Matching", 10, "H", ["B"]],
  ],
  bt: [
    ["Subsets", 78, "M", ["O", "D", "B"]],
    ["Subsets II", 90, "M", ["O", "B"]],
    ["Permutations", 46, "M", ["O", "D", "T", "B", "R"]],
    ["Combination Sum", 39, "M", ["O", "D", "T", "B", "R"]],
    ["Word Search", 79, "M", ["O", "D", "B", "R"]],
  ],
  heap: [
    ["Kth Largest Element in an Array", 215, "M", ["O", "D", "T", "B"]],
    ["K Closest Points to Origin", 973, "M", ["O", "D", "B"]],
    ["Kth Largest Element in a Stream", 703, "E", ["I", "F", "B"]],
    ["Last Stone Weight", 1046, "E", ["I", "F", "B"]],
  ],
  math: [
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

  const total = CATS.reduce((s, c) => s + (P[c.id]?.length || 0), 0);
  const done = Object.keys(checked).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div
      style={{
        fontFamily: "system-ui,-apple-system,sans-serif",
        background: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      {/* Sticky header */}
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
                Oracle · IBM · Accenture · Dell · Thomson Reuters · Flexera · Smarsh · Capillary · ⭑
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div>
                <span
                  style={{ fontWeight: 800, fontSize: 24, color: "#3b82f6" }}
                >
                  {done}
                </span>
                <span
                  style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}
                >
                  /{total}
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
        {/* Search */}
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

        {/* Category cards */}
        {CATS.map((cat) => {
          const probs = P[cat.id] || [];
          const indexed = probs.map((prob, i) => ({
            prob,
            i,
            key: `${cat.id}_${i}`,
          }));
          const visible = indexed.filter(({ prob: [name, , , cos] }) => {
            const coOk = filter === "ALL" || cos.includes(filter);
            const srOk =
              !search || name.toLowerCase().includes(search.toLowerCase());
            return coOk && srOk;
          });
          if (!visible.length) return null;

          const catDone = probs.filter(
            (_, i) => checked[`${cat.id}_${i}`]
          ).length;
          const catPct = Math.round((catDone / probs.length) * 100);
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
              }}
            >
              {/* Category header */}
              <button
                onClick={() => setExp((e) => ({ ...e, [cat.id]: !e[cat.id] }))}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
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
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>{cat.n}</div>
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
                        color: catPct === 100 ? "#10b981" : "#475569",
                      }}
                    >
                      {catDone}/{probs.length}
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
                    {isOpen ? "▲" : "▼"}
                  </span>
                </div>
              </button>

              {/* Problem rows */}
              {isOpen && (
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
                        {/* Checkbox */}
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

                        {/* Name + company tags */}
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
                                  background: CO_CLR[co].background,
                                  color: CO_CLR[co].color,
                                }}
                              >
                                {co === "T" ? "T.Reuters" : CO[co]}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Difficulty + LC link */}
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

        {/* Stats footer */}
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
                  key: `${cat.id}_${i}`,
                }))
              ).filter((x) => x.d === d);
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
