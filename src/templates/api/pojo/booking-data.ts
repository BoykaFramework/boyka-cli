import { TemplateFile } from '../../../types/types.js';

export const BookingDataPojo = {
  fileName: 'BookingData.java',
  folder: '/api/data/',
  main: true,
  content: `package {{ groupId }}.api.pojo;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class BookingData {
    private String       additionalneeds;
    private BookingDates bookingdates;
    private boolean      depositpaid;
    private String       firstname;
    private String       lastname;
    private int          totalprice;
}
`,
} satisfies TemplateFile;
