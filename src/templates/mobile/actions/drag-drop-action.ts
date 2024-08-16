import { TemplateFile } from '../../../types/types.js';

export const DragDropAction = {
  fileName: 'DragDropAction.java',
  folder: '/mobile/actions/',
  test: true,
  content: `package {{ groupId }}.mobile.actions;

import static {{ groupId }}.mobile.pages.DragDropPage.Direction.CENTER;
import static {{ groupId }}.mobile.pages.DragDropPage.Direction.LEFT;
import static {{ groupId }}.mobile.pages.DragDropPage.Direction.RIGHT;
import static {{ groupId }}.mobile.pages.DragDropPage.dragDropPage;
import static {{ groupId }}.mobile.pages.WDIOHomePage.wdioHomePage;
import static io.github.boykaframework.actions.elements.ElementActions.onElement;
import static io.github.boykaframework.actions.elements.FingerActions.withFinger;

import lombok.experimental.UtilityClass;

@UtilityClass
public class DragDropAction {
    public static void verifyDragDrop () {
        withFinger (wdioHomePage ().getDragTab ()).tap ();
        for (var index = 1; index <= 3; index++) {
            withFinger (dragDropPage ().sourceTile (LEFT, index))
                .dragTo (dragDropPage ().targetTile (LEFT, index));
            withFinger (dragDropPage ().sourceTile (CENTER, index))
                .dragTo (dragDropPage ().targetTile (CENTER, index));
            withFinger (dragDropPage ().sourceTile (RIGHT, index))
                .dragTo (dragDropPage ().targetTile (RIGHT, index));
        }
        onElement (dragDropPage ().getTitle ()).verifyText ()
            .isEqualTo ("Congratulations");
        onElement (dragDropPage ().getDescription ()).verifyText ()
            .isEqualTo ("You made it, click retry if you want to try it again.");
    }
}
`,
} satisfies TemplateFile;
