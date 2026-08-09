# Control Flow

COBOL provides powerful ways to handle logic and loops.

## IF Statements
```cobol
IF ACCOUNT-BAL > 1000
    DISPLAY 'High Balance'
ELSE
    DISPLAY 'Normal Balance'
END-IF.
```

## EVALUATE (Switch/Case)
```cobol
EVALUATE TRUE
    WHEN AGE < 18
        DISPLAY 'Minor'
    WHEN OTHER
        DISPLAY 'Adult'
END-EVALUATE.
```

## PERFORM (Loops)
The `PERFORM` statement is used for loops and calling paragraphs (like functions).
```cobol
PERFORM VARYING COUNTER FROM 1 BY 1 UNTIL COUNTER > 10
    DISPLAY 'Count: ' COUNTER
END-PERFORM.
```

## Activity
Write a `PERFORM` loop that loops exactly 5 times. Inside the loop, `DISPLAY 'Hello'`.
