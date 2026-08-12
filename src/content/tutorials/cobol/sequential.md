# 📁 Sequential File Handling: The Mainframe's Bread and Butter

Unlike modern web applications that fetch small JSON payloads via REST APIs, mainframes were built to do one thing exceptionally well: process massive, sequential flat files containing millions of records in a single batch run.

To achieve this, COBOL uses a very specific, 3-step pipeline to handle files safely and efficiently.

---

## The 3 Steps to File Processing

To read or write a file, you must declare it in three different Divisions of your program.

### 1. ENVIRONMENT DIVISION (The Mapping)

Before you can read a file, you have to tell COBOL where it lives. You do this using the `SELECT ... ASSIGN` statement.

This step bridges the gap between your logical COBOL code and the physical mainframe operating system.

```cobol
       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT IN-FILE ASSIGN TO INFILE.

```

- **`IN-FILE`**: This is the internal name you will use inside your COBOL code.
- **`INFILE`**: This is the external system name. On a mainframe, this isn't a file path like `C:/data.txt`; it perfectly matches a **JCL `DD` name** that we define when running the job!

### 2. DATA DIVISION (The Buffer)

Next, you must define the physical layout of the file using an `FD` (File Description) indicator. This acts as a memory buffer. When you read a file, COBOL loads exactly one line (record) from the disk into this specific memory slot.

```cobol
       DATA DIVISION.
       FILE SECTION.
       FD  IN-FILE.
       01  IN-RECORD PIC X(80).

```

_(Notice that `FD` starts in Area A, just like an `01` level variable!)_

### 3. PROCEDURE DIVISION (The Action)

Finally, you manipulate the file using four main verbs: `OPEN`, `READ`, `WRITE`, and `CLOSE`.

When reading a file sequentially (line by line), you must tell COBOL what to do when it runs out of lines to read. We handle this using the `AT END` clause.

```cobol
       PROCEDURE DIVISION.
       PROCESS-FILE.
           OPEN INPUT IN-FILE.

           READ IN-FILE
               AT END
                   MOVE 'Y' TO EOF-FLAG
               NOT AT END
                   DISPLAY 'Read Record: ' IN-RECORD
           END-READ.

           CLOSE IN-FILE.

```

- **`OPEN INPUT`**: Opens the file strictly for reading (Read-Only mode). If you wanted to write to it, you would use `OPEN OUTPUT`.
- **`AT END`**: The built-in EOF (End of File) detector. This is how you prevent your program from crashing when it reaches the bottom of the dataset.

---

## 💻 Activity: Open and Close the Vault

Let's practice the procedural commands for file handling. Imagine you have already defined a file named `CUST-FILE` in your Environment and Data divisions.

**Your tasks:**

1. In the `PROCEDURE DIVISION`, write the command to open `CUST-FILE` for reading (Input mode).
2. Write the command to gracefully close `CUST-FILE` to release the memory lock.

**⚠️ Warning:** Both `OPEN` and `CLOSE` are action verbs! They must begin in **Area B** (Column 12) of your editor. Never forget to close a file when you are done with it; leaving files open can lock out other programs trying to access the same dataset!
