# COBOL Anatomy

Welcome to COBOL! Every COBOL program is strictly structured into four major "Divisions".

## The 4 Divisions
1. **IDENTIFICATION DIVISION**: Contains metadata. The only strictly required paragraph here is `PROGRAM-ID`.
2. **ENVIRONMENT DIVISION**: Maps the program to the physical computer environment (files to actual system paths).
3. **DATA DIVISION**: Declares all variables, files, and structures used in the program.
4. **PROCEDURE DIVISION**: Contains the actual executable logic and code.

## Fixed Columns
COBOL is a positional language!
- **Columns 1-6**: Sequence numbers (ignored usually).
- **Column 7**: Indicator area (`*` for comment).
- **Columns 8-11 (Area A)**: Division headers, Section headers, Paragraph names, and 01/77 levels MUST start here.
- **Columns 12-72 (Area B)**: All procedural statements (DISPLAY, MOVE, ADD) MUST start here.

## Activity
Write a complete `HELLO-WORLD` program. Include the IDENTIFICATION and PROCEDURE divisions. Use the `DISPLAY` statement to print a message, and end with `STOP RUN.`
Pay strict attention to Area A and Area B rules!
