# Advanced JCL Capabilities

As you process daily batches of data, you need ways to handle files that change every day without rewriting your JCL.

## Generation Data Groups (GDGs)
A GDG is a group of chronologically related datasets. Instead of hardcoding a date in a filename (like `SALES.DATA.D231015`), you use relative generation numbers!
- `(0)`: The current/latest version.
- `(-1)`: Yesterday's version.
- `(+1)`: Creating tomorrow's new version!

Example creating a new GDG version:
```jcl
//OUTDD DD DSN=MY.DATA.GDG(+1),DISP=(NEW,CATLG,DELETE)
```

## Activity
Create a DD statement named `NEWDATA` that allocates a new generation `(+1)` for the dataset `PROD.DAILY.TRANS`. Set the disposition to `(NEW,CATLG,DELETE)`.
