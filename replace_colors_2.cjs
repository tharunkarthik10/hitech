const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');
const tailwindConfig = path.join(__dirname, 'tailwind.config.js');

const colorMap = {
  // Previous darks
  '#051923': '#0C1821', 
  '#003554': '#1B2A41', 

  // Previous blues
  '#006494': '#324A5F', 
  '#0582CA': '#324A5F', 
  '#00A6FB': '#324A5F', 
};

// Also replace in tailwind config
let tw = fs.readFileSync(tailwindConfig, 'utf8');
for (const [oldC, newC] of Object.entries(colorMap)) {
  tw = tw.split(oldC).join(newC);
  tw = tw.split(oldC.toLowerCase()).join(newC);
}
fs.writeFileSync(tailwindConfig, tw);

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(directoryPath);
files.push(path.join(__dirname, 'index.html'));

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  for (const [oldColor, newColor] of Object.entries(colorMap)) {
    // Case insensitive replace for hex codes
    const regex = new RegExp(oldColor, 'gi');
    if (regex.test(content)) {
      content = content.replace(regex, newColor);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated:', file);
  }
});
