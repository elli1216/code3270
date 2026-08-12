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

## 💻 Activity: Catch the Duplicate

Let's practice checking file status codes manually. Imagine you just tried to write a new user to the system, and you need to verify if the write was successful or if the user already exists.

**Your tasks:**

1. Assume the variable `WS-FILE-STATUS` has just been updated by a `WRITE` statement.
2. Construct an `IF` statement to check if `WS-FILE-STATUS` is equal to `'22'`.
3. Inside the `IF` block, use `DISPLAY` to print `"Duplicate Key Error!"`.
4. Close your logical block properly with the `END-IF.` scope terminator.

**⚠️ Warning:** Because `WS-FILE-STATUS` is defined as `PIC X(2)` (an alphanumeric string), the value `22` is treated as text, not a number! You must wrap the `22` in quotes in your `IF` condition. Also, ensure your logic starts in **Area B** (Column 12)!
