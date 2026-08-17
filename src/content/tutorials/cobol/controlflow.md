# 🔀 Control Flow: Directing the Logic

Because COBOL was designed to be easily readable by non-programmers, its logical structures read much like standard English sentences. While it lacks the curly braces `{ }` of modern languages, it provides incredibly robust mechanisms for handling logic, routing, and iteration.

Today, modern COBOL standards heavily rely on **Explicit Scope Terminators** (like `END-IF` and `END-PERFORM`). These tell the compiler exactly where a logical block finishes, replacing the older, error-prone method of relying entirely on periods.

---

## 1. IF Statements (Conditional Logic)

The `IF` statement works exactly as you would expect. You can use standard mathematical symbols (`>`, `<`, `=`) or their English equivalents (`GREATER THAN`, `LESS THAN`, `EQUAL TO`).

**Pro-Tip:** Always close your `IF` blocks with an `END-IF`. If you forget it, the compiler might think the rest of your program is part of the `IF` condition!

```cobol
       PROCEDURE DIVISION.
       CHECK-BALANCE.
           IF ACCOUNT-BAL > 1000
               DISPLAY 'High Balance'
           ELSE
               DISPLAY 'Normal Balance'
           END-IF.
```

---

## 2. EVALUATE (The COBOL Switch/Case)

The `EVALUATE` statement is COBOL's version of a `switch` or `match` statement, but it is vastly more powerful. You can evaluate single variables, ranges of numbers, or even complex boolean expressions.

A very common pattern is **`EVALUATE TRUE`**, which acts like a clean, readable chain of `if / else if / else` statements.

```cobol
       PROCEDURE DIVISION.
       CHECK-AGE.
           EVALUATE TRUE
               WHEN AGE < 18
                   DISPLAY 'Status: Minor'
               WHEN AGE >= 18 AND AGE < 65
                   DISPLAY 'Status: Adult'
               WHEN OTHER
                   DISPLAY 'Status: Senior'
           END-EVALUATE.
```

_Notice the `WHEN OTHER` clause? This is your default fallback, catching anything that doesn't match the prior conditions._

---

## 3. PERFORM (Loops and Execution)

The `PERFORM` verb is the ultimate workhorse of COBOL. It does the job of `for` loops, `while` loops, and function calls combined.

For iterating over code, we use **Inline Loops**. The `PERFORM VARYING` construct allows you to set a counter, specify how much to increment it by, and set an exit condition.

```cobol
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-COUNTER  PIC 9(02) VALUE 0.

       PROCEDURE DIVISION.
       LOOP-DEMO.
           PERFORM VARYING WS-COUNTER FROM 1 BY 1 UNTIL WS-COUNTER > 10
               DISPLAY 'Current Count is: ' WS-COUNTER
           END-PERFORM.
```

### Condition-Based Loops (`PERFORM UNTIL`)

Instead of counting, you can loop until a specific condition is met. This is COBOL's equivalent of a `while` or `repeat...until` loop.

```cobol
       PROCEDURE DIVISION.
       PROCESS-FILE.
           PERFORM UNTIL END-OF-FILE = 'Y'
               READ IN-FILE
                   AT END MOVE 'Y' TO END-OF-FILE
               END-READ

               IF END-OF-FILE NOT = 'Y'
                   DISPLAY 'Processing Record...'
               END-IF
           END-PERFORM.
```

_By default, COBOL tests the condition **before** the loop runs (`WITH TEST BEFORE`). If you want it to run at least once and test at the end, you can explicitly say `PERFORM UNTIL condition WITH TEST AFTER`._

---

## 4. Sample Program: Customer Evaluation Engine

Here is a complete, runnable COBOL program showing `IF-ELSE`, `EVALUATE`, and `PERFORM` loops working together:

