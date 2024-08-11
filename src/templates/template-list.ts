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

export const templates = [
  PomFile,
  GitIgnore,
  ApiTestSuite,
  BookingTest,
  AuthRequestData,
  BookingRequestData,
  AuthTokenPojo,
  BookingDataPojo,
  BookingDatesPojo,
  BookingTestDataPojo,
  BookingRequest,
];
