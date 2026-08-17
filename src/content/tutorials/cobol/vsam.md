# 🗄️ VSAM KSDS Processing: The Mainframe's Key-Value Store

In the previous file handling module, we looked at Sequential Files, which force you to read data line-by-line from top to bottom. But what if you have a dataset with 100 million customers, and you just want to look up Customer #84729? Reading 84,728 lines first would be incredibly slow!

Enter **VSAM (Virtual Storage Access Method)**. This is IBM's highly efficient, hardware-optimized file storage system. The most common type of VSAM file is a **KSDS (Key Sequenced Data Set)**. If you are familiar with modern web development, you can think of a KSDS exactly like a NoSQL Key-Value database (like DynamoDB or Redis)—you can retrieve a record instantly via a primary key!

---

## 1. Defining a VSAM File (The Setup)

To use a KSDS, we have to change how we define our file in the `ENVIRONMENT DIVISION`. We need to tell the compiler three new things: that the file uses an index, that we want to access it randomly (instead of sequentially), and exactly which variable acts as the primary key.

```cobol
       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT CUST-FILE ASSIGN TO CUSTFILE
                  ORGANIZATION IS INDEXED
                  ACCESS MODE IS RANDOM
                  RECORD KEY IS CUST-ID.
```

- **`ORGANIZATION IS INDEXED`**: Tells COBOL this is a VSAM KSDS file, not a flat text file.
- **`ACCESS MODE IS RANDOM`**: Tells COBOL we want to jump around and grab specific records instantly.
- **`RECORD KEY IS CUST-ID`**: Defines the exact variable inside our file layout that holds the primary key.

---

## 2. Reading by Key (The Lookup)

Reading a specific record from a VSAM KSDS is a two-step process.

First, you must "prime the key" by moving your target lookup value into the key variable. Second, you issue the `READ` command.

Because we are doing a random lookup, we don't use the `AT END` clause like we did with sequential files. Instead, we use the **`INVALID KEY`** clause, which triggers if the database cannot find the ID you requested (this is the built-in equivalent of checking for File Status `23`).

```cobol
       PROCEDURE DIVISION.
       LOOKUP-CUSTOMER.
           * Step 1: Prime the key with the ID we want to find
           MOVE '12345' TO CUST-ID.

           * Step 2: Attempt the read
           READ CUST-FILE
               INVALID KEY
                   DISPLAY 'Error: Customer Not Found!'
               NOT INVALID KEY
                   DISPLAY 'Success! Found: ' CUST-NAME
           END-READ.
```

---

## 3. Sample Program: Complete VSAM KSDS Inquiry

Here is a complete, runnable COBOL program that defines an indexed VSAM file, opens it, and performs a direct key-based lookup:

```cobol
      *----------------------------------------------------------------*
      * PROGRAM:    VSAM-LOOKUP                                        *
      * PURPOSE:    DIRECT KEY-BASED RECORD RETRIEVAL FROM VSAM KSDS   *
      *----------------------------------------------------------------*
       IDENTIFICATION DIVISION.
       PROGRAM-ID. VSAM-LOOKUP.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT CUST-KSDS ASSIGN TO CUSTKSDS
                  ORGANIZATION IS INDEXED
                  ACCESS MODE IS RANDOM
                  RECORD KEY IS CK-ACCOUNT-NO.

       DATA DIVISION.
       FILE SECTION.
       FD  CUST-KSDS.
       01  CUST-KSDS-RECORD.
           05 CK-ACCOUNT-NO    PIC 9(08).
           05 CK-FULL-NAME     PIC X(30).
           05 CK-TIER-LEVEL    PIC X(10).
           05 CK-BALANCE       PIC S9(7)V99 COMP-3.

       WORKING-STORAGE SECTION.
       01  WS-SEARCH-ID        PIC 9(08) VALUE 10045892.

       PROCEDURE DIVISION.
       000-MAIN.
           OPEN INPUT CUST-KSDS.

      * Prime key with the ID to retrieve
           MOVE WS-SEARCH-ID TO CK-ACCOUNT-NO.

           READ CUST-KSDS
               INVALID KEY
                   DISPLAY 'STATUS 404: RECORD NOT FOUND FOR ID '
                           CK-ACCOUNT-NO
               NOT INVALID KEY
                   DISPLAY 'FOUND ACCOUNT: ' CK-ACCOUNT-NO
                   DISPLAY 'OWNER NAME   : ' CK-FULL-NAME
                   DISPLAY 'TIER         : ' CK-TIER-LEVEL
           END-READ.

           CLOSE CUST-KSDS.
           STOP RUN.
```

---

---

## 📚 Glossary of Clauses & Reserved Words

- **`ORGANIZATION IS INDEXED`**: Specifies that the file uses an indexed structure (like VSAM KSDS) rather than a sequential one.
- **`ACCESS MODE IS DYNAMIC`**: Allows the program to read the file both sequentially (record by record) and randomly (by specific key).
- **`RECORD KEY IS`**: Defines the primary, unique key used to index and retrieve records.
- **`ALTERNATE RECORD KEY IS`**: Defines a secondary key for lookup (e.g., looking up a customer by name instead of ID).
- **`WITH DUPLICATES`**: An optional clause used with ALTERNATE RECORD KEY to allow multiple records to share the same alternate key.
- **`INVALID KEY`**: A conditional clause used with READ and WRITE that triggers if the specified key is not found (during READ) or already exists (during WRITE).
- **`START`**: A verb used to position the file pointer at a specific record based on a key condition, without actually loading the record into the buffer.
- **`READ ... NEXT`**: A verb used in DYNAMIC access mode to read the next sequential record after positioning the pointer with START.

---

## 💻 Activity: The Instant Lookup

Let's test out random access! Imagine you are building a banking application and a user just swiped their ATM card. You need to pull their account record instantly.

**Your tasks:**

1. Construct a complete COBOL program with `IDENTIFICATION DIVISION.` and `PROGRAM-ID. VSAM-APP.`.
2. In the `PROCEDURE DIVISION.`, simulate an indexed lookup on `CUST-FILE`.
3. Issue a `READ CUST-FILE` statement.
4. Add an `INVALID KEY` clause: if not found, `DISPLAY 'Account Does Not Exist'`.
5. Close the block gracefully with `END-READ.` and terminate with `STOP RUN.`

**Sample Code to Start With:**

```cobol
       IDENTIFICATION DIVISION.
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
           STOP RUN.
```

**⚠️ Warning:** Remember that procedural commands (`READ`, `DISPLAY`) must begin in **Area B** (Column 12). Also, notice there is no period after the `INVALID KEY` display statement; the only period should be after your `END-READ`!
