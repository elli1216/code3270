# 🏗️ JCL Foundations: The Mainframe's Orchestrator

Welcome to Job Control Language (JCL)! If you are coming from the modern web or cloud world, you can think of JCL as the mainframe equivalent of a Dockerfile, a GitHub Actions YAML script, or a Bash shell script.

JCL does not calculate math, process data, or contain business logic. Instead, it is a scripting language used to instruct the IBM z/OS operating system on exactly _how_ to run your COBOL programs. It tells the system who you are, what program to execute, and where the files are located.

---

## 1. The Core Statements (The Holy Trinity)

Every single JCL job you write will be built upon three foundational statements.

### 1. The `JOB` Statement

This is the absolute first line of your script. It identifies the job to the system, provides accounting/billing information, and sets global parameters for the entire run.

```jcl
//MYJOB1   JOB (12345),'Z PLAYGROUND',CLASS=A,MSGCLASS=X
```

_(Here, `MYJOB1` is the name of the job. `(12345)` is the billing account, `CLASS` determines which system queue processes it, and `MSGCLASS` dictates where the system logs are sent.)_

### 2. The `EXEC` Statement

While a `JOB` is the entire pipeline, an `EXEC` (Execute) statement defines a single **Step** within that pipeline. It specifies the actual compiled program you want to run. A single Job can have up to 255 steps!

```jcl
//STEP01   EXEC PGM=MYCOBOL
```

### 3. The `DD` (Data Definition) Statement

Mainframe programs do not search for files on a hard drive by themselves. JCL must wire the files up for them. The `DD` statement allocates datasets (files), databases, or system resources and assigns them a temporary alias that your COBOL program can read.

```jcl
//INPUT1   DD  DSN=MY.SYSTEM.DATASET,DISP=SHR
```

---

## 2. Syntax Rules: The Danger Zone

JCL was designed in the 1960s to be read by punch card readers. Therefore, it is incredibly strict about spacing and columns. **A single misplaced space will break your entire script.**

- **The Prefix:** Every standard JCL statement MUST start with two slashes `//` in columns 1 and 2.
- _(Note: `//*` denotes a comment line!)._
- **The Name Field:** Starts exactly in column 3, immediately following the slashes. It can be a maximum of 8 characters long (using letters, numbers, or `@`, `#`, `$`).
- **The Operation Field:** (`JOB`, `EXEC`, `DD`) must be separated from the Name field by **at least one space**.
- **The Operand (Parameter) Field:** Must be separated from the Operation field by **at least one space**.
- **⚠️ The Golden Space Rule:** You **MUST NOT** put spaces between your parameters! Parameters are separated by commas. The moment JCL sees a space in the parameter list, it assumes the code has ended and treats everything after it as a comment.

### The Spacing Trap

```jcl
//GOODJOB  JOB (1),'TEST',CLASS=A,MSGCLASS=X        <-- PERFECT
//BADJOB   JOB (1),'TEST', CLASS=A, MSGCLASS=X      <-- BROKEN!
```

_(In `BADJOB`, because there is a space after `'TEST',`, the system will treat `CLASS=A, MSGCLASS=X` as a comment and the job will fail!)_

---

## 3. Sample Program: Multi-Step Production Batch Job

Here is a complete, real-world JCL batch job demonstrating how the `JOB`, `EXEC`, and `DD` statements work together:

```jcl
//DAILYRUN JOB (ACCT101),'NIGHTLY PAYROLL',
//             CLASS=A,
//             MSGCLASS=X,
//             NOTIFY=&SYSUID
//*----------------------------------------------------------------*
//* STEP 1: INITIALIZE ENVIRONMENT (RUN DUMMY PROGRAM)             *
//*----------------------------------------------------------------*
//STEP1    EXEC PGM=IEFBR14
//INITFILE DD  DSN=PROD.PAYROLL.WORK,
//             DISP=(NEW,DELETE,DELETE),
//             SPACE=(TRK,(5,1)),
//             UNIT=SYSDA
//*----------------------------------------------------------------*
//* STEP 2: EXECUTE COBOL PAYROLL PROGRAM                          *
//*----------------------------------------------------------------*
//STEP2    EXEC PGM=PAY001
//PAYIN    DD  DSN=PROD.PAYROLL.MASTER,DISP=SHR
//PAYOUT   DD  DSN=PROD.PAYROLL.REPORT,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(1,1)),
//             UNIT=SYSDA,
//             DCB=(RECFM=FB,LRECL=132,BLKSIZE=0)
//SYSPRINT DD  SYSOUT=*
//SYSUDUMP DD  SYSOUT=*
```

---

## 💻 Activity: The Do-Nothing Job

It is time to write your first JCL script. We are going to execute a legendary mainframe program called `IEFBR14`.

`IEFBR14` is a built-in IBM utility program that does absolutely nothing except return a "Success" code. It is the mainframe equivalent of a `pass` statement in Python or a `/bin/true` command in Linux. It is incredibly useful for testing JCL syntax without actually running heavy code!

**Your tasks:**

1. Write the `JOB` statement. Name the job `MYJOB`. Start it in column 3 (right after the `//`).
2. Provide the parameters: `(123),'USER',CLASS=A,MSGCLASS=X`. Remember, no spaces between them!
3. On the next line, write an `EXEC` statement.
4. Name this step `STEP1`.
5. Tell it to execute `IEFBR14` using the parameter `PGM=IEFBR14`.

**Sample Code to Start With:**

```jcl
//MYJOB    JOB (123),'USER',CLASS=A,MSGCLASS=X
//STEP1    EXEC PGM=IEFBR14
```

**⚠️ Warning:** Watch your spaces! Ensure there is at least one space between `//MYJOB`, `JOB`, and your parameters, but no spaces _inside_ the parameter list!
