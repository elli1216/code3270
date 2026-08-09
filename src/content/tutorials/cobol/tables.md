# Table Handling (Arrays)

In COBOL, arrays are called **Tables**, and they are defined using the `OCCURS` clause in the Data Division.

## Defining a Table
```cobol
01 MONTH-TABLE.
   05 MONTH-NAME PIC X(10) OCCURS 12 TIMES.
```
*(Note: COBOL tables are 1-indexed! The first element is MONTH-NAME(1))*

## Searching a Table
COBOL has built-in search functions! 
- `SEARCH`: A linear sequential search.
- `SEARCH ALL`: A highly optimized binary search (requires the table to be sorted and have keys).

To use `SEARCH`, you must define an index:
```cobol
05 MONTH-NAME PIC X(10) OCCURS 12 TIMES INDEXED BY IDX.
```

## Activity
Define an `OCCURS 5 TIMES` table named `DAYS`. In the Procedure division, move a value into the first index: `MOVE 'MONDAY' TO DAYS(1).`
