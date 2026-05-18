const fs = require('fs');
const path = require('path');

const componentsDir = path.join('c:', 'Users', 'being', 'Downloads', 'gift-box', 'src', 'components');

function walkAndReplace(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walkAndReplace(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('react-router-dom')) {
                // Same logic as before
                content = content.replace(/import\s+\{[^}]*Link[^}]*\}\s+from\s+['"]react-router-dom['"];?/g, "import Link from 'next/link';");
                content = content.replace(/import\s+\{[^}]*useNavigate[^}]*\}\s+from\s+['"]react-router-dom['"];?/g, "import { useRouter } from 'next/navigation';");
                content = content.replace(/useNavigate\(\)/g, "useRouter()");
                content = content.replace(/\bnavigate\(/g, "router.push(");
                content = content.replace(/const\s+navigate\s*=\s*useRouter/g, "const router = useRouter");
                content = content.replace(/import\s+\{[^}]*\}\s+from\s+['"]react-router-dom['"];?/g, "");
                
                if (content.includes('useRouter') && !content.startsWith("'use client'")) {
                    content = "'use client';\n" + content;
                }
                
                fs.writeFileSync(fullPath, content, 'utf8');
            }
        }
    }
}

walkAndReplace(componentsDir);
console.log("Components fixed.");
