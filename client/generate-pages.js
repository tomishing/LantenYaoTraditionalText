import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

const MAPPING = [
  { md: 'Overview.md', jsx: 'About.jsx', name: 'About' },
  { md: 'Nishikawa.md', jsx: 'MigrationLaos.jsx', name: 'MigrationLaos' },
  { md: 'Tateishi.md', jsx: 'MigrationChina.jsx', name: 'MigrationChina' },
  { md: 'Shimizu.md', jsx: 'Photoshooting.jsx', name: 'Photoshooting' },
];

const mdDir = path.join(process.cwd(), 'markdown');
const outDir = path.join(process.cwd(), 'src', 'pages');

MAPPING.forEach(item => {
  const mdPath = path.join(mdDir, item.md);
  const jsxPath = path.join(outDir, item.jsx);

  let markdown = fs.readFileSync(mdPath, 'utf8');

  // Strip frontmatter if exists (simple regex)
  markdown = markdown.replace(/^---\n[\s\S]*?\n---\n/, '');

  // Replace Obsidian style image links ![[file.jpg]] with standard ![file](/file.jpg)
  markdown = markdown.replace(/!\[\[(.*?)\]\]/g, '![image](/$1)');

  // Convert to HTML
  const html = marked(markdown);

  const componentCode = `import React from 'react';
import { Container } from 'react-bootstrap';

const ${item.name} = () => {
    return (
        <Container className="mt-4 mb-5 markdown-body">
            <div dangerouslySetInnerHTML={{ __html: ${JSON.stringify(html)} }} />
        </Container>
    );
};

export default ${item.name};
`;

  fs.writeFileSync(jsxPath, componentCode, 'utf8');
  console.log(`Generated ${item.jsx}`);
});
