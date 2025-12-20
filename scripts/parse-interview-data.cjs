const fs = require('fs');
const path = require('path');

// Cấu trúc categories
const categories = {
  frontend: {
    id: 'frontend',
    name: 'Frontend Development',
    icon: 'web',
    color: '#36e27b',
    subcategories: ['css', 'es6', 'html', 'javascript', 'react', 'typescript', 'web-api']
  },
  backend: {
    id: 'backend',
    name: 'Backend Development',
    icon: 'storage',
    color: '#4fc3f7',
    subcategories: ['csharp', 'django', 'microservice', 'nginx', 'nodejs', 'php', 'python', 'web-services', 'websocket']
  },
  database: {
    id: 'database',
    name: 'Database',
    icon: 'database',
    color: '#ff9800',
    subcategories: ['mongodb', 'mysql', 'postgresql', 'sql']
  },
  devops: {
    id: 'devops',
    name: 'DevOps',
    icon: 'settings',
    color: '#9c27b0',
    subcategories: ['docker', 'golang', 'kubernetes']
  },
  basics: {
    id: 'basics',
    name: 'Computer Science Basics',
    icon: 'school',
    color: '#f44336',
    subcategories: ['algorithms', 'cpp', 'cyber', 'data-structures', 'design-patterns', 'network', 'oops', 'os']
  },
  mobile: {
    id: 'mobile',
    name: 'Mobile Development',
    icon: 'phone_iphone',
    color: '#00bcd4',
    subcategories: ['android', 'ios', 'java', 'react-native']
  }
};

function parseMarkdownToQuestions(content, subcategoryName) {
  const questions = [];
  
  // Tách theo heading level 3 (###)
  const sections = content.split(/###\s+/);
  
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    
    // Tách question và answer
    const lines = section.split('\n');
    const firstLine = lines[0].trim();
    
    // Loại bỏ số thứ tự ở đầu
    const questionMatch = firstLine.match(/^\d+\.\s*(.+)$/);
    if (!questionMatch) continue;
    
    const question = questionMatch[1];
    const answer = lines.slice(1).join('\n').trim();
    
    // Xác định level dựa vào vị trí trong file
    let level = 'middle';
    const sectionText = sections.slice(0, i).join('');
    if (sectionText.includes('Fresher') || sectionText.includes('fresher')) {
      level = 'fresher';
    } else if (sectionText.includes('Senior') || sectionText.includes('senior')) {
      level = 'senior';
    }
    
    questions.push({
      question,
      answer: convertMarkdownToHtml(answer),
      level
    });
  }
  
  return questions;
}

function convertMarkdownToHtml(markdown) {
  let html = markdown;
  
  // Step 1: Extract and protect image tags
  const imagePlaceholders = [];
  // Match image markdown: ![alt](path) where path ends with image extension
  // Use lazy match for everything except the extension part
  html = html.replace(/!\[([^\]]*)\]\(((?:\.\/assets\/)?[^\s]+?\.(?:jpg|jpeg|png|gif|svg|webp))\)/gi, (match, alt, src) => {
    // Convert relative asset paths to absolute paths
    const cleanSrc = src.replace(/^\.\/assets\//, '/interview-assets/');
    const imgTag = `<img src="${cleanSrc}" alt="${alt}" />`;
    const placeholder = `###IMAGE###${imagePlaceholders.length}###`;
    imagePlaceholders.push(imgTag);
    return placeholder;
  });
  
  // Step 2: Process other markdown (now safe from interfering with image paths)
  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
  
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  
  // Bold
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
  
  // Unordered lists
  html = html.replace(/^\s*[-*+]\s+(.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
  
  // Paragraphs
  html = html.replace(/\n\n+/g, '</p><p>');
  html = '<p>' + html + '</p>';
  
  // Step 3: Restore image placeholders
  imagePlaceholders.forEach((imgTag, index) => {
    const placeholder = `###IMAGE###${index}###`;
    html = html.replace(placeholder, imgTag);
  });
  
  return html;
}

function getDescription(content) {
  // Lấy description từ phần đầu file (sau title, trước Mục lục)
  const descMatch = content.match(/^#[^\n]+\n\n([\s\S]+?)(?=\n##)/);
  if (descMatch) {
    return descMatch[1].trim().replace(/!\[.*?\]\(.*?\)/g, '').substring(0, 200);
  }
  return '';
}

async function parseInterviewData() {
  const result = { categories: [] };
  
  for (const [catKey, catData] of Object.entries(categories)) {
    const category = {
      id: catData.id,
      name: catData.name,
      icon: catData.icon,
      color: catData.color,
      subcategories: []
    };
    
    for (const sub of catData.subcategories) {
      const readmePath = path.join(__dirname, '..', '..', 'fullstack-interviews', catKey, sub, 'README.md');
      
      if (fs.existsSync(readmePath)) {
        try {
          const content = fs.readFileSync(readmePath, 'utf-8');
          const questions = parseMarkdownToQuestions(content, sub);
          
          // Lấy tên từ title trong README
          const titleMatch = content.match(/^#\s+(.+)$/m);
          const name = titleMatch ? titleMatch[1] : sub;
          
          if (questions.length > 0) {
            category.subcategories.push({
              id: sub,
              name: name,
              description: getDescription(content),
              questions: questions.slice(0, 15) // Giới hạn 15 câu đầu tiên
            });
            
            console.log(`✓ Parsed ${questions.length} questions from ${catKey}/${sub}`);
          }
        } catch (error) {
          console.error(`Error parsing ${readmePath}:`, error.message);
        }
      }
    }
    
    if (category.subcategories.length > 0) {
      result.categories.push(category);
    }
  }
  
  return result;
}

// Copy assets function
function copyAssets() {
  const sourceBase = path.join(__dirname, '..', '..', 'fullstack-interviews');
  const targetBase = path.join(__dirname, '..', 'public', 'interview-assets');
  
  // Create target directory if not exists
  if (!fs.existsSync(targetBase)) {
    fs.mkdirSync(targetBase, { recursive: true });
  }
  
  let copiedCount = 0;
  
  // Walk through all categories
  for (const catKey of Object.keys(categories)) {
    for (const sub of categories[catKey].subcategories) {
      const assetsPath = path.join(sourceBase, catKey, sub, 'assets');
      
      if (fs.existsSync(assetsPath)) {
        const files = fs.readdirSync(assetsPath);
        
        for (const file of files) {
          const sourcePath = path.join(assetsPath, file);
          const targetPath = path.join(targetBase, file);
          
          try {
            fs.copyFileSync(sourcePath, targetPath);
            copiedCount++;
          } catch (error) {
            console.error(`Error copying ${file}:`, error.message);
          }
        }
      }
    }
  }
  
  console.log(`✓ Copied ${copiedCount} asset files to ${targetBase}`);
}

// Main execution
parseInterviewData().then(data => {
  const outputPath = path.join(__dirname, '..', 'public', 'data', 'interview-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log('\n✓ Interview data saved to:', outputPath);
  console.log(`Total categories: ${data.categories.length}`);
  console.log(`Total subcategories: ${data.categories.reduce((sum, cat) => sum + cat.subcategories.length, 0)}`);
  
  // Copy assets
  console.log('\nCopying assets...');
  copyAssets();
}).catch(error => {
  console.error('Error:', error);
});
