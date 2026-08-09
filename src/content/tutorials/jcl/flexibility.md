# Flexibility & Versioning

Instead of writing the same JCL over and over, you can package JCL into a **Procedure (PROC)**. 

## PROCs
A PROC is a block of JCL that can be invoked multiple times. They can be stored in a system library (Cataloged) or defined at the top of your job (Instream).

## Symbolic Parameters
You can make PROCs flexible by using variables, known as Symbolic Parameters, prefixed with an ampersand (`&`).
```jcl
//MYPROC PROC ENV='DEV'
//STEP1  EXEC PGM=MYPGM
//FILE1  DD DSN=APP.&ENV..DATA,DISP=SHR
//       PEND
```
If you execute this PROC with `// EXEC MYPROC,ENV='PROD'`, the dataset resolves to `APP.PROD.DATA`.

## Activity
Write an instream PROC named `BACKUP` with one parameter `LVL`. Inside, have an EXEC step that runs `IEBGENER`.
