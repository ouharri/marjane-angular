import {JwtPayload} from "jwt-decode";

export interface AuthenticationPersist {
  gdpr: {
    initial: boolean;
    settings: {
      analytics: boolean;
    };
  };
  authentication: {
    access_token: string | null;
    refresh_token: string | null;
    decodedToken: JwtPayload | {
      sub: string;
      iat: number;
      exp: number;
      roles: string[];
      permissions: string[];
    };
  };
  i18n: {
    locale: string;
  };
  _persist: {
    version: number;
    rehydrated: boolean;
  };
}
