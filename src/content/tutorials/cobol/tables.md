# 📊 Table Handling: Arrays, COBOL Style

If you have written code in JavaScript, Python, or Java, you are likely very familiar with Arrays. In the COBOL universe, arrays are called **Tables**.

There is one critical difference you must burn into your memory right now before we begin: **COBOL Tables are 1-indexed!**

Unlike modern languages where the first item is at `[0]`, in COBOL, the first item is always at `(1)`. If you try to access index `(0)`, your program will instantly crash with an "out of bounds" memory error.

---

## 1. Defining a Table (`OCCURS`)

Because COBOL requires strict memory allocation, you cannot create a table that dynamically grows or shrinks. You must tell the compiler exactly how many slots to reserve in the `DATA DIVISION` using the `OCCURS` clause.

Usually, a Table is set up as a "Group Item". You define a top-level `01` header, and then use `05` sub-levels to define the repeating elements.

```cobol
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  MONTH-TABLE.
           05 MONTH-NAME PIC X(10) OCCURS 12 TIMES.

```

_In this example, we just carved out 120 bytes of contiguous memory (12 slots × 10 characters each). To access the first month, you would write `MONTH-NAME(1)`._

---

## 2. Searching a Table

COBOL was built for processing heavy data, so it comes with incredibly powerful, built-in search functions. You don't need to write manual `for` loops to find data; you just use the `SEARCH` verbs!

- **`SEARCH` (Linear Search):** Scans the table sequentially from top to bottom. Great for small, unsorted tables.
- **`SEARCH ALL` (Binary Search):** A highly optimized, lightning-fast search algorithm. To use this, your table data must be pre-sorted, and you must define keys.

### The `INDEXED BY` Clause

To use the built-in `SEARCH` commands, COBOL needs a dedicated pointer (an index) to keep track of where it is in the table. You define this right next to your `OCCURS` clause.

```cobol
       01  MONTH-TABLE.
           05 MONTH-NAME PIC X(10) OCCURS 12 TIMES INDEXED BY MONTH-IDX.

```

_(Fun Fact: Notice how `MONTH-IDX` doesn't have a `PIC` clause? `INDEXED BY` creates a special, hidden binary variable managed entirely by the compiler for maximum speed!)_

---

## 💻 Activity: Days of the Week

Let's allocate a simple table and assign a value to it.

**Your tasks:**

1. In the `WORKING-STORAGE SECTION`, create a top-level group item named `01 WORK-WEEK.`.
2. Underneath it, create the repeating table element: `05 DAYS PIC X(10) OCCURS 5 TIMES.`
3. Drop down into the `PROCEDURE DIVISION`.
4. Write a statement to move the text `'MONDAY'` into the very first slot of your new table. _(Hint: Use parentheses for the index!)_

**⚠️ Warning:** Remember your column rules! The `01` level goes in **Area A** (Column 8), but the `05` level and your `PROCEDURE DIVISION` logic (`MOVE`) must go in **Area B** (Column 12). And don't forget your periods `.` at the end of your declarations!
