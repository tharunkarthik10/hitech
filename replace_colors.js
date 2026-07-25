const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');
const tailwindConfig = path.join(__dirname, 'tailwind.config.js');

const colorMap = {
  // Dark Backgrounds & text
  '#0F172A': '#051923', // Ink Black
  '#18181b': '#051923',
  '#0F1B2D': '#003554', // Deep Space Blue
  '#0C1821': '#051923',
  '#1B2A41': '#003554',

  // Primary Blues
  '#1E3A8A': '#006494', // Baltic Blue
  '#0284c7': '#0582CA', // Steel Blue
  '#0ea5e9': '#00A6FB', // Fresh Sky
  '#020887': '#006494',
  '#334195': '#0582CA',

  // That weird green/yellow
  '#C6EBBE': '#00A6FB', // Replacing the light green with Fresh Sky, or maybe just white? Let's use #00A6FB for a bold look, or #e0f2fe (tailwind sky-100) if it's too dark. Actually, let's just make the green section white or slate-50.
  '#00C2CB': '#00A6FB',
};

// Also replace in tailwind config
let tw = fs.readFileSync(tailwindConfig, 'utf8');
for (const [oldC, newC] of Object.entries(colorMap)) {
  tw = tw.split(oldC).join(newC);
  tw = tw.split(oldC.toLowerCase()).join(newC);
}
// Fix the slate-50 that was set to green
tw = tw.replace(/"50": "#00A6FB"/g, '"50": "#f8fafc"');
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
  
  // also fix some specific tailwind classes if needed, but the hex codes cover the JIT classes like bg-[#1E3A8A]
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated:', file);
  }
});
