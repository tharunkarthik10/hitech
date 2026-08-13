const fs = require('fs');
const path = require('path');

function replaceColorsInDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      replaceColorsInDirectory(fullPath);
    } else if (stat.isFile() && (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let modifiedContent = content
        // Replace main dark backgrounds with #051923
        .replace(/bg-\[\#003554\]/g, 'bg-[#051923]')
        .replace(/from-\[\#003554\]/g, 'from-[#051923]')
        .replace(/to-\[\#003554\]/g, 'to-[#051923]')
        .replace(/via-\[\#003554\]/g, 'via-[#051923]')
        .replace(/border-\[\#003554\]/g, 'border-[#051923]')
        .replace(/text-\[\#003554\]/g, 'text-[#051923]')
        .replace(/hover:bg-\[\#003554\]/g, 'hover:bg-[#051923]')
        .replace(/hover:border-\[\#003554\]/g, 'hover:border-[#051923]')
        
        .replace(/bg-\[\#00101A\]/g, 'bg-[#051923]')
        .replace(/from-\[\#00101A\]/g, 'from-[#051923]')
        .replace(/to-\[\#00101A\]/g, 'to-[#051923]')
        .replace(/via-\[\#00101A\]/g, 'via-[#051923]')
        .replace(/border-\[\#00101A\]/g, 'border-[#051923]')
        .replace(/text-\[\#00101A\]/g, 'text-[#051923]')
        .replace(/hover:bg-\[\#00101A\]/g, 'hover:bg-[#051923]')
        .replace(/hover:border-\[\#00101A\]/g, 'hover:border-[#051923]')
        
        // Replace card backgrounds with a slightly lighter shade of #051923 for contrast, e.g. #0a2738
        .replace(/bg-\[\#00253B\]/g, 'bg-[#0a2738]')
        .replace(/from-\[\#00253B\]/g, 'from-[#0a2738]')
        .replace(/to-\[\#00253B\]/g, 'to-[#0a2738]')
        .replace(/via-\[\#00253B\]/g, 'via-[#0a2738]')
        
        // Replace inner card elements like icon backgrounds
        .replace(/bg-\[\#001D2E\]/g, 'bg-[#0c3147]')
        .replace(/from-\[\#001D2E\]/g, 'from-[#0c3147]')
        .replace(/to-\[\#001D2E\]/g, 'to-[#0c3147]')
        .replace(/via-\[\#001D2E\]/g, 'via-[#0c3147]');
        
      if (content !== modifiedContent) {
        fs.writeFileSync(fullPath, modifiedContent, 'utf8');
        console.log(`Updated colors in ${fullPath}`);
      }
    }
  }
}

const srcDir = path.join(__dirname, 'src');
replaceColorsInDirectory(srcDir);
console.log("Color replacement complete.");
