# 💾 Data Types: Painting a `PICTURE` of Memory

If you are coming from languages like JavaScript or Python where variables dynamically adjust to whatever data you assign them, COBOL requires a paradigm shift. In the mainframe world, memory is strictly and precisely allocated before the program even runs.

You declare your variables in the `WORKING-STORAGE SECTION` of the `DATA DIVISION`. To tell the compiler exactly how many bytes of memory a variable needs, you use the **`PIC` (Picture)** clause. You are quite literally painting a picture of how the data looks in memory.

---

## 1. Common `PIC` Characters

COBOL uses specific symbols to define the shape and size of a variable.

- **`X` (Alphanumeric):** This is your standard String.
  - _Example:_ `PIC X(10)` allocates exactly 10 characters of space. If you store the word `"BOB"` in it, COBOL will automatically pad the remaining 7 spaces with blanks.

- **`9` (Numeric):** This is for numbers.
  - _Example:_ `PIC 9(4)` allows exactly 4 digits (e.g., `0123`). If you try to move `"A"` into this, the compiler will throw an error!

- **`V` (Implied Decimal):** To save precious memory, COBOL does not physically store the decimal point `.` character. Instead, it uses `V` to tell the compiler where the decimal _should_ be during calculations.
  - _Example:_ `PIC 9(3)V99` represents a number like `999.99`. It only takes up 5 bytes of storage, but the compiler knows the last two digits are cents.

- **`S` (Signed):** If a number can be negative, you must include an `S`. If you omit the `S`, COBOL will automatically convert negative numbers to their absolute (positive) values!
  - _Example:_ `PIC S9(4)` allows for `-1234`.

---

## 2. Computational Usage (`COMP`)

By default, COBOL stores numbers as human-readable text (known as `USAGE IS DISPLAY`). For example, the number `12` is stored as the character `"1"` and the character `"2"`.

While this makes data easy to read in a raw file, it is incredibly inefficient for doing math. Before the CPU can add two text numbers together, it has to convert them to binary, do the math, and convert them back. To solve this, we use `COMP` (Computational) formats:

- **`COMP` (or `COMP-4`):** Stores the number in pure machine binary. It is incredibly fast for standard integer math and loop counters.
- **`COMP-3` (Packed Decimal):** The legendary secret weapon of mainframe banking! It compresses two digits into a single byte of memory, leaving the final half-byte to store the `+` or `-` sign. It is highly space-efficient and prevents the floating-point rounding errors common in modern languages. If you are dealing with money in COBOL, you are using `COMP-3`.

---

## 3. Sample Program: Banking Account Record

Here is a complete, working COBOL program illustrating the declaration and manipulation of text, numeric, binary, and packed decimal data types:

```cobol
      *----------------------------------------------------------------*
      * PROGRAM:    DATATYPES-DEMO                                     *
      * PURPOSE:    DEMONSTRATE PIC CLAUSES & USAGE COMP-3             *
      *----------------------------------------------------------------*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. DATATYPES-DEMO.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
      * Standard alphanumeric string
       01  WS-CUSTOMER-NAME   PIC X(20) VALUE 'ALICE SMITH'.

      * Integer identifier
       01  WS-ACCOUNT-ID      PIC 9(08) VALUE 10023456.

      * High-precision signed packed decimal currency (COMP-3)
       01  WS-CURRENT-BAL     PIC S9(7)V99 COMP-3 VALUE +15000.75.
       01  WS-TRANSACTION-AMT PIC S9(5)V99 COMP-3 VALUE +00250.50.
       01  WS-NEW-BAL         PIC S9(7)V99 COMP-3.

      * Formatted display field for human-readable output
       01  WS-DISP-BAL        PIC Z,ZZZ,ZZ9.99-.

       PROCEDURE DIVISION.
       000-MAIN.
           DISPLAY 'CUSTOMER : ' WS-CUSTOMER-NAME.
           DISPLAY 'ACCT ID  : ' WS-ACCOUNT-ID.

           ADD WS-CURRENT-BAL TO WS-TRANSACTION-AMT 
               GIVING WS-NEW-BAL.

           MOVE WS-NEW-BAL TO WS-DISP-BAL.
           DISPLAY 'UPDATED BAL: $' WS-DISP-BAL.

           STOP RUN.
```

---

## 💻 Activity: Declaring Your Data

Let's allocate some memory! In the editor on the right, you are going to define a customer profile.

**Your tasks:**

1. Set up the `IDENTIFICATION DIVISION.` and `PROGRAM-ID. DATA-TYPES.`.
2. Set up the `DATA DIVISION` header.
3. Inside it, create the `WORKING-STORAGE SECTION` header.
4. Declare a top-level variable for a name using: `01 CUSTOMER-NAME PIC X(20).`
5. Declare a highly precise, bank-ready variable for money using: `01 ACCOUNT-BAL PIC S9(5)V99 COMP-3.`
6. In the `PROCEDURE DIVISION.`, display the variables and end with `STOP RUN.`.

**Sample Code to Start With:**

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. DATA-TYPES.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 CUSTOMER-NAME PIC X(20).
       01 ACCOUNT-BAL   PIC S9(5)V99 COMP-3.

       PROCEDURE DIVISION.
       100-MAIN.
           MOVE 'JOHN DOE' TO CUSTOMER-NAME.
           MOVE 1250.75 TO ACCOUNT-BAL.
           DISPLAY 'NAME: ' CUSTOMER-NAME.
           DISPLAY 'BAL:  ' ACCOUNT-BAL.
           STOP RUN.
```

**⚠️ Warning:** Remember your margins!

- Headers and the `01` level numbers MUST start in **Area A** (Column 8).
- The variable names (`CUSTOMER-NAME`) and their `PIC` clauses MUST start in **Area B** (Column 12).
- Do not forget the period `.` at the very end of your variable declarations!
