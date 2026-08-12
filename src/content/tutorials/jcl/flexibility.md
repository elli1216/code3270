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

### Sample Code: The Complete Flow

Here is how an Instream PROC looks from definition to execution:

```jcl
//MYJOB    JOB (12345),'PROC TEST',CLASS=A,MSGCLASS=X
//* ----------------------------------------------------
//* 1. DEFINE THE INSTREAM PROC (The Component)
//* ----------------------------------------------------
//MYPROC   PROC ENV='DEV'
//STEP1    EXEC PGM=MYPGM
//FILE1    DD  DSN=APP.&ENV..DATA,DISP=SHR
//         PEND
//* ----------------------------------------------------
//* 2. EXECUTE THE PROC (Passing the Props)
//* ----------------------------------------------------
//* This will run using the default 'DEV'
//RUNDEV   EXEC MYPROC
//*
//* This will override the variable to 'PROD'
//RUNPROD  EXEC MYPROC,ENV='PROD'

```

---

## 💻 Activity: Write Your Own PROC

Let's package up the `IEBGENER` utility we learned about earlier into a reusable backup component.

**Your tasks:**

1. Define an Instream PROC named `BACKUP`. (Start in column 3).
2. On the `PROC` statement, define a symbolic parameter named `LVL` and set its default value to `'DAILY'`. (e.g., `LVL='DAILY'`).
3. Inside the PROC, create an `EXEC` step named `COPY` that runs `PGM=IEBGENER`.
4. Close the block with a `PEND` statement (leave the name field blank, starting `PEND` in column 10 is standard).

**⚠️ Warning:** Do not forget the `PEND` statement! If you leave it off, JCL will think the rest of your script is still part of the definition, and your procedure will never actually run!
