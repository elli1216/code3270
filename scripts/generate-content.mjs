import fs from 'node:fs';
import path from 'node:path';

const jclContent = {
  foundations: `# JCL Foundations

Welcome to Job Control Language (JCL)! JCL is the scripting language used on IBM mainframe systems to instruct the operating system (z/OS) on how to run a batch job or start a subsystem.

## The Core Statements
Every JCL job requires at least these three types of statements:
1. **JOB**: Identifies the job to the system, provides accounting info, and sets job-level parameters.
2. **EXEC**: Specifies the program (or procedure) to be executed. A job can have multiple EXEC statements (each called a "step").
3. **DD (Data Definition)**: Allocates datasets (files) or system resources that the program requires.

## Syntax Rules
- **Prefix**: Every JCL statement (except data) MUST start with \`//\` in columns 1 and 2.
- **Name Field**: Starts in column 3. Max 8 characters (letters, numbers, @, #, $).
- **Operation Field**: (JOB, EXEC, DD) separated from the name by at least one space.
- **Operand Field**: Parameters separated from the operation by at least one space.

## Activity
Write a basic Job that executes the dummy program \`IEFBR14\`.
1. Name the job \`MYJOB\` with \`JOB (123),'USER',CLASS=A,MSGCLASS=X\`.
2. Name the step \`STEP1\` executing \`IEFBR14\`.
`,
  conditional: `# Conditional Execution in JCL

Often, you want a step to run only if the previous steps succeeded (or failed). JCL provides two primary ways to do this: the older \`COND\` parameter and the modern \`IF/THEN/ELSE\` constructs.

## Return Codes (Condition Codes)
When a program finishes, it issues a return code (RC). 
- \`0\`: Perfect success
- \`4\`: Warning
- \`8\`: Error
- \`12\`: Severe Error

## IF/THEN/ELSE
Modern JCL uses an IF statement which is much easier to read:
\`\`\`jcl
//STEP1   EXEC PGM=PROGA
//IF1     IF (STEP1.RC <= 4) THEN
//STEP2   EXEC PGM=PROGB
//ENDIF   ENDIF
\`\`\`

## Activity
Your code contains a \`STEP1\` executing \`IEFBR14\`. 
Add an \`IF/THEN\` block so that \`STEP2\` (executing \`PROGB\`) only runs if \`STEP1.RC = 0\`. Don't forget the \`ENDIF\`.
`,
  utilities: `# System Utilities

Mainframes come with built-in utility programs to perform common file and data operations without writing custom code.

## Essential Utilities
- **IEFBR14**: A dummy program that does nothing and returns 0. Useful for allocating or deleting datasets using just JCL DD statements.
- **IEBGENER**: Used to copy sequential datasets, or copy members of a partitioned dataset.
- **IDCAMS**: Used to define and manage VSAM datasets.
- **SORT (DFSORT/Syncsort)**: Extremely powerful utility for sorting, merging, and filtering data.

## Activity
Let's use \`IEBGENER\`.
Write a job step named \`COPYSTEP\` executing \`IEBGENER\`.
It requires four DD statements:
- \`SYSUT1\`: The input (can be \`DD DUMMY\`)
- \`SYSUT2\`: The output (can be \`DD SYSOUT=*\`)
- \`SYSPRINT\`: For logs (use \`DD SYSOUT=*\`)
- \`SYSIN\`: For control cards (use \`DD DUMMY\`)
`,
  advanced: `# Advanced JCL Capabilities

As you process daily batches of data, you need ways to handle files that change every day without rewriting your JCL.

## Generation Data Groups (GDGs)
A GDG is a group of chronologically related datasets. Instead of hardcoding a date in a filename (like \`SALES.DATA.D231015\`), you use relative generation numbers!
- \`(0)\`: The current/latest version.
- \`(-1)\`: Yesterday's version.
- \`(+1)\`: Creating tomorrow's new version!

Example creating a new GDG version:
\`\`\`jcl
//OUTDD DD DSN=MY.DATA.GDG(+1),DISP=(NEW,CATLG,DELETE)
\`\`\`

## Activity
Create a DD statement named \`NEWDATA\` that allocates a new generation \`(+1)\` for the dataset \`PROD.DAILY.TRANS\`. Set the disposition to \`(NEW,CATLG,DELETE)\`.
`,
  flexibility: `# Flexibility & Versioning

Instead of writing the same JCL over and over, you can package JCL into a **Procedure (PROC)**. 

## PROCs
A PROC is a block of JCL that can be invoked multiple times. They can be stored in a system library (Cataloged) or defined at the top of your job (Instream).

## Symbolic Parameters
You can make PROCs flexible by using variables, known as Symbolic Parameters, prefixed with an ampersand (\`&\`).
\`\`\`jcl
//MYPROC PROC ENV='DEV'
//STEP1  EXEC PGM=MYPGM
//FILE1  DD DSN=APP.&ENV..DATA,DISP=SHR
//       PEND
\`\`\`
If you execute this PROC with \`// EXEC MYPROC,ENV='PROD'\`, the dataset resolves to \`APP.PROD.DATA\`.

## Activity
Write an instream PROC named \`BACKUP\` with one parameter \`LVL\`. Inside, have an EXEC step that runs \`IEBGENER\`.
`,
  resilience: `# Resilience & Recovery

When a batch job containing 50 steps fails at step 45, you don't want to rerun the entire job! 

## The RESTART Parameter
You can tell z/OS to begin execution at a specific step by adding the \`RESTART\` parameter directly to the \`JOB\` statement.

\`\`\`jcl
//MYJOB JOB (123),'USER',RESTART=STEP45
\`\`\`

If a step is inside a PROC, you use dot notation: \`RESTART=STEP45.PROCSTEP2\`.

## Activity
You have a job with \`STEP1\`, \`STEP2\`, and \`STEP3\`. 
Add a \`RESTART=STEP2\` parameter to the JOB statement so the system skips \`STEP1\`.
`
};

