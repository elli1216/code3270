# Data Types (PIC & COMP)

Variables in COBOL are declared in the `WORKING-STORAGE SECTION` of the `DATA DIVISION`. You define the exact size and type of variables using the `PIC` (Picture) clause.

## Common PIC Characters
- `X`: Alphanumeric (String). e.g., `PIC X(10)` is a 10-char string.
- `9`: Numeric. e.g., `PIC 9(4)` is a 4-digit number.
- `V`: Implied decimal point. e.g., `PIC 9(3)V99` is 999.99 (uses 5 bytes of storage).
- `S`: Signed number. e.g., `PIC S9(4)`.

## Computational Usage (COMP)
By default, numbers are stored as human-readable text (DISPLAY). To do math efficiently, use binary or packed decimal formats:
- `COMP` or `COMP-4`: Binary format.
- `COMP-3`: Packed Decimal format (compresses two digits into one byte). Highly used in financial systems!

## Activity
Define a `WORKING-STORAGE SECTION`. 
Create a variable `01 CUSTOMER-NAME PIC X(20).`
Create a variable `01 ACCOUNT-BAL PIC S9(5)V99 COMP-3.`
