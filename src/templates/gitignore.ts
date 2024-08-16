import { TemplateFile } from '../types/types.js';

export const GitIgnore = {
  fileName: '.gitignore',
  content: `target/
logs/
screenshots/
test-output/
.idea/
*.iml
`,
} satisfies TemplateFile;
