const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Products.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/className=\{`w-full text-left px-6 py-4 flex items-center justify-between/g, 'className={`w-full text-left px-6 py-4 flex items-center justify-between group');
content = content.replace(/<DeptIcon className=\{`w-5 h-5 \$\{isDeptActive \? 'text-\[#00A6FB\]' : 'text-gray-400'\}`\}/g, '<DeptIcon className={`w-5 h-5 transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-110 ${isDeptActive ? \'text-[#00A6FB]\' : \'text-gray-400\'}`}');
content = content.replace(/<CatIcon className=\{`w-4 h-4 transition-colors duration-300/g, '<CatIcon className={`w-4 h-4 transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-110');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Enhanced Products.tsx');
