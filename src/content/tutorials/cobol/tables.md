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

## 3. Sample Program: Department Roster Table

Here is a complete, working COBOL program demonstrating how to define, initialize, populate, and iterate through a table:

```cobol
      *----------------------------------------------------------------*
      * PROGRAM:    TABLE-DEMO                                         *
      * PURPOSE:    DEMONSTRATE OCCURS TABLES AND INDEXING             *
      *----------------------------------------------------------------*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. TABLE-DEMO.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
      * Define a table with 3 employee slots
       01  WS-DEPT-ROSTER.
           05 WS-EMP-NAME     PIC X(15) OCCURS 3 TIMES.

       01  WS-SUB             PIC 9(02) VALUE 1.

       PROCEDURE DIVISION.
       000-MAIN.
      * Populate table slots using 1-based index
           MOVE 'ALICE JOHNSON' TO WS-EMP-NAME(1).
           MOVE 'BOB MARTINEZ'  TO WS-EMP-NAME(2).
           MOVE 'CHARLIE DAVIS' TO WS-EMP-NAME(3).

           DISPLAY '--- DEPARTMENT ROSTER ---'.

      * Loop through table elements
           PERFORM VARYING WS-SUB FROM 1 BY 1 UNTIL WS-SUB > 3
               DISPLAY 'EMPLOYEE #' WS-SUB ': ' WS-EMP-NAME(WS-SUB)
           END-PERFORM.

           STOP RUN.
```

---

---

## 📚 Glossary of Clauses & Reserved Words

- **`OCCURS`**: A clause used in the DATA DIVISION to define an array (table) by specifying how many times an item repeats.
- **`INDEXED BY`**: A clause used with OCCURS to define an internal index variable optimized for extremely fast table lookups.
- **`ASCENDING / DESCENDING KEY`**: A clause used with OCCURS to inform the compiler that the table data is sorted, enabling binary searches.
- **`SEARCH`**: A verb used to perform a linear (sequential) search through a table.
- **`SEARCH ALL`**: A verb used to perform a highly optimized binary search through a table (requires sorted keys).
- **`SET`**: A verb used to manipulate index variables (e.g., setting them to 1, or incrementing them) instead of using standard arithmetic verbs.

---

## 💻 Activity: Days of the Week

Let's allocate a simple table and assign a value to it.

**Your tasks:**

1. Create your `IDENTIFICATION DIVISION` with `PROGRAM-ID. TABLE-APP.`.
2. In the `DATA DIVISION` and `WORKING-STORAGE SECTION`, create a top-level group item named `01 WORK-WEEK.`.
3. Underneath it, create the repeating table element: `05 DAYS PIC X(10) OCCURS 5 TIMES.`
4. Drop down into the `PROCEDURE DIVISION.`
5. Write a statement to `MOVE 'MONDAY' TO DAYS(1).`
6. `DISPLAY DAYS(1)` and finish with `STOP RUN.`

**Sample Code to Start With:**

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. TABLE-APP.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WORK-WEEK.
          05 DAYS PIC X(10) OCCURS 5 TIMES.

       PROCEDURE DIVISION.
       100-MAIN.
           MOVE 'MONDAY' TO DAYS(1).
           MOVE 'TUESDAY' TO DAYS(2).
           DISPLAY 'FIRST DAY: ' DAYS(1).
           DISPLAY 'SECOND DAY: ' DAYS(2).
           STOP RUN.
```

**⚠️ Warning:** Remember your column rules! The `01` level goes in **Area A** (Column 8), but the `05` level and your `PROCEDURE DIVISION` logic (`MOVE`) must go in **Area B** (Column 12). And don't forget your periods `.` at the end of your declarations!
