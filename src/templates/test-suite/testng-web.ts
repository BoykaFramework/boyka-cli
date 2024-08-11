import { TemplateFile } from '../../types/types.js';

export const WebTestSuite = {
  fileName: 'testng-web.xml',
  folder: 'test-suite',
  content: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Boyka Framework Sample Web Suite" verbose="2">
    <test name="Sample Test Web">
        <classes>
            <class name="{{ groupId }}.web.LoginTest" />
        </classes>
    </test>
</suite>
`,
} satisfies TemplateFile;
