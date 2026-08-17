# ➕ Arithmetic Operations

COBOL provides a rich set of arithmetic operations that reflect its English-like syntax. While modern languages rely on symbols like `+` and `-`, traditional COBOL uses explicit verbs: `ADD`, `SUBTRACT`, `MULTIPLY`, and `DIVIDE`. For more complex formulas, it provides the powerful `COMPUTE` verb.

---

## 1. Basic Arithmetic Verbs

### ADD

Adds two or more numbers together and stores the result.

```cobol
       ADD 10 TO WS-TOTAL.
       ADD WS-CASH, 20 TO WS-TOTAL, WS-WAGE.
       ADD MALES TO FEMALES GIVING TOTAL-STUDENTS.
```

_Notice how `GIVING` places the result in a new variable without modifying the original numbers._

### SUBTRACT

Subtracts one or more numbers from another.

```cobol
       SUBTRACT TAX FROM GROSS-PAY GIVING NET-PAY.
       SUBTRACT TAX, 80 FROM TOTAL.
```

### MULTIPLY

Multiplies two numbers.

```cobol
       MULTIPLY 10 BY MAGNITUDE.
       MULTIPLY MEMBERS BY SUBS GIVING TOTAL-SUBS.
```

### DIVIDE

Divides numbers, optionally keeping the remainder.

```cobol
       DIVIDE 201 BY 10 GIVING QUOTIENT REMAINDER REMAIN.
       DIVIDE TOTAL BY MEMBERS GIVING AVERAGE ROUNDED.
```

---

## 2. The COMPUTE Verb

For complex mathematical formulas, chaining `ADD` and `MULTIPLY` can become tedious. `COMPUTE` allows you to use standard mathematical operators (`+`, `-`, `*`, `/`, `**` for exponentiation).

```cobol
       COMPUTE VAT-AMOUNT = PRODUCT-COST * VAT-RATE.
       COMPUTE IRISH-PRICE = STERLING-PRICE / RATE * 100.
```

_`COMPUTE` evaluates the entire expression on the right and assigns it to the variable on the left._

---

## 3. Precision and Error Handling

COBOL is heavily used in finance, so exact precision is mandatory.

### ROUNDED

If a calculation results in more decimal places than the receiving variable can hold, COBOL truncates it by default. Adding `ROUNDED` will mathematically round the final digit (adding 1 if the truncated value is 5 or greater).

```cobol
       DIVIDE TOTAL BY MEMBERS GIVING AVERAGE ROUNDED.
```

### ON SIZE ERROR

A size error occurs when the result of a calculation is too large (has too many significant digits on the left) to fit into the receiving variable. You can catch this using `ON SIZE ERROR`.

```cobol
       MULTIPLY SUBS BY MEMBERS GIVING TOTAL-SUBS
           ON SIZE ERROR
               DISPLAY 'ERROR: Calculation exceeded memory limits!'.
```

---

---

## 📚 Glossary of Clauses & Reserved Words

- **`ADD ... TO`**: A verb used to add numbers and store the result in the target variable.
- **`SUBTRACT ... FROM`**: A verb used to subtract numbers.
- **`MULTIPLY ... BY`**: A verb used to multiply two numbers.
- **`DIVIDE ... BY`**: A verb used to divide two numbers.
- **`GIVING`**: A clause used with arithmetic verbs to place the final calculated result into a specific receiving variable without modifying the original numbers.
- **`REMAINDER`**: A clause used with DIVIDE to capture the mathematical remainder of the division.
- **`COMPUTE`**: A powerful verb used to evaluate complex mathematical expressions (using `+`, `-`, `*`, `/`, `**`) and assign the result.
- **`ROUNDED`**: A clause that mathematically rounds the final calculation to fit the receiving variable's precision.
- **`ON SIZE ERROR`**: A conditional clause that triggers if a calculation's result exceeds the memory allocated for the receiving variable.

---

## 💻 Activity: Calculate the Invoice

Let's calculate a final invoice amount using COBOL arithmetic!

**Your tasks:**

1. Setup the `IDENTIFICATION DIVISION` and `PROGRAM-ID. INVOICE-CALC.`.
2. In the `WORKING-STORAGE SECTION`, define:
   - `01 WS-SUBTOTAL PIC 9(4)V99 VALUE 1500.50.`
   - `01 WS-TAX-RATE PIC V99 VALUE .08.`
   - `01 WS-TAX-AMT  PIC 9(3)V99.`
   - `01 WS-TOTAL    PIC 9(5)V99.`
3. In the `PROCEDURE DIVISION`, compute the tax: `MULTIPLY WS-SUBTOTAL BY WS-TAX-RATE GIVING WS-TAX-AMT ROUNDED.`
4. Compute the final total: `ADD WS-SUBTOTAL TO WS-TAX-AMT GIVING WS-TOTAL.`
5. `DISPLAY` the `WS-TAX-AMT` and `WS-TOTAL`.
6. End with `STOP RUN.`.

**Sample Code to Start With:**

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. INVOICE-CALC.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-SUBTOTAL PIC 9(4)V99 VALUE 1500.50.
       01 WS-TAX-RATE PIC V99 VALUE .08.
       01 WS-TAX-AMT  PIC 9(3)V99.
       01 WS-TOTAL    PIC 9(5)V99.

       PROCEDURE DIVISION.
       100-MAIN.
           MULTIPLY WS-SUBTOTAL BY WS-TAX-RATE GIVING WS-TAX-AMT ROUNDED.
           ADD WS-SUBTOTAL TO WS-TAX-AMT GIVING WS-TOTAL.

           DISPLAY 'TAX AMOUNT: ' WS-TAX-AMT.
           DISPLAY 'FINAL TOTAL: ' WS-TOTAL.

           STOP RUN.
```
