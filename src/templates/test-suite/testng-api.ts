import { TemplateFile } from '../../types/types.js';

export const ApiTestSuite = {
  fileName: 'testng-api.xml',
  folder: 'test-suite',
  content: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Boyka Framework Sample API Suite" verbose="2">
    <test name="Sample Test Rest API">
        <classes>
            <class name="{{ groupId }}.api.BookingTest">
                <methods>
                    <include name="testCreateBooking"/>
                    <include name="testGetBooking"/>
                    <include name="testUpdateBooking"/>
                    <include name="testUpdatePartialBooking"/>
                    <include name="testDeleteBooking"/>
                    <include name="testDeletedBooking"/>
                </methods>
            </class>
        </classes>
    </test>
</suite>
`,
} satisfies TemplateFile;
