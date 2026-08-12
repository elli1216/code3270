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

_(Remember: COBOL does not allow you to invent variables on the fly. You must declare your loop counter in the `DATA DIVISION` before you can use it in a `PERFORM` statement!)_

---

## 💻 Activity: The 5-Time Loop

Let's test your iteration skills. In the editor on the right, write a complete program that prints a message exactly 5 times.

**Your tasks:**

1. Setup your `IDENTIFICATION DIVISION` with a `PROGRAM-ID`.
2. Create a `DATA DIVISION` and a `WORKING-STORAGE SECTION`.
3. Define a numeric variable to act as your loop counter (e.g., `01 WS-LOOP-COUNT PIC 9 VALUE 1.`).
4. In your `PROCEDURE DIVISION`, write a `PERFORM VARYING` loop.
5. Configure the loop to start at 1 and stop when your counter is **greater than 5**.
6. Inside the loop, `DISPLAY 'Hello from COBOL!'`.
7. End your program properly with `STOP RUN.`

**⚠️ Warning:** Watch your margins! Your `01` variable must start in Area A (Column 8), while your `PERFORM` and `DISPLAY` statements must start in Area B (Column 12).
