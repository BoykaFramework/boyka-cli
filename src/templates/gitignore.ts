import { TemplateFile } from '../types/types.js';

export const gitignore = {
  fileName: '.gitignore',
  content: `target/
.idea/
*.iml
`,
} satisfies TemplateFile;
