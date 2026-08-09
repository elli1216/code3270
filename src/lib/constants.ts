export const DEFAULT_CODE_MAP: Record<string, string> = {
  'cobol': `       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO-WORLD.
       PROCEDURE DIVISION.
           DISPLAY 'HELLO WORLD!'.
           STOP RUN.`,
  'jcl': `//JOBNAME  JOB (ACCT),'NAME',MSGCLASS=X
//STEP1    EXEC PGM=IEFBR14`
}

export const SAMPLE_PROGRAMS = {
  'cobol-hello': {
    name: 'Hello World (COBOL)',
    lang: 'cobol',
    code: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO-WORLD.
       PROCEDURE DIVISION.
           DISPLAY 'Hello, World!'.
           STOP RUN.`
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
           STOP RUN.`
  },
  'jcl-basic': {
    name: 'Basic Job (JCL)',
    lang: 'jcl',
    code: `//MYJOB    JOB (123),'JOHN DOE',CLASS=A,MSGCLASS=X
//STEP1    EXEC PGM=IEFBR14
//DD1      DD DSN=MY.DATA.SET,DISP=(NEW,CATLG,DELETE),
//            SPACE=(CYL,(1,1)),UNIT=SYSDA`
  }
}
