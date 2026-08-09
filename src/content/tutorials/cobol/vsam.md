# VSAM KSDS Processing

VSAM (Virtual Storage Access Method) is IBM's highly efficient file storage system. A **KSDS** (Key Sequenced Data Set) is like a NoSQL database—you access records instantly via a primary key (like a Customer ID).

## Defining a VSAM File
In the Environment Division, you define the file organization:
```cobol
SELECT CUST-FILE ASSIGN TO CUSTFILE
       ORGANIZATION IS INDEXED
       ACCESS MODE IS RANDOM
       RECORD KEY IS CUST-ID.
```

## Reading by Key
To read a specific record, you move the target ID into the key variable, then read!
```cobol
MOVE '12345' TO CUST-ID.
READ CUST-FILE
    INVALID KEY DISPLAY 'Customer Not Found!'
    NOT INVALID KEY DISPLAY 'Found: ' CUST-NAME
END-READ.
```

## Activity
Assuming `CUST-FILE` is defined, write a `READ CUST-FILE` statement handling the `INVALID KEY` condition with a DISPLAY message.
