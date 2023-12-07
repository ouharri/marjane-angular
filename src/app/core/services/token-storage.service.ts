import {EventEmitter, Injectable} from '@angular/core';
import {AuthenticationPersist} from '../model/authentication-persist';
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenStorage {
  private readonly localStorageKey = 'persist:root';

  getAccessToken(): string | null {
    const persist = this.getAuthenticationPersist();
    return persist?.authentication.access_token || null;
  }

  getRefreshToken(): string | null {
    const persist = this.getAuthenticationPersist();
    return persist?.authentication.refresh_token || null;
  }

  getRoles(): string[] {
    const jwtPayload: any = this.decodeJwt(
      this.getAccessToken()
    );
    return jwtPayload?.roles || [];
  }

  getPermissions(): string[] {
    const jwtPayload: any = this.decodeJwt(
      this.getAccessToken()
    );
    return jwtPayload?.permissions || [];
  }

  setToken(token: any): void {
    let persist = this.getAuthenticationPersist() || this.createEmptyPersist();
    persist.authentication = token;
    persist.authentication.decodedToken = this.decodeJwt(token.access_token);
    this.savePersist(persist);
  }

  setAccessToken(token: string): void {
    let persist = this.getAuthenticationPersist() || this.createEmptyPersist();
    persist.authentication.access_token = token;
    persist.authentication.decodedToken = this.decodeJwt(token);
    this.savePersist(persist);
  }

  setRefreshToken(token: string): void {
    let persist = this.getAuthenticationPersist() || this.createEmptyPersist();
    persist.authentication.refresh_token = token;
    this.savePersist(persist);
  }

  clear(): void {
    localStorage.removeItem(this.localStorageKey);
  }

  private getAuthenticationPersist(): AuthenticationPersist | null {
    const persistString = localStorage.getItem(this.localStorageKey);
    return persistString ? JSON.parse(persistString) : null;
  }

  private savePersist(persist: AuthenticationPersist): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(persist));
  }

  decodeJwt(token: any) {
    return jwtDecode(token);
  }

  private createEmptyPersist(): AuthenticationPersist {
    return {
      gdpr: {
        initial: false,
        settings: {
          analytics: false,
        },
      },
      authentication: {
        access_token: null,
        refresh_token: null,
        decodedToken: {
          sub: '',
          iat: 0,
          exp: 0,
          roles: [],
        },
      },
      i18n: {
        locale: 'fr',
      },
      _persist: {
        version: -1,
        rehydrated: true,
      },
    };
  }

  public tokenExpirationEvent = new EventEmitter<void>();
}
