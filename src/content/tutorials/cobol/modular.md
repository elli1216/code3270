# Modular Design (Copybooks)

Enterprise COBOL programs can be massive. To keep code manageable, COBOL uses Copybooks and Subprograms.

## Copybooks
A Copybook is simply a text file containing COBOL code (usually Data Division layouts) that is physically injected into your program during compilation.
```cobol
COPY 'CUSTREC'. 
```
This pulls the code from a file named CUSTREC.cpy directly into your program.

## Subprograms (CALL)
You can call separate, compiled COBOL programs using the `CALL` statement.
Data is passed between programs using the `LINKAGE SECTION`.
```cobol
CALL 'CALCTAX' USING IN-AMOUNT, OUT-TAX.
```

## Activity
In your `PROCEDURE DIVISION`, write a statement to `CALL 'MATHPROG' USING NUM1, NUM2.` 
Make sure you understand that `NUM1` and `NUM2` must be defined in the `WORKING-STORAGE SECTION`.
