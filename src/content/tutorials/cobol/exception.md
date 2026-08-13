# 🚨 Exception Management: Handling the Unexpected

In the mainframe world, batch jobs can process millions of records and run for hours. If a program crashes halfway through because it couldn't find a record, it is a massive headache! To prevent this, COBOL provides robust ways to intercept and handle errors before they bring down your application.

Unlike modern languages that "throw exceptions" (like a `try-catch` block in JavaScript or Python), COBOL handles file errors passively using **File Status Codes**.

---

## 1. File Status Codes: The Silent Messengers

Whenever COBOL attempts to read, write, or open a file, it doesn't loudly crash if it fails. Instead, it quietly updates a specific 2-character variable with a status code. It is up to you, the programmer, to check that variable immediately after the file operation.

You link this status variable to your file in the `ENVIRONMENT DIVISION` using the `FILE STATUS` clause:

```cobol
       FILE-CONTROL.
           SELECT MY-FILE ASSIGN TO MYFILE
                  FILE STATUS IS WS-FILE-STATUS.
```

_(Note: `WS-FILE-STATUS` must be declared in your `WORKING-STORAGE SECTION` as a 2-byte string: `01 WS-FILE-STATUS PIC X(2).`)_

### The Most Common Codes

Here are the essential codes you will encounter when dealing with files (especially indexed VSAM files):

- **`00` (Success):** The operation worked perfectly.
- **`10` (End of File - EOF):** You tried to read, but there are no more records left in the file. This is exactly how you know when to stop your `PERFORM` loops!
- **`22` (Duplicate Key):** You attempted to write a record with a primary key that already exists in the database.
- **`23` (Record Not Found):** You tried to read a specific record by its primary key, but it doesn't exist.

---

## 2. Declaratives: The Global Try-Catch

Checking the `WS-FILE-STATUS` manually after _every single_ read or write command can make your code very repetitive and messy. For global error handling, COBOL offers the `DECLARATIVES` section.

Placed at the very top of the `PROCEDURE DIVISION`, `DECLARATIVES` act like a global event listener. If a file operation fails anywhere in your program, COBOL will automatically pause your main logic, jump up to the `DECLARATIVES` section to run your error-handling code, and then gracefully return to where it left off.

```cobol
       PROCEDURE DIVISION.
       DECLARATIVES.
       FILE-ERROR-HANDLER SECTION.
           USE AFTER STANDARD ERROR PROCEDURE ON MY-FILE.
           DISPLAY 'A critical file error occurred: ' WS-FILE-STATUS.
       END DECLARATIVES.

       MAIN-LOGIC SECTION.
           * Your normal, day-to-day program logic starts down here...
```

---

## 3. Sample Program: File Status Analyzer & Error Trap

Here is a complete, runnable COBOL program demonstrating how to intercept and handle status codes:

```cobol
      *----------------------------------------------------------------*
      * PROGRAM:    EXCEPTION-DEMO                                     *
      * PURPOSE:    DEMONSTRATE FILE STATUS CODE EVALUATION & TRAPPING *
      *----------------------------------------------------------------*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. EXCEPTION-DEMO.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT ACCT-FILE ASSIGN TO ACCTFILE
                  ORGANIZATION IS INDEXED
                  ACCESS MODE IS RANDOM
                  RECORD KEY IS AF-KEY
                  FILE STATUS IS WS-FILE-STATUS.

       DATA DIVISION.
       FILE SECTION.
       FD  ACCT-FILE.
       01  AF-RECORD.
           05 AF-KEY       PIC 9(05).
           05 AF-DATA      PIC X(50).

       WORKING-STORAGE SECTION.
       01  WS-FILE-STATUS  PIC X(02) VALUE '00'.

       PROCEDURE DIVISION.
       000-MAIN.
      * Simulate checking status after a file operation
           MOVE '22' TO WS-FILE-STATUS.

           DISPLAY 'CURRENT STATUS CODE: ' WS-FILE-STATUS.

           EVALUATE WS-FILE-STATUS
               WHEN '00'
                   DISPLAY 'OPERATION COMPLETED SUCCESSFULLY (RC 00)'
               WHEN '10'
                   DISPLAY 'END OF FILE REACHED (EOF)'
               WHEN '22'
                   DISPLAY 'ERROR: DUPLICATE PRIMARY KEY DETECTED!'
               WHEN '23'
                   DISPLAY 'ERROR: REQUESTED RECORD DOES NOT EXIST.'
               WHEN OTHER
                   DISPLAY 'UNEXPECTED I/O ERROR: ' WS-FILE-STATUS
           END-EVALUATE.

           STOP RUN.
```

---

## 💻 Activity: Catch the Duplicate

Let's practice checking file status codes manually. Imagine you just tried to write a new user to the system, and you need to verify if the write was successful or if the user already exists.

**Your tasks:**

1. Create your `IDENTIFICATION DIVISION.` with `PROGRAM-ID. EXCEPTION-APP.`.
2. In `WORKING-STORAGE SECTION`, declare `01 WS-FILE-STATUS PIC X(02) VALUE '22'.`.
3. In `PROCEDURE DIVISION.`, construct an `IF` statement to check if `WS-FILE-STATUS = '22'`.
4. Inside the `IF` block, `DISPLAY 'Duplicate Key Error!'`.
5. Close the block with `END-IF.` and terminate with `STOP RUN.`

**Sample Code to Start With:**

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. EXCEPTION-APP.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-FILE-STATUS PIC X(02) VALUE '22'.

       PROCEDURE DIVISION.
       100-MAIN.
           IF WS-FILE-STATUS = '22'
               DISPLAY 'Duplicate Key Error!'
           END-IF.
           STOP RUN.
```

**⚠️ Warning:** Because `WS-FILE-STATUS` is defined as `PIC X(2)` (an alphanumeric string), the value `22` is treated as text, not a number! You must wrap the `22` in quotes in your `IF` condition. Also, ensure your logic starts in **Area B** (Column 12)!
