import { TemplateFile } from '../../../types/types.js';

export const BookingRequestData = {
  fileName: 'BookingRequestData.java',
  test: true,
  folder: '/api/data',
  content: `package {{ groupId }}.api.data;

import java.text.SimpleDateFormat;
import java.util.concurrent.TimeUnit;

import {{ groupId }}.api.pojo.BookingData;
import {{ groupId }}.api.pojo.BookingDates;
import net.datafaker.Faker;

public final class BookingRequestData {
    private static final Faker FAKER = new Faker ();

    public static BookingData getBookingData () {
        final var formatter = new SimpleDateFormat ("yyyy-MM-dd");
        return BookingData.builder ()
            .firstname (FAKER.name ()
                .firstName ())
            .lastname (FAKER.name ()
                .lastName ())
            .totalprice (FAKER.number ()
                .numberBetween (1, 2000))
            .depositpaid (true)
            .bookingdates (BookingDates.builder ()
                .checkin (formatter.format (FAKER.date ()
                    .past (20, TimeUnit.DAYS)))
                .checkout (formatter.format (FAKER.date ()
                    .future (5, TimeUnit.DAYS)))
                .build ())
            .additionalneeds ("Breakfast")
            .build ();
    }

    public static BookingData getPartialBookingData () {
        return BookingData.builder ()
            .firstname (FAKER.name ()
                .firstName ())
            .totalprice (FAKER.number ()
                .numberBetween (100, 5000))
            .build ();
    }

    private BookingRequestData () {
        // Utility Class.
    }
}
`,
} satisfies TemplateFile;
