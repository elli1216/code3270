export interface ActivityRule {
  requiredKeywords: string[];
  forbiddenKeywords?: string[];
  regexValidations?: {
    pattern: RegExp;
    errorMessage: string;
  }[];
  customValidator?: (code: string) => { valid: boolean; message?: string } | null;
}

export const ACTIVITY_RULES: Record<string, ActivityRule> = {
  // --- JCL Track ---
  'jcl-foundations': {
    requiredKeywords: ['JOB', 'EXEC', 'DD', 'PGM=IEFBR14', 'MYJOB', 'STEP1'],
  },
  'jcl-conditional': {
    requiredKeywords: ['PGM=IEFBR14', 'IF', 'THEN', 'ENDIF', 'RC', 'PGM=PROGB'],
    regexValidations: [
      {
        pattern: /IF\s*\(\s*STEP1\.RC\s*(<=|=)\s*(4|0)\s*\)\s*THEN/i,
        errorMessage: 'Check your IF statement condition. It should check if STEP1.RC = 0 or <= 4.'
      }
    ]
  },
  'jcl-utilities': {
    requiredKeywords: ['EXEC', 'PGM=IEBGENER', 'SYSUT1', 'SYSUT2', 'SYSPRINT', 'SYSIN', 'COPYSTEP'],
    regexValidations: [
      {
        pattern: /DD\s+DUMMY/i,
        errorMessage: 'Make sure you use DD DUMMY for SYSUT1 and SYSIN as requested.'
      },
      {
        pattern: /DD\s+SYSOUT=\*/i,
        errorMessage: 'Make sure you use DD SYSOUT=* for SYSUT2 and SYSPRINT.'
      }
    ]
  },
  'jcl-advanced': {
    requiredKeywords: ['DD', 'NEWDATA', '(+1)', 'DISP=(NEW,CATLG,DELETE)'],
    regexValidations: [
      {
        pattern: /DSN=PROD\.DAILY\.TRANS\(\+1\)/i,
        errorMessage: 'Make sure you allocate the dataset exactly as DSN=PROD.DAILY.TRANS(+1).'
      }
    ]
  },
  'jcl-flexibility': {
    requiredKeywords: ['PROC', 'BACKUP', 'LVL', 'EXEC', 'PGM=IEBGENER'],
  },
  'jcl-resilience': {
    requiredKeywords: ['JOB', 'RESTART=STEP2'],
  },

  // --- COBOL Track ---
  'cobol-anatomy': {
    requiredKeywords: ['IDENTIFICATION DIVISION', 'PROGRAM-ID', 'HELLO-WORLD', 'PROCEDURE DIVISION', 'DISPLAY', 'STOP RUN'],
  },
  'cobol-datatypes': {
    requiredKeywords: ['WORKING-STORAGE SECTION', 'CUSTOMER-NAME', 'ACCOUNT-BAL', 'COMP-3'],
    regexValidations: [
      {
        pattern: /PIC\s+S9\(5\)V99\s+COMP-3/i,
        errorMessage: 'You must define ACCOUNT-BAL strictly as PIC S9(5)V99 COMP-3.'
      },
      {
        pattern: /PIC\s+X\(20\)/i,
        errorMessage: 'You must define CUSTOMER-NAME strictly as PIC X(20).'
      }
    ]
  },
  'cobol-controlflow': {
    requiredKeywords: ['PERFORM', 'TIMES', 'DISPLAY'],
    regexValidations: [
      {
        pattern: /PERFORM\s+5\s+TIMES/i,
        errorMessage: 'Make sure you use "PERFORM 5 TIMES".'
      }
    ]
  },
  'cobol-tables': {
    requiredKeywords: ['OCCURS 5 TIMES', 'DAYS', 'MOVE', 'DAYS(1)'],
    regexValidations: [
      {
        pattern: /MOVE\s+'MONDAY'/i,
        errorMessage: 'Make sure you move the string \'MONDAY\' into the table.'
      }
    ]
  },
  'cobol-modular': {
    requiredKeywords: ['CALL', "'MATHPROG'", 'USING', 'NUM1', 'NUM2'],
  },
  'cobol-sequential': {
    requiredKeywords: ['OPEN INPUT', 'CUST-FILE', 'CLOSE CUST-FILE'],
  },
  'cobol-vsam': {
    requiredKeywords: ['READ', 'CUST-FILE', 'INVALID KEY', 'DISPLAY'],
  },
  'cobol-exception': {
    requiredKeywords: ['IF', 'WS-FILE-STATUS', "'22'", 'DISPLAY', "'Duplicate Key Error!'"],
  }
}

export function validateActivity(track: string, moduleId: string, code: string) {
  const ruleId = `${track}-${moduleId}`
  const rule = ACTIVITY_RULES[ruleId]
  
  if (!rule) {
    // If no specific rules exist, just return success
    return []
  }

  const codeUpper = code.toUpperCase()
  
  // 1. Check Required Keywords
  for (const kw of rule.requiredKeywords) {
    if (!codeUpper.includes(kw.toUpperCase())) {
      return [{ line: 1, message: `Activity requirement missing: ${kw}`, severity: 'error' as const }]
    }
  }

  // 2. Check Forbidden Keywords
  if (rule.forbiddenKeywords) {
    for (const kw of rule.forbiddenKeywords) {
      if (codeUpper.includes(kw.toUpperCase())) {
        return [{ line: 1, message: `You used a forbidden keyword for this activity: ${kw}`, severity: 'error' as const }]
      }
    }
  }

  // 3. Check Regex Validations
  if (rule.regexValidations) {
    for (const validation of rule.regexValidations) {
      if (!validation.pattern.test(code)) {
        return [{ line: 1, message: validation.errorMessage, severity: 'error' as const }]
      }
    }
  }

  // 4. Custom Validator
  if (rule.customValidator) {
    const result = rule.customValidator(code)
    if (result && !result.valid) {
      return [{ line: 1, message: result.message || 'Custom validation failed.', severity: 'error' as const }]
    }
  }

  return []
}
