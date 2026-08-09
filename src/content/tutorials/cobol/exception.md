# Exception Management

When dealing with files and databases, errors happen. COBOL uses **File Status Codes** to tell you exactly what went wrong.

## File Status Codes
In your SELECT statement, you attach a status variable:
```cobol
SELECT MY-FILE ASSIGN TO MYFILE
       FILE STATUS IS WS-FILE-STATUS.
```
Where `WS-FILE-STATUS` is a `PIC X(2)` variable.

Common Codes:
- `00`: Success!
- `10`: End of File (EOF) reached.
- `22`: Duplicate Key (tried to write a record that already exists).
- `23`: Record Not Found.

## Declaratives
For global error handling, COBOL provides the `DECLARATIVES` section at the very top of the Procedure Division. It acts like a global try-catch block for file errors.

## Activity
Write an `IF` statement checking if `WS-FILE-STATUS` equals `'22'`. If it does, display 'Duplicate Key Error!'.
