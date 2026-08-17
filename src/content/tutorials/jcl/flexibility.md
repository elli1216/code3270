# 🔄 Flexibility & Versioning: Reusable JCL Components

If you are building a modern web application, you do not rewrite the same button markup 50 times. You create a reusable component and pass dynamic variables (like `props`) into it.

JCL operates on the exact same principle! To keep mainframe scripts DRY (Don't Repeat Yourself), you can package a block of JCL into a reusable component called a **Procedure (PROC)**, and pass dynamic variables into it using **Symbolic Parameters**.

---

## 1. Procedures (PROCs)

A PROC is simply a packaged set of JCL statements (usually `EXEC` and `DD` statements) that can be invoked multiple times across different jobs. There are two types:

- **Cataloged PROCs:** These are stored permanently in a system library (like a shared utility file). Any job on the mainframe can call them.
- **Instream PROCs:** These are defined temporarily at the very top of your current JCL script. They only exist for the duration of that specific job. These are fantastic for testing!

An Instream PROC always begins with a `PROC` statement and MUST end with a `PEND` (Procedure End) statement.

---

## 2. Symbolic Parameters (The Variables)

To make a PROC truly reusable, you need to inject dynamic data into it (like changing a dataset name from `DEV` to `PROD`). In JCL, variables are called **Symbolic Parameters**, and they are always prefixed with an ampersand (`&`).

You define default values for these variables on the `PROC` statement itself, and then you can override them when you `EXEC` the procedure!

### The Double-Period Trick (`..`)

When injecting variables into dataset names, you will often see two periods in a row, like `&ENV..DATA`. This is not a typo; it is a critical JCL syntax rule!

- The **first period** acts as a terminator. It tells the JCL compiler, "The variable name stops here."
- The **second period** is the literal text character that gets placed into the dataset name.
- If `&ENV` equals `PROD`, `&ENV..DATA` resolves perfectly to `PROD.DATA`.

---

## 3. Sample Program: Complete Instream PROC with Overrides

Here is a complete, runnable JCL script defining a reusable backup procedure and calling it multiple times across environments:

```jcl
//PROCJOB  JOB (ACCT777),'PROC DEMO',CLASS=A,MSGCLASS=X
//*----------------------------------------------------------------*
//* 1. DEFINE REUSABLE INSTREAM PROC COMPONENT                     *
//*----------------------------------------------------------------*
//BACKUP   PROC ENV='DEV',LVL='DAILY'
//COPYSTEP EXEC PGM=IEBGENER
//SYSPRINT DD  SYSOUT=*
//SYSIN    DD  DUMMY
//SYSUT1   DD  DSN=CORP.&ENV..MASTER.&LVL,DISP=SHR
//SYSUT2   DD  DSN=CORP.&ENV..BACKUP.&LVL,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(CYL,(10,5)),
//             UNIT=SYSDA
//         PEND
//*----------------------------------------------------------------*
//* 2. RUN WITH DEFAULT PARAMETERS (ENV=DEV, LVL=DAILY)            *
//*----------------------------------------------------------------*
//STEP1    EXEC BACKUP
//*
//*----------------------------------------------------------------*
//* 3. RUN WITH OVERRIDDEN PARAMETERS (ENV=PROD, LVL=WEEKLY)       *
//*----------------------------------------------------------------*
//STEP2    EXEC BACKUP,ENV='PROD',LVL='WEEKLY'
```

---

---

## 📚 Glossary of Clauses & Reserved Words

- **`PROC`**: A statement used to package a block of JCL statements into a reusable procedure (component).
- **`PEND`**: A statement required to mark the end of an Instream PROC definition.
- **`&` (Symbolic Parameters)**: The ampersand prefix used to define dynamic variables that can be passed into and resolved within a PROC.
- **`..` (Double-Period Notation)**: Used when concatenating a symbolic parameter with literal text (e.g., `&ENV..DATA`), where the first period terminates the variable name and the second is the literal character.

---

## 💻 Activity: Write Your Own PROC

Let's package up the `IEBGENER` utility we learned about earlier into a reusable backup component.

**Your tasks:**

1. Create a `JOB` statement: `//FLEXJOB JOB (123),'PROC',CLASS=A,MSGCLASS=X`.
2. Define an Instream PROC named `BACKUP` starting in column 3.
3. On the `PROC` statement, define a symbolic parameter named `LVL` and set its default value to `'DAILY'`: `//BACKUP PROC LVL='DAILY'`.
4. Inside the PROC, create an `EXEC` step named `COPY` that runs `PGM=IEBGENER`: `//COPY EXEC PGM=IEBGENER`.
5. Close the block with a `PEND` statement: `// PEND` (or `//PEND PEND`).

**Sample Code to Start With:**

```jcl
//FLEXJOB  JOB (123),'PROC',CLASS=A,MSGCLASS=X
//BACKUP   PROC LVL='DAILY'
//COPY     EXEC PGM=IEBGENER
//         PEND
//RUN1     EXEC BACKUP
```

**⚠️ Warning:** Do not forget the `PEND` statement! If you leave it off, JCL will think the rest of your script is still part of the definition, and your procedure will never actually run!
