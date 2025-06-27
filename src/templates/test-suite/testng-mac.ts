import { TemplateFile } from '../../types/types.js';

export const MacTestSuite = {
  fileName: 'testng-mac.xml',
  folder: '/test-suite/',
  content: `<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Boyka Framework Desktop MacOS Suite" verbose="2">
    <test name="Test Desktop on MacOS machine">
        <classes>
            <class name="{{ groupId }}.mac.CalculatorTest"/>
        </classes>
    </test>
</suite>
`,
} satisfies TemplateFile;