```cobol
      *----------------------------------------------------------------*
      * PROGRAM:    CONTROL-FLOW-DEMO                                  *
      * PURPOSE:    DEMONSTRATE IF, EVALUATE, AND PERFORM CONSTRUCTS   *
      *----------------------------------------------------------------*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. CONTROL-FLOW-DEMO.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-SCORE        PIC 9(03) VALUE 85.
       01  WS-GRADE        PIC X(01).
       01  WS-INDEX        PIC 9(02) VALUE 1.

       PROCEDURE DIVISION.
       000-MAIN.
      * 1. EVALUATE Decision Matrix
           EVALUATE TRUE
               WHEN WS-SCORE >= 90
                   MOVE 'A' TO WS-GRADE
               WHEN WS-SCORE >= 80
                   MOVE 'B' TO WS-GRADE
               WHEN WS-SCORE >= 70
                   MOVE 'C' TO WS-GRADE
               WHEN OTHER
                   MOVE 'F' TO WS-GRADE
           END-EVALUATE.

           DISPLAY 'SCORE: ' WS-SCORE ' -> GRADE: ' WS-GRADE.

      * 2. IF-ELSE Statement with explicit terminator
           IF WS-GRADE = 'A' OR WS-GRADE = 'B'
               DISPLAY 'STATUS: PASSED WITH HONORS'
           ELSE
               DISPLAY 'STATUS: REGULAR PASS/FAIL'
           END-IF.

      * 3. PERFORM Loop
           DISPLAY '--- PRINTING ITERATIONS ---'.
           PERFORM VARYING WS-INDEX FROM 1 BY 1 UNTIL WS-INDEX > 3
               DISPLAY 'RUNNING STEP #' WS-INDEX
           END-PERFORM.

           STOP RUN.
```

---

---

## 📚 Glossary of Clauses & Reserved Words

- **`IF` / `ELSE` / `END-IF`**: Standard conditional branching statements.
- **`EVALUATE`**: The powerful COBOL equivalent of a `switch` or `match` statement.
- **`WHEN` / `WHEN OTHER`**: Clauses used within EVALUATE to define specific conditions and a default fallback.
- **`PERFORM`**: The primary verb for iteration and executing out-of-line blocks of code (like calling a function).
- **`VARYING ... FROM ... BY ... UNTIL`**: Clauses used with PERFORM to create a traditional `for` loop counting structure.
- **`UNTIL`**: A clause used with PERFORM to loop until a specific condition evaluates to true (like a `while` loop).
- **`WITH TEST BEFORE` / `WITH TEST AFTER`**: Clauses used with PERFORM UNTIL to dictate whether the condition is checked at the start (default) or the end of the loop.
- **`TIMES`**: A clause used with PERFORM to execute a block of code a specific, hardcoded number of times.

---

## 💻 Activity: The 5-Time Loop

Let's test your iteration skills. In the editor on the right, write a complete program that prints a message exactly 5 times.

**Your tasks:**

1. Setup your `IDENTIFICATION DIVISION` with a `PROGRAM-ID. LOOP-APP.`.
2. Create a `DATA DIVISION` and a `WORKING-STORAGE SECTION`.
3. Define a numeric variable to act as your loop counter: `01 WS-LOOP-COUNT PIC 9 VALUE 1.`.
4. In your `PROCEDURE DIVISION`, write a `PERFORM 5 TIMES` loop (or `PERFORM VARYING WS-LOOP-COUNT FROM 1 BY 1 UNTIL WS-LOOP-COUNT > 5`).
5. Inside the loop, `DISPLAY 'Hello from COBOL!'`.
6. End your program properly with `STOP RUN.`

**Sample Code to Start With:**

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. LOOP-APP.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-LOOP-COUNT PIC 9 VALUE 1.

       PROCEDURE DIVISION.
       100-MAIN.
           PERFORM 5 TIMES
               DISPLAY 'Hello from COBOL!'
           END-PERFORM.
           STOP RUN.
```

**⚠️ Warning:** Watch your margins! Your `01` variable must start in Area A (Column 8), while your `PERFORM` and `DISPLAY` statements must start in Area B (Column 12).
