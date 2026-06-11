import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const srcDir = path.resolve('./src');
const files = walk(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  const fileDir = path.dirname(file);

  content = content.replace(/from\s+['"](\.\.?\/[^'"]+)['"]/g, (match, p1) => {
    // Resolve the relative path against the file's directory
    const resolvedPath = path.resolve(fileDir, p1);
    
    // Check if it resolves within the src directory
    if (resolvedPath.startsWith(srcDir)) {
      // Calculate the new absolute path relative to src
      const relativeToSrc = path.relative(srcDir, resolvedPath);
      // Replace with @/
      const newImport = `@/${relativeToSrc}`;
      modified = true;
      return `from '${newImport}'`;
    }
    
    return match;
  });

  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
});
