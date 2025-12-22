const fs = require('fs');
const path = require('path');

// Đọc file interview-data.json
const dataPath = path.join(__dirname, '..', 'public', 'data', 'interview-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Tìm Backend category để lấy Microservice
const backendCategory = data.categories.find(cat => cat.id === 'backend');
const microserviceSub = backendCategory?.subcategories.find(sub => sub.id === 'microservice');

// Tìm DevOps category để lấy Docker
const devopsCategory = data.categories.find(cat => cat.id === 'devops');
const dockerSub = devopsCategory?.subcategories.find(sub => sub.id === 'docker');

if (microserviceSub) {
  const microserviceData = {
    id: microserviceSub.id,
    name: microserviceSub.name,
    description: microserviceSub.description,
    questions: microserviceSub.questions
  };
  
  const outputPath = path.join(__dirname, '..', 'public', 'data', 'interview-microservice.json');
  fs.writeFileSync(outputPath, JSON.stringify(microserviceData, null, 2), 'utf-8');
  console.log(`✓ Created microservice.json with ${microserviceData.questions.length} questions`);
}

if (dockerSub) {
  const dockerData = {
    id: dockerSub.id,
    name: dockerSub.name,
    description: dockerSub.description,
    questions: dockerSub.questions
  };
  
  const outputPath = path.join(__dirname, '..', 'public', 'data', 'interview-docker.json');
  fs.writeFileSync(outputPath, JSON.stringify(dockerData, null, 2), 'utf-8');
  console.log(`✓ Created docker.json with ${dockerData.questions.length} questions`);
}

console.log('\n✓ Microservice and Docker files created successfully!');
