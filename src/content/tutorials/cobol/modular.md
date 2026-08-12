# 🧩 Modular Design: Building Reusable Blocks

Just as you might break a modern web interface down into reusable React components or extract complex logic into shared utility files to keep your codebase DRY (Don't Repeat Yourself), COBOL relies heavily on modular design. Enterprise mainframe programs can easily swell to tens of thousands of lines of code. To keep applications manageable, COBOL utilizes **Copybooks** and **Subprograms**.

---

## 1. Copybooks: The Compile-Time Injector

A Copybook is the COBOL equivalent of an `import` statement in JavaScript or an `#include` in C. It is simply a separate text file containing a snippet of COBOL code.

When you compile your program, the compiler pauses, opens the Copybook file, and physically injects all of its text directly into your source code before converting it to machine code.

**Why use them?**
Imagine you have a database of 500 fields for a Customer Profile. You don't want to type out 500 `PIC` clauses in 50 different programs. Instead, you write the layout once in a file named `CUSTREC.cpy`.

Then, in any program that needs that data, you just do this:

```cobol
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-CUSTOMER-DATA.
           COPY 'CUSTREC'.

```

_Boom! All 500 variables are instantly available in your program._

---

## 2. Subprograms (CALL): Dynamic Execution

While a Copybook just injects text, a **Subprogram** is a completely separate, independently compiled COBOL program that you execute on the fly. This is similar to calling an external API endpoint or an asynchronous utility function in a modern web app.

You trigger a subprogram using the `CALL` statement. When the called program finishes its task (like calculating complex tax logic), it returns control right back to your main program.

### Passing Data: The `LINKAGE SECTION`

To pass data between the two programs, you use `CALL ... USING`.
The "calling" program passes variables from its `WORKING-STORAGE SECTION`. The "called" subprogram receives those variables in a special area called the **`LINKAGE SECTION`**.

Crucially, the subprogram does not create new memory for these variables; it directly links to the memory of the main program (passing by reference). If the subprogram updates the data, the main program instantly sees the changes!

```cobol
       PROCEDURE DIVISION.
       MAIN-LOGIC.
           * Calling an external compiled program named CALCTAX
           * We are passing it two variables from our Working-Storage
           CALL 'CALCTAX' USING IN-AMOUNT, OUT-TAX.

```

---

## 💻 Activity: Making the Call

Let's wire up a module. Imagine you are building a financial dashboard and need to offload a heavy calculation to a dedicated math utility program.

**Your tasks:**

1. Assume you already have two variables, `NUM1` and `NUM2`, defined in your `WORKING-STORAGE SECTION`.
2. Inside your `PROCEDURE DIVISION`, write the command to trigger an external program named `'MATHPROG'`.
3. Pass both `NUM1` and `NUM2` to the external program using the `USING` clause.

**⚠️ Warning:** The `CALL` statement is an executable command, which means it must begin in **Area B** (Column 12)! Furthermore, the name of the external program you are calling must be enclosed in quotes if it is a literal string.
