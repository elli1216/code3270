# 🛡️ Resilience & Recovery: Picking Up the Pieces

In enterprise computing, batch jobs run overnight during a very strict, time-limited "batch window" before the bank or business opens the next morning.

Imagine a job with 50 steps that takes 4 hours to run. If it fails on Step 45 because a disk ran out of space, you absolutely cannot afford to fix the disk and start over from Step 1! Not only would you miss your morning deadline, but running steps 1 through 44 a second time might duplicate financial transactions or corrupt your database.

You need to pick up exactly where you left off.

---

## 1. The `RESTART` Parameter

To solve this, JCL allows you to modify the master `JOB` statement at the very top of your script using the `RESTART` parameter. This instructs the z/OS operating system to completely ignore and bypass all preceding steps, resuming execution exactly at the step you specify.

```jcl
//MYJOB    JOB (12345),'NIGHTLY BATCH',CLASS=A,RESTART=STEP45

```

_When you submit this job, the system will scan past steps 1 through 44, do nothing, and immediately begin executing `STEP45`._

### Restarting Inside a PROC (Dot Notation)

What if the job failed inside a reusable Procedure (PROC)? If `STEP45` calls a PROC, and the failure happened on the second step _inside_ that PROC, you use dot notation to pinpoint the exact location:

```jcl
//MYJOB    JOB (12345),'RESTART TEST',RESTART=STEP45.PROCSTP2

```

_This tells the system: "Go to `STEP45`, look inside the PROC it is calling, and resume execution at `PROCSTP2`."_

---

## 2. A Word of Warning: Data State

While the `RESTART` parameter is incredibly powerful, it is purely a traffic director—it only controls the execution flow. It **does not** magically reset your data!

If a step failed halfway through writing to a file, that file is now half-full of garbage data. Before you submit a job with a `RESTART`, it is up to you, the programmer, to manually delete or clean up any corrupted datasets from the failed run. (This is exactly why utilities like `IEFBR14` are so useful for deleting and re-allocating files before a step runs!)

---

## 💻 Activity: The Skip Forward

Let's practice bypassing successful steps. Imagine you have a JCL script with three steps (`STEP1`, `STEP2`, and `STEP3`). `STEP1` ran successfully, but `STEP2` crashed. You have fixed the error and are ready to resume.

**Your tasks:**

1. Assume your original `JOB` statement looks like this:
   `//NIGHTLY  JOB (999),'USER',CLASS=A,MSGCLASS=X`
2. Modify that `JOB` statement by adding the `RESTART` parameter to the end of the parameter list.
3. Set the restart value so the system completely skips `STEP1` and begins execution directly at `STEP2`.

**⚠️ Warning:** Remember that the `RESTART` parameter belongs in the Operand field of the `JOB` statement. Ensure it is separated from the previous parameters by a comma, with absolutely **no spaces** in the parameter list!
