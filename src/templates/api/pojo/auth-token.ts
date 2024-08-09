import { TemplateFile } from '../../../types/types.js';

export const AuthTokenPojo = {
  fileName: 'AuthToken.java',
  folder: '/api/pojo',
  main: true,
  content: `package {{ groupId }}.api.pojo;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class AuthToken {
    private String password;
    private String username;
}
`,
} satisfies TemplateFile;
