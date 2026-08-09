# Resilience & Recovery

When a batch job containing 50 steps fails at step 45, you don't want to rerun the entire job! 

## The RESTART Parameter
You can tell z/OS to begin execution at a specific step by adding the `RESTART` parameter directly to the `JOB` statement.

```jcl
//MYJOB JOB (123),'USER',RESTART=STEP45
```

If a step is inside a PROC, you use dot notation: `RESTART=STEP45.PROCSTEP2`.

## Activity
You have a job with `STEP1`, `STEP2`, and `STEP3`. 
Add a `RESTART=STEP2` parameter to the JOB statement so the system skips `STEP1`.
