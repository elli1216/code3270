export const DEFAULT_CODE_MAP: Record<string, string> = {
  cobol: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO-WORLD.
       PROCEDURE DIVISION.
       100-MAIN.
           DISPLAY 'HELLO WORLD!'.
           STOP RUN.`,
  jcl: `//MYJOB    JOB (ACCT),'NAME',CLASS=A,MSGCLASS=X
//STEP1    EXEC PGM=IEFBR14`,
}

export const MODULE_STARTER_CODES: Record<string, string> = {
  'cobol-anatomy': `       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO-WORLD.

       PROCEDURE DIVISION.
       100-MAIN.
      * TODO: Write your DISPLAY statement in Area B (Column 12)

           STOP RUN.`,

  'cobol-datatypes': `       IDENTIFICATION DIVISION.
       PROGRAM-ID. DATA-TYPES.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
      * TODO: Declare CUSTOMER-NAME and ACCOUNT-BAL

       PROCEDURE DIVISION.
       100-MAIN.
           STOP RUN.`,

  'cobol-controlflow': `       IDENTIFICATION DIVISION.
       PROGRAM-ID. LOOP-APP.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-LOOP-COUNT PIC 9 VALUE 1.

       PROCEDURE DIVISION.
       100-MAIN.
      * TODO: Write your PERFORM 5 TIMES loop below

           STOP RUN.`,

  'cobol-tables': `       IDENTIFICATION DIVISION.
       PROGRAM-ID. TABLE-APP.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WORK-WEEK.
      * TODO: Declare DAYS table OCCURS 5 TIMES

       PROCEDURE DIVISION.
       100-MAIN.
      * TODO: Move 'MONDAY' to DAYS(1) and display

           STOP RUN.`,

  'cobol-modular': `       IDENTIFICATION DIVISION.
       PROGRAM-ID. MODULAR-APP.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 NUM1 PIC 9(4) VALUE 200.
       01 NUM2 PIC 9(4) VALUE 50.

       PROCEDURE DIVISION.
       100-MAIN.
      * TODO: Call 'MATHPROG' USING NUM1, NUM2

           STOP RUN.`,

  'cobol-sequential': `       IDENTIFICATION DIVISION.
       PROGRAM-ID. FILE-APP.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT CUST-FILE ASSIGN TO CUSTIN.

       DATA DIVISION.
       FILE SECTION.
       FD  CUST-FILE.
       01  CUST-REC PIC X(80).

       PROCEDURE DIVISION.
       100-MAIN.
      * TODO: OPEN INPUT CUST-FILE and CLOSE CUST-FILE

           STOP RUN.`,

  'cobol-vsam': `       IDENTIFICATION DIVISION.
       PROGRAM-ID. VSAM-APP.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT CUST-FILE ASSIGN TO CUSTFILE
                  ORGANIZATION IS INDEXED
                  ACCESS MODE IS RANDOM
                  RECORD KEY IS CUST-ID.

       DATA DIVISION.
       FILE SECTION.
       FD  CUST-FILE.
       01  CUST-REC.
           05 CUST-ID   PIC 9(05).
           05 CUST-DATA PIC X(75).

       PROCEDURE DIVISION.
       100-MAIN.
           OPEN INPUT CUST-FILE.
           MOVE 99887 TO CUST-ID.
      * TODO: Write READ CUST-FILE with INVALID KEY clause

           CLOSE CUST-FILE.
           STOP RUN.`,

  'cobol-exception': `       IDENTIFICATION DIVISION.
       PROGRAM-ID. EXCEPTION-APP.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-FILE-STATUS PIC X(02) VALUE '22'.

       PROCEDURE DIVISION.
       100-MAIN.
      * TODO: Check IF WS-FILE-STATUS = '22' and DISPLAY 'Duplicate Key Error!'

           STOP RUN.`,

  'jcl-foundations': `//* TODO: Write your MYJOB JOB statement and STEP1 EXEC PGM=IEFBR14 below:
`,

  'jcl-conditional': `//GATEKEEP JOB (123),'TEST',CLASS=A,MSGCLASS=X
//STEP1    EXEC PGM=IEFBR14
//* TODO: Write IF condition checking STEP1.RC = 0, then STEP2 EXEC PGM=PROGB, and ENDIF
`,

  'jcl-utilities': `//UTILJOB  JOB (123),'IEBGENER',CLASS=A,MSGCLASS=X
//* TODO: Create COPYSTEP EXEC PGM=IEBGENER with SYSUT1, SYSUT2, SYSPRINT, and SYSIN DD statements
`,

  'jcl-advanced': `//GDGJOB   JOB (123),'GDG',CLASS=A,MSGCLASS=X
//STEP1    EXEC PGM=IEFBR14
//* TODO: Define NEWDATA DD allocating PROD.DAILY.TRANS(+1) with DISP=(NEW,CATLG,DELETE)
`,

  'jcl-flexibility': `//FLEXJOB  JOB (123),'PROC',CLASS=A,MSGCLASS=X
//* TODO: Define BACKUP PROC with LVL='DAILY', COPY step running IEBGENER, and PEND
`,

  'jcl-resilience': `//* TODO: Modify the JOB statement below by adding RESTART=STEP2:
//NIGHTLY  JOB (999),'USER',CLASS=A,MSGCLASS=X
//STEP1    EXEC PGM=IEFBR14
//STEP2    EXEC PGM=IEFBR14
`,
}

