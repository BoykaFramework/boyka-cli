import { TemplateFile } from '../../../types/types.js';

export const WdioHomePage = {
  fileName: 'WDIOHomePage.java',
  folder: '/mobile/pages/',
  test: true,
  content: `package {{ groupId }}.mobile.pages;

import static io.appium.java_client.AppiumBy.accessibilityId;

import io.github.boykaframework.builders.Locator;
import lombok.Getter;

@Getter
public class WDIOHomePage {
    private static final WDIOHomePage WDIO_HOME_PAGE = new WDIOHomePage ();

    public static WDIOHomePage wdioHomePage () {
        return WDIO_HOME_PAGE;
    }

    private final Locator dragTab    = Locator.buildLocator ()
        .{{ platform | downcase }} (accessibilityId ("Drag"))
        .name ("Drag Tab")
        .build ();
    
    private WDIOHomePage () {
        // Utility Class.
    }
}
`,
} satisfies TemplateFile;
