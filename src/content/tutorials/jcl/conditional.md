# Conditional Execution in JCL

Often, you want a step to run only if the previous steps succeeded (or failed). JCL provides two primary ways to do this: the older `COND` parameter and the modern `IF/THEN/ELSE` constructs.

## Return Codes (Condition Codes)
When a program finishes, it issues a return code (RC). 
- `0`: Perfect success
- `4`: Warning
- `8`: Error
- `12`: Severe Error

## IF/THEN/ELSE
Modern JCL uses an IF statement which is much easier to read:
```jcl
//STEP1   EXEC PGM=PROGA
//IF1     IF (STEP1.RC <= 4) THEN
//STEP2   EXEC PGM=PROGB
//ENDIF   ENDIF
```

## Activity
Your code contains a `STEP1` executing `IEFBR14`. 
Add an `IF/THEN` block so that `STEP2` (executing `PROGB`) only runs if `STEP1.RC = 0`. Don't forget the `ENDIF`.
