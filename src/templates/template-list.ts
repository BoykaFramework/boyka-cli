import { BookingTest } from './api/booking-test.js';
import { AuthRequestData } from './api/data/auth-request-data.js';
import { BookingRequestData } from './api/data/booking-request-data.js';
import { AuthTokenPojo } from './api/pojo/auth-token.js';
import { BookingDataPojo } from './api/pojo/booking-data.js';
import { BookingDatesPojo } from './api/pojo/booking-dates.js';
import { BookingTestDataPojo } from './api/pojo/booking-test-data.js';
import { BookingRequest } from './api/requests/booking-request.js';
import { GitIgnore } from './gitignore.js';
import { PomFile } from './pom.js';
import { ApiTestSuite } from './test-suite/testng-api.js';
import { WebTestSuite } from './test-suite/testng-web.js';
import { LoginActions } from './web/actions/login-actions.js';
import { LoginTest } from './web/login-test.js';
import { LoginPage } from './web/pages/login-page.js';

export const templates = {
  required: [PomFile, GitIgnore],
  platform: {
    web: [WebTestSuite, LoginPage, LoginActions, LoginTest],
    api: [
      ApiTestSuite,
      BookingTest,
      AuthRequestData,
      BookingRequestData,
      AuthTokenPojo,
      BookingDataPojo,
      BookingDatesPojo,
      BookingTestDataPojo,
      BookingRequest,
    ],
  },
};
