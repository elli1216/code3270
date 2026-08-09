# JCL Foundations

Welcome to Job Control Language (JCL)! JCL is the scripting language used on IBM mainframe systems to instruct the operating system (z/OS) on how to run a batch job or start a subsystem.

## The Core Statements
Every JCL job requires at least these three types of statements:
1. **JOB**: Identifies the job to the system, provides accounting info, and sets job-level parameters.
2. **EXEC**: Specifies the program (or procedure) to be executed. A job can have multiple EXEC statements (each called a "step").
3. **DD (Data Definition)**: Allocates datasets (files) or system resources that the program requires.

## Syntax Rules
- **Prefix**: Every JCL statement (except data) MUST start with `//` in columns 1 and 2.
- **Name Field**: Starts in column 3. Max 8 characters (letters, numbers, @, #, $).
- **Operation Field**: (JOB, EXEC, DD) separated from the name by at least one space.
- **Operand Field**: Parameters separated from the operation by at least one space.

## Activity
Write a basic Job that executes the dummy program `IEFBR14`.
1. Name the job `MYJOB` with `JOB (123),'USER',CLASS=A,MSGCLASS=X`.
2. Name the step `STEP1` executing `IEFBR14`.
