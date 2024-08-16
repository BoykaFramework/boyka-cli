import { TemplateFile } from '../../types/types.js';

export const LoginTest = {
  fileName: 'LoginTest.java',
  folder: '/web/',
  test: true,
  content: `package {{ groupId }}.web;

import static {{ groupId }}.web.actions.LoginActions.verifyLogin;
import static {{ groupId }}.web.actions.LoginActions.verifyLogout;
import static io.github.boykaframework.actions.drivers.NavigateActions.navigate;
import static io.github.boykaframework.actions.drivers.WindowActions.onWindow;
import static io.github.boykaframework.enums.PlatformType.WEB;
import static io.github.boykaframework.manager.ParallelSession.clearSession;
import static io.github.boykaframework.manager.ParallelSession.createSession;

import org.testng.ITestResult;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class LoginTest {
    private static final String URL = "https://the-internet.herokuapp.com/login";

    @AfterMethod
    public void afterMethod (final ITestResult result) {
        if (!result.isSuccess ()) {
            onWindow ().takeScreenshot ();
        }
    }

    @BeforeClass (description = "Setup test class")
    public void setupClass () {
        createSession (WEB, "{{ configName }}");
        navigate ().to (URL);
    }

    @AfterClass (description = "Tear down test class")
    public void tearDownClass () {
        clearSession ();
    }

    @Test (description = "Test Login Flow")
    public void testLogin () {
        verifyLogin ();
        verifyLogout ();
    }
}
`,
} satisfies TemplateFile;
