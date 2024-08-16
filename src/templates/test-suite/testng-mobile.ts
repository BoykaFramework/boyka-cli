import { TemplateFile } from '../../types/types.js';

export const MobileTestSuite = {
  fileName: 'testng-mobile.xml',
  folder: '/test-suite/',
  content: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Boyka Framework Local Mobile Suite" verbose="2">
    <test name="Test Mobile on Local {{ platform }} virtual device">
        <parameter name="platformType" value="{{ platform | upcase }}"/>
        <classes>
            <class name="{{ groupId }}.mobile.WdioTest"/>
        </classes>
    </test>
</suite>
`,
} satisfies TemplateFile;
