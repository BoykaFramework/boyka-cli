export enum Browser {
  CHROME = 'CHROME',
  EDGE = 'EDGE',
  FIREFOX = 'FIREFOX',
  NONE = 'NONE',
  REMOTE = 'REMOTE',
  SAFARI = 'SAFARI',
}

export enum TargetProviders {
  BROWSER_STACK = 'BROWSER_STACK',
  LAMBDA_TEST_MOBILE = 'LAMBDA_TEST_MOBILE',
  LAMBDA_TEST_WEB = 'LAMBDA_TEST_WEB',
  LOCAL = 'LOCAL',
}

export enum WindowResizeType {
  CUSTOM = 'CUSTOM',
  FULL_SCREEN = 'FULL_SCREEN',
  MAXIMIZED = 'MAXIMIZED',
  MINIMIZED = 'MINIMIZED',
  NORMAL = 'NORMAL',
}

export enum Protocol {
  HTTP = 'HTTP',
  HTTPS = 'HTTPS',
}

export enum AutomationType {
  UI_AUTOMATOR = 'UI_AUTOMATOR',
  XCUI = 'XCUI',
}

export enum LogLevel {
  DEBUG = 'DEBUG',
  DEBUG_DEBUG = 'DEBUG_DEBUG',
  DEBUG_ERROR = 'DEBUG_ERROR',
  DEBUG_INFO = 'DEBUG_INFO',
  DEBUG_WARN = 'DEBUG_WARN',
  ERROR = 'ERROR',
  ERROR_DEBUG = 'ERROR_DEBUG',
  ERROR_ERROR = 'ERROR_ERROR',
  ERROR_INFO = 'ERROR_INFO',
  ERROR_WARN = 'ERROR_WARN',
  INFO = 'INFO',
  INFO_DEBUG = 'INFO_DEBUG',
  INFO_ERROR = 'INFO_ERROR',
  INFO_INFO = 'INFO_INFO',
  INFO_WARN = 'INFO_WARN',
  WARN = 'WARN',
  WARN_DEBUG = 'WARN_DEBUG',
  WARN_ERROR = 'WARN_ERROR',
  WARN_INFO = 'WARN_INFO',
  WARN_WARN = 'WARN_WARN',
}

export enum OS {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
}

export enum DeviceType {
  CLOUD = 'CLOUD',
  VIRTUAL = 'VIRTUAL',
}

export enum VideoQuality {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  PHOTO = 'PHOTO',
}

export enum ApplicationType {
  HYBRID = 'HYBRID',
  NATIVE = 'NATIVE',
  WEB = 'WEB',
}

export enum TestDataSource {
  EXCEL = 'EXCEL',
}

export enum PageLoadStrategy {
  NONE = 'NONE',
  EAGER = 'EAGER',
  NORMAL = 'NORMAL',
}

export enum Speed {
  FAST = 'FAST',
  NORMAL = 'NORMAL',
  SLOW = 'SLOW',
}
