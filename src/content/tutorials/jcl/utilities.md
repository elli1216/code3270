# System Utilities

Mainframes come with built-in utility programs to perform common file and data operations without writing custom code.

## Essential Utilities
- **IEFBR14**: A dummy program that does nothing and returns 0. Useful for allocating or deleting datasets using just JCL DD statements.
- **IEBGENER**: Used to copy sequential datasets, or copy members of a partitioned dataset.
- **IDCAMS**: Used to define and manage VSAM datasets.
- **SORT (DFSORT/Syncsort)**: Extremely powerful utility for sorting, merging, and filtering data.

## Activity
Let's use `IEBGENER`.
Write a job step named `COPYSTEP` executing `IEBGENER`.
It requires four DD statements:
- `SYSUT1`: The input (can be `DD DUMMY`)
- `SYSUT2`: The output (can be `DD SYSOUT=*`)
- `SYSPRINT`: For logs (use `DD SYSOUT=*`)
- `SYSIN`: For control cards (use `DD DUMMY`)
