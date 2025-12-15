// Add custom fonts to jsPDF for Unicode support
export const addCustomFonts = async (doc: any) => {
  try {
    // Load Noto Sans font from Google Fonts or local
    // This is a placeholder - in production, you would load actual font files
    
    // For now, we'll configure jsPDF to use fonts that better support Unicode
    // The default fonts in jsPDF have limited Unicode support
    
    // Note: To properly support Vietnamese and Japanese characters,
    // you need to either:
    // 1. Use a library like pdfmake that has better Unicode support
    // 2. Convert custom fonts to base64 and add them to jsPDF
    // 3. Use a different PDF generation approach
    
    return true
  } catch (error) {
    console.warn('Could not load custom fonts:', error)
    return false
  }
}

// Helper to get font name based on locale
export const getFontForLocale = (locale: string): string => {
  switch (locale) {
    case 'vi':
    case 'ja':
      // For Vietnamese and Japanese, we need Unicode-capable fonts
      // 'courier' has better Unicode support than 'helvetica' in jsPDF
      return 'courier'
    default:
      return 'helvetica'
  }
}
