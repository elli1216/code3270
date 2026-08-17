# 🧵 String Manipulation

While COBOL is incredibly efficient at processing structured numeric data, you often need to manipulate plain text strings. Because COBOL allocates exact block sizes for memory, string manipulation behaves a bit differently than in modern dynamic languages.

The three core verbs for string manipulation are **`INSPECT`**, **`STRING`**, and **`UNSTRING`**.

---

## 1. The INSPECT Verb

`INSPECT` is used to examine a string from left to right, counting occurrences of specific characters and optionally replacing them.

### Counting Characters (TALLYING)

You can count how many times a character appears using the `TALLYING` clause.

```cobol
       INSPECT STRING-DATA TALLYING WS-COUNT FOR ALL '*'.
```

### Replacing Characters (REPLACING)

You can substitute characters inline.

```cobol
       INSPECT STRING-DATA REPLACING ALL '*' BY SPACES.
       INSPECT STRING-DATA REPLACING LEADING '0' BY SPACES.
```

_`LEADING` is very commonly used to strip leading zeros from a number string before printing it!_

### Combining Both

You can combine both actions in a single statement:

```cobol
       INSPECT STRING-DATA
           TALLYING WS-COUNT FOR CHARACTERS AFTER INITIAL 'A'
           REPLACING ALL 'X' BY 'Y'.
```

---

## 2. The STRING Verb (Concatenation)

The `STRING` verb concatenates (joins) two or more source strings into a single destination string. Because COBOL uses fixed-length memory, you must tell it exactly when to stop copying characters using the `DELIMITED BY` phrase.

```cobol
       STRING
           DAY-STR   DELIMITED BY SPACES
           '/'       DELIMITED BY SIZE
           MONTH-STR DELIMITED BY SPACES
           '/'       DELIMITED BY SIZE
           YEAR-STR  DELIMITED BY SPACES
           INTO FORMATTED-DATE
           ON OVERFLOW
               DISPLAY 'Error: String too large for destination!'.
```

- `DELIMITED BY SPACES` means it stops copying that segment when it hits a space.*
- `DELIMITED BY SIZE` means it copies the exact length of the item (like the `/` literal).*

---

## 3. The UNSTRING Verb (Splitting)

The `UNSTRING` verb acts like a `split()` function in modern languages. It breaks a single string into multiple smaller strings based on a delimiter.

```cobol
       UNSTRING RAW-DATE DELIMITED BY '/' OR '-'
           INTO DAY-STR, MONTH-STR, YEAR-STR
           ON OVERFLOW
               DISPLAY 'Error: Too many segments!'.
```

- If the `RAW-DATE` was `"15-06-2024"`, `DAY-STR` gets `"15"`, `MONTH-STR` gets `"06"`, and `YEAR-STR` gets `"2024"`.*

---

---

## 📚 Glossary of Clauses & Reserved Words

- **`INSPECT`**: A verb used to examine a string, character by character, from left to right.
- **`TALLYING`**: A clause used with INSPECT to count the occurrences of specific characters.
- **`REPLACING`**: A clause used with INSPECT to substitute specific characters with other characters.
- **`STRING`**: A verb used to concatenate (join) two or more strings together into a single destination.
- **`DELIMITED BY`**: A clause used with STRING and UNSTRING to specify the boundary character where the operation should stop.
- **`SIZE`**: Used with DELIMITED BY to indicate that the entire exact size of the variable should be copied.
- **`UNSTRING`**: A verb used to split a single string into multiple separate variables based on delimiters.
- **`INTO`**: Specifies the destination variable(s) for the results of a STRING or UNSTRING operation.
- **`ON OVERFLOW`**: A conditional clause that triggers if the destination variable is not large enough to hold the incoming string data.

---

## 💻 Activity: Formatting a Name

Let's use `STRING` to concatenate a first and last name!

**Your tasks:**

1. Setup the `IDENTIFICATION DIVISION` and `PROGRAM-ID. STRING-APP.`.
2. In the `WORKING-STORAGE SECTION`, define:
   - `01 WS-FIRST-NAME PIC X(10) VALUE 'ALICE     '.`
   - `01 WS-LAST-NAME  PIC X(10) VALUE 'SMITH     '.`
   - `01 WS-FULL-NAME  PIC X(25) VALUE SPACES.`
3. In the `PROCEDURE DIVISION`, use the `STRING` verb to concatenate the first name, a space, and the last name into `WS-FULL-NAME`. Remember to delimit the names by spaces, and the literal space `' '` by size!
4. `DISPLAY 'FULL NAME: ' WS-FULL-NAME`.
5. End with `STOP RUN.`.

**Sample Code to Start With:**

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. STRING-APP.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-FIRST-NAME PIC X(10) VALUE 'ALICE     '.
       01 WS-LAST-NAME  PIC X(10) VALUE 'SMITH     '.
       01 WS-FULL-NAME  PIC X(25) VALUE SPACES.

       PROCEDURE DIVISION.
       100-MAIN.
           STRING
               WS-FIRST-NAME DELIMITED BY SPACES
               ' '           DELIMITED BY SIZE
               WS-LAST-NAME  DELIMITED BY SPACES
               INTO WS-FULL-NAME.

           DISPLAY 'FULL NAME: ' WS-FULL-NAME.

           STOP RUN.
```
