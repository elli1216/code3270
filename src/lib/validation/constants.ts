export const COBOL_SPECS = {
  COLUMNS: {
    SEQUENCE_END: 6,
    INDICATOR: 6,
    AREA_A_START: 7,
    AREA_A_END: 11,
    AREA_B_START: 11,
    AREA_B_END: 72,
    MAX_LINE_LENGTH: 72,
  },
  INDICATORS: [' ', '*', '/', '-'],
  MANDATORY_DIVISIONS: ['IDENTIFICATION DIVISION'],
  MANDATORY_PARAGRAPHS: ['PROGRAM-ID.'],
  AREA_A_HEADERS: ['IDEN', 'PROG', 'PROC', 'DATA', 'WORK', 'ENVI', 'FD'],
  AREA_A_LEVELS: ['01', '77'],
  AREA_B_STATEMENTS: [
    'DISPLAY',
    'MOVE',
    'ADD',
    'SUBTRACT',
    'COMPUTE',
    'PERFORM',
    'STOP RUN',
    'GOBACK',
    'IF',
    'ELSE',
    'END-IF',
    'OPEN',
    'CLOSE',
    'READ',
    'WRITE',
  ],
}

export const JCL_SPECS = {
  PREFIXES: ['//', '/*'],
  MAX_NAME_LENGTH: 8,
  NAME_PATTERN: /^[A-Z#$@][A-Z0-9#$@]*$/,
}
