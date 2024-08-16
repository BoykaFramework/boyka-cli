import { TemplateFile } from '../../types/types.js';

export const WdioTest = {
  fileName: 'WdioTest.java',
  folder: '/mobile/',
  test: true,
  content: `package {{ groupId }}.mobile;

import static {{ groupId }}.mobile.actions.DragDropAction.verifyDragDrop;
import static io.github.boykaframework.actions.drivers.DriverActions.withDriver;
import static io.github.boykaframework.actions.drivers.WindowActions.onWindow;
import static io.github.boykaframework.manager.ParallelSession.clearSession;
import static io.github.boykaframework.manager.ParallelSession.createSession;

import io.github.boykaframework.enums.PlatformType;
import org.testng.ITestResult;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

public class WdioTest {
    @AfterMethod
    public void afterMethod (final ITestResult result) {
        if (!result.isSuccess ()) {
            onWindow ().takeScreenshot ();
        }
    }

    @BeforeClass (description = "Setup test class")
    @Parameters ({ "platformType" })
    public void setupTestClass (final PlatformType platformType) {
        createSession (platformType, "{{ configName }}");
    }

    @AfterClass (description = "Tear down test class")
    public void tearDownTestClass () {
        withDriver ().saveLogs ();
        clearSession ();
    }

    @Test
    public void testDragDrop () {
        verifyDragDrop ();
    }
}
`,
} satisfies TemplateFile;
