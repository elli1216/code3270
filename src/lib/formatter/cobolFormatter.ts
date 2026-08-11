export function formatCOBOL(code: string): string {
  const lines = code.split('\n')
  const formattedLines = lines.map(line => {
    // 1. Preserve empty lines
    if (line.trim() === '') return ''
    
    // 2. Preserve lines that are comments (have an asterisk in column 7 or just start with *)
    if (line.length >= 7 && (line[6] === '*' || line[6] === '/')) return line
    if (line.trim().startsWith('*') || line.trim().startsWith('/')) {
      // Re-align comment to column 7 if it was freely floating
      return '      *' + line.trim().substring(1)
    }

    const trimmed = line.trim()
    if (!trimmed) return line

    const upperTrimmed = trimmed.toUpperCase()

    // 3. Identify Area A keywords (Headers, Divisions, Sections, 01 levels, Paragraphs)
    const areaAKeywords = [
      'IDENTIFICATION DIVISION', 'ENVIRONMENT DIVISION', 'DATA DIVISION', 'PROCEDURE DIVISION',
      'SECTION.', 'PROGRAM-ID.', 'AUTHOR.', 'INSTALLATION.',
      'DATE-WRITTEN.', 'DATE-COMPILED.', 'SECURITY.', 'WORKING-STORAGE SECTION',
      'FILE SECTION', 'LINKAGE SECTION', '01 '
    ]
    
    const isAreaA = areaAKeywords.some(kw => upperTrimmed.startsWith(kw)) || (upperTrimmed.endsWith('.') && upperTrimmed.split(' ').length === 1)

    if (isAreaA) {
      // Pad to Column 8 (index 7, meaning 7 spaces)
      return '       ' + trimmed
    } else {
      // Pad to Column 12 (index 11, meaning 11 spaces)
      if (trimmed.match(/^(05|10|15|20|88)\s+/)) {
        return '           ' + trimmed
      }
      return '           ' + trimmed
    }
  })

  return formattedLines.join('\n')
}
