import { TemplateFile } from '../../../types/types.js';

export const DragDropPage = {
  fileName: 'DragDropPage.java',
  folder: '/mobile/pages/',
  test: true,
  content: `package {{ groupId }}.mobile.pages;

import static io.appium.java_client.AppiumBy.accessibilityId;
import static io.appium.java_client.AppiumBy.androidUIAutomator;
import static java.text.MessageFormat.format;

import io.github.boykaframework.builders.Locator;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class DragDropPage {
    private static final DragDropPage DRAG_DROP_PAGE = new DragDropPage ();

    public static DragDropPage dragDropPage () {
        return DRAG_DROP_PAGE;
    }

    @AllArgsConstructor
    @Getter
    public enum Direction {
        LEFT ("l"),
        CENTER ("c"),
        RIGHT ("r");

        private final String initial;
    }

    private final Locator screen      = Locator.buildLocator ()
        .{{ platform | downcase }} (accessibilityId ("Drag-drop-screen"))
        .name ("Drag Drop screen")
        .build ();
    private final Locator retryButton = Locator.buildLocator ()
        .parent (this.screen)
        .name ("Retry Button")
        .{{ platform | downcase }} (accessibilityId ("button-Retry"))
        .build ();
    private final Locator description = Locator.buildLocator ()
        .{{ platform | downcase }} (
        {% if platform == "Android" %}androidUIAutomator (
        "new UiSelector().textStartsWith(\\"You made it\\")"{% else %}iOSNsPredicateString (
        "label BEGINSWITH \\"You made it\\""){% endif %}))
        .parent (this.screen)
        .name ("Description")
        .build ();
    private final Locator title       = Locator.buildLocator ()
        .{{ platform | downcase }} (
        {% if platform == "Android" %}androidUIAutomator (
        "new UiSelector().text(\\"Congratulations\\")"{% else %}iOSNsPredicateString (
        "label == \\"Congratulations\\""){% endif %}))
        .parent (this.screen)
        .name ("Title")
        .build ();

    public Locator sourceTile (final Direction direction, final int index) {
        return Locator.buildLocator ()
            .name (format ("{0} Source Tile [{1}]", direction.name (), index))
            .{{ platform | downcase }} (
                accessibilityId (format ("drag-{0}{1}", direction.getInitial (), index)))
            .build ();
    }

    public Locator targetTile (final Direction direction, final int index) {
        return Locator.buildLocator ()
            .name (format ("{0} Target Tile [{1}]", direction.name (), index))
            .{{ platform | downcase }} (
                accessibilityId (format ("drop-{0}{1}", direction.getInitial (), index)))
            .build ();
    }
}
`,
} satisfies TemplateFile;
