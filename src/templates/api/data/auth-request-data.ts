import { TemplateFile } from '../../../types/types.js';

export const AuthRequestData = {
  fileName: 'AuthRequestData.java',
  test: true,
  folder: '/api/data',
  content: `package {{ groupId }}.api.data;

import {{ groupId }}.api.pojo.AuthToken;
import lombok.experimental.UtilityClass;

@UtilityClass
public final class AuthRequestData {
    public static AuthToken getTokenData () {
        return AuthToken.builder ()
            .username ("admin")
            .password ("password123")
            .build ();
    }
}
`,
} satisfies TemplateFile;
