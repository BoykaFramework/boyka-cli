import { TemplateFile } from '../../../types/types.js';

export const BookingTestDataPojo = {
  fileName: 'BookingTestData.java',
  folder: '/api/pojo/',
  test: true,
  content: `package {{ groupId }}.api.pojo;

import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class BookingTestData {
    private String additionalNeeds;
    private String checkInDate;
    private String checkOutDate;
    private String depositPaid;
    private String firstName;
    private String lastName;
    private Double srNo;
    private Double totalPrice;
}
`,
} satisfies TemplateFile;
