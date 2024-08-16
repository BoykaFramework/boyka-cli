import { TemplateFile } from '../../../types/types.js';

export const BookingRequest = {
  fileName: 'BookingRequest.java',
  folder: '/api/request/',
  test: true,
  content: `package {{ groupId }}.api.requests;

import static {{ groupId }}.api.data.AuthRequestData.getTokenData;
import static io.github.boykaframework.actions.api.ApiActions.withRequest;
import static io.github.boykaframework.builders.ApiRequest.createRequest;
import static io.github.boykaframework.enums.RequestMethod.DELETE;
import static io.github.boykaframework.enums.RequestMethod.GET;
import static io.github.boykaframework.enums.RequestMethod.PATCH;
import static io.github.boykaframework.enums.RequestMethod.POST;
import static io.github.boykaframework.enums.RequestMethod.PUT;
import static java.text.MessageFormat.format;

import {{ groupId }}.api.data.AuthRequestData;
import {{ groupId }}.api.pojo.BookingData;
import io.github.boykaframework.actions.api.ApiActions;
import io.github.boykaframework.builders.ApiRequest;
import io.github.boykaframework.enums.RequestMethod;
import lombok.experimental.UtilityClass;

@UtilityClass
public final class BookingRequest {
    public static ApiRequest createBooking (final BookingData requestBody) {
        return createRequest ().method (POST)
            .header ("Accept", "application/json")
            .path ("/booking")
            .bodyObject (requestBody)
            .create ();
    }

    public static ApiRequest deleteBooking (final String id) {
        return createRequest ().method (DELETE)
            .header ("Content-Type", "application/json")
            .header ("Cookie", format ("token={0}", generateToken ()))
            .path ("/booking/$\{id}")
            .pathParam ("id", id)
            .create ();
    }

    public static ApiRequest getBooking (final String id) {
        return createRequest ().method (GET)
            .header ("Accept", "application/json")
            .path ("/booking/$\{id}")
            .pathParam ("id", id)
            .create ();
    }

    public static ApiRequest updateBooking (final String id, final BookingData requestBody) {
        return createRequest ().method (PUT)
            .header ("Accept", "application/json")
            .header ("Cookie", format ("token={0}", generateToken ()))
            .path ("/booking/$\{id}")
            .bodyObject (requestBody)
            .pathParam ("id", id)
            .create ();
    }

    public static ApiRequest updatePartialBooking (final String id, final BookingData requestBody) {
        return createRequest ().method (PATCH)
            .header ("Accept", "application/json")
            .header ("Cookie", format ("token={0}", generateToken ()))
            .path ("/booking/$\{id}")
            .bodyObject (requestBody)
            .pathParam ("id", id)
            .create ();
    }

    private static String generateToken () {
        final var generateTokenRequest = createRequest ().header ("Accept", "application/json")
            .method (POST)
            .path ("/auth")
            .bodyObject (getTokenData ())
            .create ();

        final var response = withRequest (generateTokenRequest)
            .execute ();
        return response.getResponseData ("token");
    }
}
`,
} satisfies TemplateFile;
