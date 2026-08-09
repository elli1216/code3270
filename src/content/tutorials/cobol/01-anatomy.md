---
title: "COBOL Anatomy"
track: 2
module: "anatomy"
---

# COBOL Anatomy

Every COBOL program is divided into exactly four divisions. These divisions must appear in a specific order, and each serves a distinct structural purpose.

## The 4 Divisions

1. **IDENTIFICATION DIVISION**: Identifies the program to the computer and the programmer. The only mandatory paragraph here is `PROGRAM-ID`.
2. **ENVIRONMENT DIVISION**: Specifies the computer hardware and external files the program will use.
3. **DATA DIVISION**: Declares all the variables, file records, and data structures your program needs.
4. **PROCEDURE DIVISION**: Contains the actual logic and executable instructions (the code).

## Hello World Example

Take a look at the editor on the right. Notice how the divisions are structured.
In COBOL, Area A (columns 8-11) is used for division headers, section names, and paragraph names. Area B (columns 12-72) is used for actual statements.

Try running the code to see the output!
