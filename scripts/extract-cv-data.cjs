const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const cvPath = path.join(__dirname, '../public/data/Hoang_Trong_Ha_CV.docx');
const outputPath = path.join(__dirname, '../public/data/cv-data.json');

mammoth.extractRawText({ path: cvPath })
  .then(result => {
    const text = result.value;
    console.log('=== CV Content ===');
    console.log(text);
    console.log('\n=== Extracting structured data ===');
    
    // Parse the CV content
    const lines = text.split('\n').filter(line => line.trim());
    
    // Initialize data structure
    const cvData = {
      personalInfo: {
        name: '',
        title: '',
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        location: ''
      },
      summary: '',
      skills: [],
      experience: [],
      education: [],
      projects: []
    };
    
    // Simple parsing logic (will need adjustment based on actual CV structure)
    let currentSection = '';
    
    lines.forEach((line, index) => {
      const lowerLine = line.toLowerCase();
      
      // Detect sections
      if (lowerLine.includes('experience') || lowerLine.includes('kinh nghiệm')) {
        currentSection = 'experience';
      } else if (lowerLine.includes('education') || lowerLine.includes('học vấn')) {
        currentSection = 'education';
      } else if (lowerLine.includes('skill') || lowerLine.includes('kỹ năng')) {
        currentSection = 'skills';
      } else if (lowerLine.includes('project') || lowerLine.includes('dự án')) {
        currentSection = 'projects';
      } else if (lowerLine.includes('summary') || lowerLine.includes('tóm tắt')) {
        currentSection = 'summary';
      }
      
      // Extract email
      if (line.includes('@')) {
        const emailMatch = line.match(/[\w.-]+@[\w.-]+\.\w+/);
        if (emailMatch) cvData.personalInfo.email = emailMatch[0];
      }
      
      // Extract phone
      if (line.match(/\+?\d{10,}/)) {
        const phoneMatch = line.match(/\+?\d[\d\s()-]{9,}/);
        if (phoneMatch) cvData.personalInfo.phone = phoneMatch[0].trim();
      }
      
      // Extract LinkedIn
      if (lowerLine.includes('linkedin')) {
        cvData.personalInfo.linkedin = line;
      }
      
      // Extract GitHub
      if (lowerLine.includes('github')) {
        cvData.personalInfo.github = line;
      }
    });
    
    // Save raw text for manual review
    const outputData = {
      raw: text,
      structured: cvData,
      lines: lines
    };
    
    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf8');
    console.log('\n✅ Data extracted successfully!');
    console.log('Output saved to:', outputPath);
    console.log('\nPlease review the extracted data and manually create cv-data.json with proper structure.');
  })
  .catch(err => {
    console.error('Error reading CV:', err);
  });