const cobolContent = {
  anatomy: `# COBOL Anatomy

Welcome to COBOL! Every COBOL program is strictly structured into four major "Divisions".

## The 4 Divisions
1. **IDENTIFICATION DIVISION**: Contains metadata. The only strictly required paragraph here is \`PROGRAM-ID\`.
2. **ENVIRONMENT DIVISION**: Maps the program to the physical computer environment (files to actual system paths).
3. **DATA DIVISION**: Declares all variables, files, and structures used in the program.
4. **PROCEDURE DIVISION**: Contains the actual executable logic and code.

## Fixed Columns
COBOL is a positional language!
- **Columns 1-6**: Sequence numbers (ignored usually).
- **Column 7**: Indicator area (\`*\` for comment).
- **Columns 8-11 (Area A)**: Division headers, Section headers, Paragraph names, and 01/77 levels MUST start here.
- **Columns 12-72 (Area B)**: All procedural statements (DISPLAY, MOVE, ADD) MUST start here.

## Activity
Write a complete \`HELLO-WORLD\` program. Include the IDENTIFICATION and PROCEDURE divisions. Use the \`DISPLAY\` statement to print a message, and end with \`STOP RUN.\`
Pay strict attention to Area A and Area B rules!
`,
  datatypes: `# Data Types (PIC & COMP)

Variables in COBOL are declared in the \`WORKING-STORAGE SECTION\` of the \`DATA DIVISION\`. You define the exact size and type of variables using the \`PIC\` (Picture) clause.

## Common PIC Characters
- \`X\`: Alphanumeric (String). e.g., \`PIC X(10)\` is a 10-char string.
- \`9\`: Numeric. e.g., \`PIC 9(4)\` is a 4-digit number.
- \`V\`: Implied decimal point. e.g., \`PIC 9(3)V99\` is 999.99 (uses 5 bytes of storage).
- \`S\`: Signed number. e.g., \`PIC S9(4)\`.

## Computational Usage (COMP)
By default, numbers are stored as human-readable text (DISPLAY). To do math efficiently, use binary or packed decimal formats:
- \`COMP\` or \`COMP-4\`: Binary format.
- \`COMP-3\`: Packed Decimal format (compresses two digits into one byte). Highly used in financial systems!

## Activity
Define a \`WORKING-STORAGE SECTION\`. 
Create a variable \`01 CUSTOMER-NAME PIC X(20).\`
Create a variable \`01 ACCOUNT-BAL PIC S9(5)V99 COMP-3.\`
`,
  controlflow: `# Control Flow

COBOL provides powerful ways to handle logic and loops.

## IF Statements
\`\`\`cobol
IF ACCOUNT-BAL > 1000
    DISPLAY 'High Balance'
ELSE
    DISPLAY 'Normal Balance'
END-IF.
\`\`\`

## EVALUATE (Switch/Case)
\`\`\`cobol
EVALUATE TRUE
    WHEN AGE < 18
        DISPLAY 'Minor'
    WHEN OTHER
        DISPLAY 'Adult'
END-EVALUATE.
\`\`\`

## PERFORM (Loops)
The \`PERFORM\` statement is used for loops and calling paragraphs (like functions).
\`\`\`cobol
PERFORM VARYING COUNTER FROM 1 BY 1 UNTIL COUNTER > 10
    DISPLAY 'Count: ' COUNTER
END-PERFORM.
\`\`\`

## Activity
Write a \`PERFORM\` loop that loops exactly 5 times. Inside the loop, \`DISPLAY 'Hello'\`.
`,
  tables: `# Table Handling (Arrays)

In COBOL, arrays are called **Tables**, and they are defined using the \`OCCURS\` clause in the Data Division.

## Defining a Table
\`\`\`cobol
01 MONTH-TABLE.
   05 MONTH-NAME PIC X(10) OCCURS 12 TIMES.
\`\`\`
*(Note: COBOL tables are 1-indexed! The first element is MONTH-NAME(1))*

## Searching a Table
COBOL has built-in search functions! 
- \`SEARCH\`: A linear sequential search.
- \`SEARCH ALL\`: A highly optimized binary search (requires the table to be sorted and have keys).

To use \`SEARCH\`, you must define an index:
\`\`\`cobol
05 MONTH-NAME PIC X(10) OCCURS 12 TIMES INDEXED BY IDX.
\`\`\`

## Activity
Define an \`OCCURS 5 TIMES\` table named \`DAYS\`. In the Procedure division, move a value into the first index: \`MOVE 'MONDAY' TO DAYS(1).\`
`,
  modular: `# Modular Design (Copybooks)

Enterprise COBOL programs can be massive. To keep code manageable, COBOL uses Copybooks and Subprograms.

## Copybooks
A Copybook is simply a text file containing COBOL code (usually Data Division layouts) that is physically injected into your program during compilation.
\`\`\`cobol
COPY 'CUSTREC'. 
\`\`\`
This pulls the code from a file named CUSTREC.cpy directly into your program.

## Subprograms (CALL)
You can call separate, compiled COBOL programs using the \`CALL\` statement.
Data is passed between programs using the \`LINKAGE SECTION\`.
\`\`\`cobol
CALL 'CALCTAX' USING IN-AMOUNT, OUT-TAX.
\`\`\`

## Activity
In your \`PROCEDURE DIVISION\`, write a statement to \`CALL 'MATHPROG' USING NUM1, NUM2.\` 
Make sure you understand that \`NUM1\` and \`NUM2\` must be defined in the \`WORKING-STORAGE SECTION\`.
`,
  sequential: `# Sequential File Handling

Mainframes process massive amounts of data in batch via files. COBOL makes file handling straightforward.

## The 3 Steps to File Processing
1. **ENVIRONMENT DIVISION (SELECT/ASSIGN)**: Maps a logical file name to a physical system name (or JCL DD name).
   \`\`\`cobol
   SELECT IN-FILE ASSIGN TO INFILE.
   \`\`\`
2. **DATA DIVISION (FD - File Description)**: Defines the layout of the record inside the file.
   \`\`\`cobol
   FD IN-FILE.
   01 IN-RECORD PIC X(80).
   \`\`\`
3. **PROCEDURE DIVISION**: OPEN, READ, WRITE, CLOSE.

## Reading a File
\`\`\`cobol
OPEN INPUT IN-FILE.
READ IN-FILE
    AT END MOVE 'Y' TO EOF-FLAG
    NOT AT END DISPLAY IN-RECORD
END-READ.
CLOSE IN-FILE.
\`\`\`

## Activity
Write an \`OPEN INPUT\` statement for a file named \`CUST-FILE\`. Then write a \`CLOSE CUST-FILE.\` statement.
`,
  vsam: `# VSAM KSDS Processing

VSAM (Virtual Storage Access Method) is IBM's highly efficient file storage system. A **KSDS** (Key Sequenced Data Set) is like a NoSQL database—you access records instantly via a primary key (like a Customer ID).

## Defining a VSAM File
In the Environment Division, you define the file organization:
\`\`\`cobol
SELECT CUST-FILE ASSIGN TO CUSTFILE
       ORGANIZATION IS INDEXED
       ACCESS MODE IS RANDOM
       RECORD KEY IS CUST-ID.
\`\`\`

## Reading by Key
To read a specific record, you move the target ID into the key variable, then read!
\`\`\`cobol
MOVE '12345' TO CUST-ID.
READ CUST-FILE
    INVALID KEY DISPLAY 'Customer Not Found!'
    NOT INVALID KEY DISPLAY 'Found: ' CUST-NAME
END-READ.
\`\`\`

## Activity
Assuming \`CUST-FILE\` is defined, write a \`READ CUST-FILE\` statement handling the \`INVALID KEY\` condition with a DISPLAY message.
`,
  exception: `# Exception Management

When dealing with files and databases, errors happen. COBOL uses **File Status Codes** to tell you exactly what went wrong.

## File Status Codes
In your SELECT statement, you attach a status variable:
\`\`\`cobol
SELECT MY-FILE ASSIGN TO MYFILE
       FILE STATUS IS WS-FILE-STATUS.
\`\`\`
Where \`WS-FILE-STATUS\` is a \`PIC X(2)\` variable.

Common Codes:
- \`00\`: Success!
- \`10\`: End of File (EOF) reached.
- \`22\`: Duplicate Key (tried to write a record that already exists).
- \`23\`: Record Not Found.

## Declaratives
For global error handling, COBOL provides the \`DECLARATIVES\` section at the very top of the Procedure Division. It acts like a global try-catch block for file errors.

## Activity
Write an \`IF\` statement checking if \`WS-FILE-STATUS\` equals \`'22'\`. If it does, display 'Duplicate Key Error!'.
`
};

const dir = path.join(process.cwd(), 'src', 'content', 'tutorials');

// Create directories if they don't exist
fs.mkdirSync(path.join(dir, 'jcl'), { recursive: true });
fs.mkdirSync(path.join(dir, 'cobol'), { recursive: true });

// Write JCL files
for (const [key, content] of Object.entries(jclContent)) {
  fs.writeFileSync(path.join(dir, 'jcl', key + '.md'), content);
}

// Write COBOL files
for (const [key, content] of Object.entries(cobolContent)) {
  fs.writeFileSync(path.join(dir, 'cobol', key + '.md'), content);
}

console.log('Successfully generated all tutorial markdown files.');
