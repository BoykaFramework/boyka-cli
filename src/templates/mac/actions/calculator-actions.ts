import { TemplateFile } from '../../../types/types.js';

export const CalculatorActions = {
  fileName: 'CalculatorActions.java',
  folder: 'mac/actions',
  test: true,
  content: `package {{ groupId }}.mac.actions;

import static io.github.boykaframework.actions.elements.ClickableActions.withMouse;
import static io.github.boykaframework.actions.elements.ElementActions.onElement;
import static {{ groupId }}.mac.pages.CalculatorPage.calculatorPage;

public final class CalculatorActions {
    public static void verifyAdd (final int a, final int b) {
        final var expected = a + b;

        withMouse (calculatorPage ().getNumber (a)).click ();
        withMouse (calculatorPage ().getAdd ()).click ();
        withMouse (calculatorPage ().getNumber (b)).click ();
        withMouse (calculatorPage ().getEquals ()).click ();

        onElement (calculatorPage ().getInput ()).verifyText ()
            .endsWith (Integer.toString (expected));
    }

    private CalculatorActions () {
        // Utility class.
    }
}
`,
} satisfies TemplateFile;
