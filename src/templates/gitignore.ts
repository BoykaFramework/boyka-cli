import { TemplateFile } from '../types/types.js';

export const GitIgnore = {
  fileName: '.gitignore',
  content: `target/
.idea/
*.iml
`,
} satisfies TemplateFile;