export const MODULE_SOLUTION_CODES: Record<string, string> = {
  'cobol-anatomy': `       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO-WORLD.

       PROCEDURE DIVISION.
       100-MAIN.
           DISPLAY 'HELLO WORLD!'.
           STOP RUN.`,

  'cobol-datatypes': `       IDENTIFICATION DIVISION.
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
           STOP RUN.`,

  'cobol-controlflow': `       IDENTIFICATION DIVISION.
       PROGRAM-ID. LOOP-APP.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-LOOP-COUNT PIC 9 VALUE 1.

       PROCEDURE DIVISION.
       100-MAIN.
           PERFORM 5 TIMES
               DISPLAY 'Hello from COBOL!'
           END-PERFORM.
           STOP RUN.`,

  'cobol-tables': `       IDENTIFICATION DIVISION.
       PROGRAM-ID. TABLE-APP.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WORK-WEEK.
          05 DAYS PIC X(10) OCCURS 5 TIMES.

       PROCEDURE DIVISION.
       100-MAIN.
           MOVE 'MONDAY' TO DAYS(1).
           DISPLAY 'FIRST DAY: ' DAYS(1).
           STOP RUN.`,

  'cobol-modular': `       IDENTIFICATION DIVISION.
       PROGRAM-ID. MODULAR-APP.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 NUM1 PIC 9(4) VALUE 200.
       01 NUM2 PIC 9(4) VALUE 50.

       PROCEDURE DIVISION.
       100-MAIN.
           CALL 'MATHPROG' USING NUM1, NUM2.
           DISPLAY 'CALCULATION COMPLETE'.
           STOP RUN.`,

  'cobol-sequential': `       IDENTIFICATION DIVISION.
       PROGRAM-ID. FILE-APP.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT CUST-FILE ASSIGN TO CUSTIN.

       DATA DIVISION.
       FILE SECTION.
       FD  CUST-FILE.
       01  CUST-REC PIC X(80).

       PROCEDURE DIVISION.
       100-MAIN.
           OPEN INPUT CUST-FILE.
           DISPLAY 'FILE OPENED SUCCESSFULLY'.
           CLOSE CUST-FILE.
           STOP RUN.`,

  'cobol-vsam': `       IDENTIFICATION DIVISION.
       PROGRAM-ID. VSAM-APP.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT CUST-FILE ASSIGN TO CUSTFILE
                  ORGANIZATION IS INDEXED
                  ACCESS MODE IS RANDOM
                  RECORD KEY IS CUST-ID.

       DATA DIVISION.
       FILE SECTION.
       FD  CUST-FILE.
       01  CUST-REC.
           05 CUST-ID   PIC 9(05).
           05 CUST-DATA PIC X(75).

       PROCEDURE DIVISION.
       100-MAIN.
           OPEN INPUT CUST-FILE.
           MOVE 99887 TO CUST-ID.
           READ CUST-FILE
               INVALID KEY
                   DISPLAY 'Account Does Not Exist'
               NOT INVALID KEY
                   DISPLAY 'ACCOUNT FOUND!'
           END-READ.
           CLOSE CUST-FILE.
           STOP RUN.`,

  'cobol-exception': `       IDENTIFICATION DIVISION.
       PROGRAM-ID. EXCEPTION-APP.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-FILE-STATUS PIC X(02) VALUE '22'.

       PROCEDURE DIVISION.
       100-MAIN.
           IF WS-FILE-STATUS = '22'
               DISPLAY 'Duplicate Key Error!'
           END-IF.
           STOP RUN.`,

  'jcl-foundations': `//MYJOB    JOB (123),'USER',CLASS=A,MSGCLASS=X
//STEP1    EXEC PGM=IEFBR14`,

  'jcl-conditional': `//GATEKEEP JOB (123),'TEST',CLASS=A,MSGCLASS=X
//STEP1    EXEC PGM=IEFBR14
//CHK1     IF (STEP1.RC = 0) THEN
//STEP2    EXEC PGM=PROGB
//END1     ENDIF`,

  'jcl-utilities': `//UTILJOB  JOB (123),'IEBGENER',CLASS=A,MSGCLASS=X
//COPYSTEP EXEC PGM=IEBGENER
//SYSPRINT DD  SYSOUT=*
//SYSUT1   DD  DUMMY
//SYSUT2   DD  SYSOUT=*
//SYSIN    DD  DUMMY`,

  'jcl-advanced': `//GDGJOB   JOB (123),'GDG',CLASS=A,MSGCLASS=X
//STEP1    EXEC PGM=IEFBR14
//NEWDATA  DD  DSN=PROD.DAILY.TRANS(+1),
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(1,1)),
//             UNIT=SYSDA`,

  'jcl-flexibility': `//FLEXJOB  JOB (123),'PROC',CLASS=A,MSGCLASS=X
//BACKUP   PROC LVL='DAILY'
//COPY     EXEC PGM=IEBGENER
//         PEND
//RUN1     EXEC BACKUP`,

  'jcl-resilience': `//NIGHTLY  JOB (999),'USER',CLASS=A,MSGCLASS=X,RESTART=STEP2
//STEP1    EXEC PGM=IEFBR14
//STEP2    EXEC PGM=IEFBR14`,
}

export const SAMPLE_PROGRAMS = {
  'cobol-hello': {
    name: 'Hello World (COBOL)',
    lang: 'cobol',
    code: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO-WORLD.
       PROCEDURE DIVISION.
           DISPLAY 'Hello, World!'.
           STOP RUN.`,
  },
  'cobol-math': {
    name: 'Basic Math (COBOL)',
    lang: 'cobol',
    code: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. BASIC-MATH.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 NUM1 PIC 9(2) VALUE 10.
       01 NUM2 PIC 9(2) VALUE 20.
       01 RESULT PIC 9(3).
       PROCEDURE DIVISION.
           ADD NUM1 TO NUM2 GIVING RESULT.
           DISPLAY 'The result of 10 + 20 is: ' RESULT.
           STOP RUN.`,
  },
  'jcl-basic': {
    name: 'Basic Job (JCL)',
    lang: 'jcl',
    code: `//MYJOB    JOB (123),'JOHN DOE',CLASS=A,MSGCLASS=X
//STEP1    EXEC PGM=IEFBR14
//DD1      DD DSN=MY.DATA.SET,DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(1,1)),UNIT=SYSDA`,
  },
}
