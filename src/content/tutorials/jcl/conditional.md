# 🔀 Conditional Execution: Controlling the Job Flow

In modern CI/CD pipelines (like GitHub Actions or GitLab CI), you often configure deployment steps to run _only_ if the previous unit tests passed successfully. JCL has been doing this for decades! It allows you to evaluate the success or failure of previous steps before deciding whether to run the next one.

To control this flow, JCL provides two primary methods: the legacy `COND` parameter (which uses notoriously confusing reverse-logic) and the modern, developer-friendly **`IF/THEN/ELSE`** constructs.

---

## 1. Return Codes (The Condition Code)

Before you can write conditional logic, you need to know what you are evaluating. When a COBOL program or a system utility finishes running, it sends an exit status back to the operating system. In the mainframe world, this is called a **Return Code (RC)** or Condition Code.

Here are the standard IBM Return Codes you must know:

- **`0` (Success):** Perfect execution. Everything went exactly as planned.
- **`4` (Warning):** The program finished, but something minor happened (e.g., a file was empty, but the program handled it).
- **`8` (Error):** A significant issue occurred. The output might be invalid or incomplete.
- **`12` (Severe Error):** A catastrophic failure. The program likely crashed or was forced to abort.

_(Pro-Tip: When you write COBOL, you can actually set this code yourself by moving a number into the special `RETURN-CODE` register right before your `STOP RUN` statement!)_

---

## 2. IF/THEN/ELSE Constructs

To read these Return Codes, modern JCL allows you to wrap your `EXEC` steps inside `IF` statements. This reads exactly like a standard programming language.

```jcl
//STEP1   EXEC PGM=PROGA
//* Check if STEP1 was completely successful or just had a warning
//IF1     IF (STEP1.RC <= 4) THEN
//STEP2     EXEC PGM=PROGB
//ELSE1   ELSE
//STEP3     EXEC PGM=ERRORLOG
//END1    ENDIF
```

### The Syntax Breakdown

- **The Name:** Just like `JOB` and `EXEC` statements, your `IF`, `ELSE`, and `ENDIF` statements can (and usually should) have a name in column 3 (e.g., `IF1`, `ELSE1`, `END1`).
- **The Slashes:** Notice that even though this is a logical block, every single line still requires the `//` prefix in columns 1 and 2!
- **The Condition:** `(STEP1.RC <= 4)` explicitly checks the Return Code of a specific step named `STEP1`.

---

## 3. Sample Program: Production Validation & Notification Pipeline

Here is a complete, real-world conditional JCL script demonstrating error branches, fallback handling, and final status reporting:

```jcl
//CONDJOB  JOB (ACCT555),'ETL PIPELINE',CLASS=A,MSGCLASS=X
//*----------------------------------------------------------------*
//* STEP 1: EXTRACT & VALIDATE SOURCE DATA                         *
//*----------------------------------------------------------------*
//STEP1    EXEC PGM=IEFBR14
//SYSPRINT DD  SYSOUT=*
//*
//*----------------------------------------------------------------*
//* STEP 2: RUN TRANSFORM ONLY IF STEP1 COMPLETED WITH RC <= 4     *
//*----------------------------------------------------------------*
//IFOK     IF (STEP1.RC <= 4) THEN
//STEP2      EXEC PGM=PROGB
//INFILE     DD  DSN=PROD.VALID.DATA,DISP=SHR
//OUTFILE    DD  DSN=PROD.TRANSFORMED.DATA,
//               DISP=(NEW,CATLG,DELETE),
//               SPACE=(CYL,(2,1)),
//               UNIT=SYSDA
//SYSPRINT   DD  SYSOUT=*
//ELSE1    ELSE
//*----------------------------------------------------------------*
//* STEP 3: RUN EMERGENCY RECOVERY IF STEP1 FAILED (RC > 4)        *
//*----------------------------------------------------------------*
//STEP3      EXEC PGM=IEFBR14
//ERRFILE    DD  DSN=PROD.ERROR.ALERT,
//               DISP=(MOD,CATLG,DELETE),
//               SPACE=(TRK,(1,1)),
//               UNIT=SYSDA
//ENDIF1   ENDIF
```

---

---

## 📚 Glossary of Clauses & Reserved Words

- **`RC` (Return Code / Condition Code)**: The numeric exit status passed back to the operating system when a program or step finishes (e.g., `0` for Success, `8` for Error).
- **`IF / THEN`**: A modern JCL construct used to evaluate the success or failure of previous steps before deciding whether to run the enclosed block of steps.
- **`ELSE`**: A JCL construct used to define an alternative block of steps to run if the IF condition evaluates to false.
- **`ENDIF`**: A statement required to close an IF/THEN or IF/THEN/ELSE conditional block.

---

## 💻 Activity: The Gatekeeper

Let's protect a sensitive job step. Imagine `STEP2` runs a critical database update (`PROGB`), and you absolutely do not want it to run unless `STEP1` (`IEFBR14`) was a flawless success.

**Your tasks:**

1. Create a `JOB` statement: `//GATEKEEP JOB (123),'TEST',CLASS=A,MSGCLASS=X`.
2. Write step 1: `//STEP1 EXEC PGM=IEFBR14`.
3. Directly below it, create an `IF` statement named `CHK1`: `//CHK1 IF (STEP1.RC = 0) THEN`.
4. Inside the `IF` block, write your next step: `//STEP2 EXEC PGM=PROGB`.
5. Close the block by writing an `ENDIF` statement named `END1`: `//END1 ENDIF`.

**Sample Code to Start With:**

```jcl
//GATEKEEP JOB (123),'TEST',CLASS=A,MSGCLASS=X
//STEP1    EXEC PGM=IEFBR14
//CHK1     IF (STEP1.RC = 0) THEN
//STEP2    EXEC PGM=PROGB
//END1     ENDIF
```

**⚠️ Warning:** Be careful with your spacing! The keywords `IF` and `ENDIF` are Operations, meaning they must be separated from their Name fields (`CHK1`, `END1`) by at least one space.
