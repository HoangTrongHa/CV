const fs = require('fs');
const path = require('path');

// Đọc file interview-data.json
const dataPath = path.join(__dirname, '..', 'public', 'data', 'interview-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Tìm Frontend category
const frontendCategory = data.categories.find(cat => cat.id === 'frontend');

if (frontendCategory) {
  // Tạo file riêng cho từng subcategory của Frontend
  frontendCategory.subcategories.forEach(sub => {
    const subData = {
      id: sub.id,
      name: sub.name,
      description: sub.description,
      questions: sub.questions
    };
    
    const outputPath = path.join(__dirname, '..', 'public', 'data', `interview-${sub.id}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(subData, null, 2), 'utf-8');
    console.log(`✓ Created ${sub.id}.json with ${sub.questions.length} questions`);
  });
  
  console.log('\n✓ All Frontend subcategories split into separate files!');
}
