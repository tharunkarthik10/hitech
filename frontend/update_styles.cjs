const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const filesToUpdate = [
  'Manufacturing.tsx',
  'LaserCutting.tsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(pagesDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove px-4 md:px-8 from wrappers
    content = content.replace(/px-4 md:px-8/g, '');

    // Replace max-w-[96%] with w-full
    content = content.replace(/max-w-\[96\%\]/g, 'w-full');

    // Remove rounded-[2rem] and rounded-2xl
    content = content.replace(/rounded-\[2rem\]/g, '');
    content = content.replace(/rounded-2xl/g, '');

    // Remove shadow-xl, shadow-2xl
    content = content.replace(/shadow-xl/g, '');
    content = content.replace(/shadow-2xl/g, '');

    // Replace w-full w-full (if it was added twice)
    content = content.replace(/w-full w-full/g, 'w-full');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
