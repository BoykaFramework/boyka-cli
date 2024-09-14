import { TemplateFile } from '../../../types/types.js';

export const BookingRequestData = {
  fileName: 'BookingRequestData.java',
  test: true,
  folder: '/api/data',
  content: `package {{ groupId }}.api.data;

import static java.time.ZoneId.systemDefault;
import static java.time.format.DateTimeFormatter.ISO_LOCAL_DATE;
import static java.util.concurrent.TimeUnit.DAYS;

import {{ groupId }}.api.pojo.BookingData;
import {{ groupId }}.api.pojo.BookingDates;
import net.datafaker.Faker;

public final class BookingRequestData {
    private static final Faker FAKER = new Faker ();

    public static BookingData getBookingData () {
        final var formatter = ISO_LOCAL_DATE.withZone (systemDefault ());
        return BookingData.builder ()
            .firstname (FAKER.name ()
                .firstName ())
            .lastname (FAKER.name ()
                .lastName ())
            .totalprice (FAKER.number ()
                .numberBetween (1, 2000))
            .depositpaid (true)
            .bookingdates (BookingDates.builder ()
                .checkin (formatter.format (FAKER.timeAndDate ()
                    .past (20, DAYS)))
                .checkout (formatter.format (FAKER.timeAndDate ()
                    .future (5, DAYS)))
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
