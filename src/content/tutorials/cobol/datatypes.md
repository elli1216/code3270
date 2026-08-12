# 💾 Data Types: Painting a `PICTURE` of Memory

If you are coming from languages like JavaScript or Python where variables dynamically adjust to whatever data you assign them, COBOL requires a paradigm shift. In the mainframe world, memory is strictly and precisely allocated before the program even runs.

You declare your variables in the `WORKING-STORAGE SECTION` of the `DATA DIVISION`. To tell the compiler exactly how many bytes of memory a variable needs, you use the **`PIC` (Picture)** clause. You are quite literally painting a picture of how the data looks in memory.

---

## 1. Common `PIC` Characters

COBOL uses specific symbols to define the shape and size of a variable.

- **`X` (Alphanumeric):** This is your standard String.
- _Example:_ `PIC X(10)` allocates exactly 10 characters of space. If you store the word `"BOB"` in it, COBOL will automatically pad the remaining 7 spaces with blanks.

- **`9` (Numeric):** This is for numbers.
- _Example:_ `PIC 9(4)` allows exactly 4 digits (e.g., `0123`). If you try to move `"A"` into this, the compiler will throw an error!

- **`V` (Implied Decimal):** To save precious memory, COBOL does not physically store the decimal point `.` character. Instead, it uses `V` to tell the compiler where the decimal _should_ be during calculations.
- _Example:_ `PIC 9(3)V99` represents a number like `999.99`. It only takes up 5 bytes of storage, but the compiler knows the last two digits are cents.

- **`S` (Signed):** If a number can be negative, you must include an `S`. If you omit the `S`, COBOL will automatically convert negative numbers to their absolute (positive) values!
- _Example:_ `PIC S9(4)` allows for `-1234`.

---

## 2. Computational Usage (`COMP`)

By default, COBOL stores numbers as human-readable text (known as `USAGE IS DISPLAY`). For example, the number `12` is stored as the character `"1"` and the character `"2"`.

While this makes data easy to read in a raw file, it is incredibly inefficient for doing math. Before the CPU can add two text numbers together, it has to convert them to binary, do the math, and convert them back. To solve this, we use `COMP` (Computational) formats:

- **`COMP` (or `COMP-4`):** Stores the number in pure machine binary. It is incredibly fast for standard integer math and loop counters.
- **`COMP-3` (Packed Decimal):** The legendary secret weapon of mainframe banking! It compresses two digits into a single byte of memory, leaving the final half-byte to store the `+` or `-` sign. It is highly space-efficient and prevents the floating-point rounding errors common in modern languages. If you are dealing with money in COBOL, you are using `COMP-3`.

---

## 💻 Activity: Declaring Your Data

Let's allocate some memory! In the editor on the right, you are going to define a customer profile.

**Your tasks:**

1. Set up the `DATA DIVISION` header.
2. Inside it, create the `WORKING-STORAGE SECTION` header.
3. Declare a top-level variable for a name using: `01 CUSTOMER-NAME PIC X(20).`
4. Declare a highly precise, bank-ready variable for money using: `01 ACCOUNT-BAL PIC S9(5)V99 COMP-3.`

**⚠️ Warning:** Remember your margins!

- Headers and the `01` level numbers MUST start in **Area A** (Column 8).
- The variable names (`CUSTOMER-NAME`) and their `PIC` clauses MUST start in **Area B** (Column 12).
- Do not forget the period `.` at the very end of your variable declarations!
