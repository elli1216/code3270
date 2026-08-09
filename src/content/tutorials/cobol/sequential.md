# Sequential File Handling

Mainframes process massive amounts of data in batch via files. COBOL makes file handling straightforward.

## The 3 Steps to File Processing
1. **ENVIRONMENT DIVISION (SELECT/ASSIGN)**: Maps a logical file name to a physical system name (or JCL DD name).
   ```cobol
   SELECT IN-FILE ASSIGN TO INFILE.
   ```
2. **DATA DIVISION (FD - File Description)**: Defines the layout of the record inside the file.
   ```cobol
   FD IN-FILE.
   01 IN-RECORD PIC X(80).
   ```
3. **PROCEDURE DIVISION**: OPEN, READ, WRITE, CLOSE.

## Reading a File
```cobol
OPEN INPUT IN-FILE.
READ IN-FILE
    AT END MOVE 'Y' TO EOF-FLAG
    NOT AT END DISPLAY IN-RECORD
END-READ.
CLOSE IN-FILE.
```

## Activity
Write an `OPEN INPUT` statement for a file named `CUST-FILE`. Then write a `CLOSE CUST-FILE.` statement.
