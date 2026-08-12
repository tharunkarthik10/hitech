const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  path.join(__dirname, 'src', 'pages', 'Manufacturing.tsx'),
  path.join(__dirname, 'src', 'pages', 'LaserCutting.tsx'),
  path.join(__dirname, 'src', 'pages', 'Products.tsx') // in case Products.tsx corresponds to "production"
];

filesToUpdate.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Pattern to find elements with "w-* h-* ... flex items-center justify-center" that don't have group-hover:rotate
    // We'll just replace 'flex items-center justify-center' with 'flex items-center justify-center group-hover:rotate-[360deg] group-hover:scale-110 transition-all duration-500'
    // But we need to make sure we don't duplicate them.
    content = content.replace(/group-hover:rotate-\[360deg\]/g, '');
    content = content.replace(/group-hover:scale-110/g, '');
    content = content.replace(/transition-all duration-500/g, 'transition-all duration-700'); // standardize
    content = content.replace(/transition-all duration-700/g, '');
    content = content.replace(/\s+/g, ' '); // simplify whitespace for a moment, wait, this will ruin formatting!
    
    // Actually, let's do targeted replaces using regex without ruining the file formatting
    content = fs.readFileSync(filePath, 'utf8'); // reload
    
    // Find all classNames containing 'flex items-center justify-center'
    // and make sure they have the animation classes.
    const regex = /className="([^"]*flex items-center justify-center[^"]*)"/g;
    content = content.replace(regex, (match, classes) => {
        let newClasses = classes;
        if (!newClasses.includes('group-hover:rotate-[360deg]')) {
            newClasses += ' group-hover:rotate-[360deg] group-hover:scale-110 transition-all duration-700';
        }
        // remove extra spaces
        newClasses = newClasses.replace(/\s+/g, ' ').trim();
        return `className="${newClasses}"`;
    });

    // Also look for classNames with template literals: className={`...`}
    const regex2 = /className=\{`([^`]*flex items-center justify-center[^`]*)`\}/g;
    content = content.replace(regex2, (match, classes) => {
        let newClasses = classes;
        if (!newClasses.includes('group-hover:rotate-[360deg]')) {
            newClasses += ' group-hover:rotate-[360deg] group-hover:scale-110 transition-all duration-700';
        }
        // remove extra spaces
        newClasses = newClasses.replace(/\s+/g, ' ').trim();
        return `className={\`${newClasses}\`}`;
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Enhanced icons in ${path.basename(filePath)}`);
  }
});
