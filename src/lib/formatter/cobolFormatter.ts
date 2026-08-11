export function formatCOBOL(code: string): string {
  const lines = code.split('\n')
  const formattedLines = lines.map(line => {
    // 1. Preserve empty lines
    if (line.trim() === '') return ''
    
    // 2. Preserve lines that are comments (have an asterisk in column 7 or just start with *)
    if (line.length >= 7 && line[6] === '*') return line
    if (line.trim().startsWith('*')) return line

    const trimmed = line.trim()
    if (!trimmed) return line

    // 3. Identify Area A keywords (Headers, Divisions, Sections, 01 levels, Paragraphs)
    const areaAKeywords = [
      'DIVISION.', 'SECTION.', 'PROGRAM-ID.', 'AUTHOR.', 'INSTALLATION.',
      'DATE-WRITTEN.', 'DATE-COMPILED.', 'SECURITY.', 'ENVIRONMENT', 'DATA', 
      'PROCEDURE', 'WORKING-STORAGE', 'FILE', 'LINKAGE', '01 '
    ]
    
    const isAreaA = areaAKeywords.some(kw => trimmed.toUpperCase().includes(kw)) || trimmed.endsWith('.') && !trimmed.includes(' ')

    // 4. Identify Area B keywords (Commands, nested levels)
    // Everything that is not Area A is Area B
    
    if (isAreaA) {
      // Pad to Column 8 (index 7, meaning 7 spaces)
      return '       ' + trimmed
    } else {
      // Pad to Column 12 (index 11, meaning 11 spaces)
      // Check if it's a sub-level (05, 10, etc.) and add extra indentation if desired,
      // but standard COBOL just requires Area B (col 12+)
      if (trimmed.match(/^(05|10|15|20|88)\s+/)) {
        return '           ' + trimmed
      }
      return '           ' + trimmed
    }
  })

  return formattedLines.join('\n')
}
