import { TemplateFile } from '../../../types/types.js';

export const BookingDatesPojo = {
  fileName: 'BookingDates.java',
  folder: '/api/pojo/',
  test: true,
  content: `package {{ groupId }}.api.pojo;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class BookingDates {
    private String checkin;
    private String checkout;
}
`,
} satisfies TemplateFile;
