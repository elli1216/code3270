# 🏛️ COBOL Anatomy: The Structure of a Program

Welcome to COBOL! If you are used to modern, free-flowing languages, COBOL might feel a bit rigid at first. However, there is a brilliant logic to it: COBOL was designed in 1959 to read like a highly structured English document.

Every single COBOL program is built using a strict hierarchy, starting with **four major Divisions**. You can think of these as the primary chapters of a book. They must always appear in this exact order.

---

## 1. The 4 Divisions

### IDENTIFICATION DIVISION

This is the metadata of your program. It tells the compiler (and other programmers) who wrote the code and what it is called.

- **Required Paragraph:** The only strictly mandatory line here is `PROGRAM-ID`, which assigns the official name to your compiled program.

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO-W.
       AUTHOR. Z-PLAYGROUND.
```

### ENVIRONMENT DIVISION

This is where your program talks to the outside world. Think of it like your configuration files or environment variables. It maps the internal program logic to the physical mainframe hardware, such as assigning a file variable to a physical dataset path on the system.

```cobol
       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT IN-FILE ASSIGN TO 'DATAIN'.
```

### DATA DIVISION

COBOL does not have dynamic variables; you must declare absolutely everything upfront. The `DATA DIVISION` is where you define all your variables, file structures, and state.

```cobol
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-GREETING    PIC X(20) VALUE 'Welcome to Mainframe'.
```

### PROCEDURE DIVISION

This is the heart of your program! The `PROCEDURE DIVISION` contains all the executable logic, algorithms, and code. This is where you manipulate the data you defined in the `DATA DIVISION`.

```cobol
       PROCEDURE DIVISION.
       MAIN-LOGIC.
           DISPLAY WS-GREETING.
           STOP RUN.
```

---

## 2. The Golden Rule: Fixed Columns

Because COBOL was originally written on physical cardboard punch cards, the language is entirely **positional**. The column where a character sits is just as important as the character itself.

- **Columns 1-6 (Sequence Numbers):** Historically used to number punch cards in case they were dropped. Today, modern compilers largely ignore this space, but you must leave it blank.
- **Column 7 (Indicator Area):** Used for special system characters. The most common is an asterisk (`*`) to denote a comment line.
- **Columns 8-11 (Area A):** The **Structural** area. Division headers, Section headers, and Paragraph names MUST start here.
- **Columns 12-72 (Area B):** The **Action** area. All procedural statements (`DISPLAY`, `MOVE`, `ADD`) MUST start here.

### The Column Ruler

To help you visualize, here is how a standard COBOL layout looks against a column ruler:

```text
----+--*A---B------------------------------------------------------------
       IDENTIFICATION DIVISION.            <-- Starts in Area A (Col 8)
       PROGRAM-ID. MYPROG.                 <-- Starts in Area A (Col 8)

       PROCEDURE DIVISION.                 <-- Starts in Area A (Col 8)
       MAIN-PARA.                          <-- Starts in Area A (Col 8)
           DISPLAY 'I AM IN AREA B!'.      <-- Starts in Area B (Col 12)
           STOP RUN.                       <-- Starts in Area B (Col 12)
```

> **The Mighty Period:** Notice how structural headers and paragraphs end with a period (`.`)? In COBOL, the period is a hard structural terminator. Do not forget it at the end of your `PROGRAM-ID` or your paragraph definitions!

---

## 3. Sample Program: Complete Four-Division Template

Here is a complete, runnable COBOL program bringing all four divisions together into a unified, production-ready structure:

```cobol
      *----------------------------------------------------------------*
      * PROGRAM:    ANATOMY-DEMO                                       *
      * PURPOSE:    DEMONSTRATE COMPLETE 4-DIVISION STRUCTURE          *
      *----------------------------------------------------------------*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. ANATOMY-DEMO.
       AUTHOR. CODE3270.

       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       SOURCE-COMPUTER. IBM-Z16.
       OBJECT-COMPUTER. IBM-Z16.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-APP-NAME     PIC X(15) VALUE 'CODE3270 LAB'.
       01  WS-VERSION      PIC 9(02) VALUE 01.

       PROCEDURE DIVISION.
       000-MAIN-LOGIC.
           DISPLAY '===================================='.
           DISPLAY 'STARTING EXECUTION OF: ' WS-APP-NAME.
           DISPLAY 'VERSION: ' WS-VERSION.
           DISPLAY 'HELLO FROM FULLY STRUCTURED COBOL!'.
           DISPLAY '===================================='.
           STOP RUN.
```

---

---

## 📚 Glossary of Clauses & Reserved Words

- **`IDENTIFICATION DIVISION`**: The mandatory first division; contains program metadata.
- **`PROGRAM-ID`**: Identifies the compiled name of the program.
- **`ENVIRONMENT DIVISION`**: The second division; links the program to the physical environment and hardware.
- **`DATA DIVISION`**: The third division; where all memory and variables are allocated.
- **`WORKING-STORAGE SECTION`**: A section within the Data Division for declaring temporary variables.
- **`PROCEDURE DIVISION`**: The final division; contains the actual executable logic and algorithms.
- **`DISPLAY`**: A verb used to print output to the console or screen.
- **`STOP RUN`**: A statement that gracefully terminates program execution and returns control to the operating system.

---

## 💻 Activity: Your First Program

It is time to write your first program. In the editor on the right, construct a complete `HELLO-WORLD` script.

**Your tasks:**

1. Create the `IDENTIFICATION DIVISION` and assign a `PROGRAM-ID. HELLO-WORLD.`.
2. Skip the Environment and Data divisions for now (they are optional if you aren't using variables or files).
3. Create the `PROCEDURE DIVISION.`
4. Create a main paragraph (e.g., `100-MAIN.`).
5. Inside that paragraph, use the `DISPLAY` statement to print `'HELLO WORLD!'` to the console.
6. Gracefully end your program using the `STOP RUN.` command.

**Sample Code to Start With:**

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO-WORLD.
       PROCEDURE DIVISION.
       100-MAIN.
           DISPLAY 'HELLO WORLD!'.
           STOP RUN.
```

**⚠️ Warning:** Pay strict attention to Area A (Column 8) and Area B (Column 12)! If your `DISPLAY` statement starts in Area A, the compiler will fail!
