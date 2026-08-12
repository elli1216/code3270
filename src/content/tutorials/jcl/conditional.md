# 🔀 Conditional Execution: Controlling the Job Flow

In modern CI/CD pipelines (like GitHub Actions or GitLab CI), you often configure deployment steps to run _only_ if the previous unit tests passed successfully. JCL has been doing this for decades! It allows you to evaluate the success or failure of previous steps before deciding whether to run the next one.

To control this flow, JCL provides two primary methods: the legacy `COND` parameter (which uses notoriously confusing reverse-logic) and the modern, developer-friendly **`IF/THEN/ELSE`** constructs.

---

## 1. Return Codes (The Condition Code)

Before you can write conditional logic, you need to know what you are evaluating. When a COBOL program or a system utility finishes running, it sends an exit status back to the operating system. In the mainframe world, this is called a **Return Code (RC)** or Condition Code.

Here are the standard IBM Return Codes you must know:

- **`0` (Success):** Perfect execution. Everything went exactly as planned.
- **`4` (Warning):** The program finished, but something minor happened (e.g., a file was empty, but the program handled it).
- **`8` (Error):** A significant issue occurred. The output might be invalid or incomplete.
- **`12` (Severe Error):** A catastrophic failure. The program likely crashed or was forced to abort.

_(Pro-Tip: When you write COBOL, you can actually set this code yourself by moving a number into the special `RETURN-CODE` register right before your `STOP RUN` statement!)_

---

## 2. IF/THEN/ELSE Constructs

To read these Return Codes, modern JCL allows you to wrap your `EXEC` steps inside `IF` statements. This reads exactly like a standard programming language.

```jcl
//STEP1   EXEC PGM=PROGA
//* Check if STEP1 was completely successful or just had a warning
//IF1     IF (STEP1.RC <= 4) THEN
//STEP2     EXEC PGM=PROGB
//ELSE1   ELSE
//STEP3     EXEC PGM=ERRORLOG
//END1    ENDIF

```

### The Syntax Breakdown

- **The Name:** Just like `JOB` and `EXEC` statements, your `IF`, `ELSE`, and `ENDIF` statements can (and usually should) have a name in column 3 (e.g., `IF1`, `ELSE1`, `END1`).
- **The Slashes:** Notice that even though this is a logical block, every single line still requires the `//` prefix in columns 1 and 2!
- **The Condition:** `(STEP1.RC <= 4)` explicitly checks the Return Code of a specific step named `STEP1`.

---

## 💻 Activity: The Gatekeeper

Let's protect a sensitive job step. Imagine `STEP2` runs a critical database update (`PROGB`), and you absolutely do not want it to run unless `STEP1` (`IEFBR14`) was a flawless success.

**Your tasks:**

1. Assume you already have `//STEP1 EXEC PGM=IEFBR14` written in your editor.
2. Directly below it, create an `IF` statement named `CHK1` (starting in column 3).
3. Write the condition to check if `STEP1.RC` is exactly equal to `0`. Don't forget the `THEN` keyword!
4. Inside the `IF` block, write your next step: `//STEP2 EXEC PGM=PROGB`.
5. Close the block by writing an `ENDIF` statement named `END1`.

**⚠️ Warning:** Be careful with your spacing! The keywords `IF` and `ENDIF` are Operations, meaning they must be separated from their Name fields (`CHK1`, `END1`) by at least one space.
