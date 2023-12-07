import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {TokenStorage} from './token-storage.service';
import {RegisterRequest} from '../dto/register-request';
import {AuthenticationResponse} from '../dto/authentication-response';
import {LoginRequest} from "../dto/login-request";
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private readonly baseUrl = 'http://localhost:8084/api/v2/auth';

    constructor(private http: HttpClient, private tokenStorage: TokenStorage) {
    }

    register(request: RegisterRequest): Observable<AuthenticationResponse> {
        return this.http.post<AuthenticationResponse>(
            `${this.baseUrl}/register`,
            request
        );
    }

    //codioum

    authenticate(request: LoginRequest): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.http
                .post<AuthenticationResponse>(`${this.baseUrl}/authenticate`, request)
                .pipe(
                    catchError((error: HttpErrorResponse) => {
                        console.error(error)
                        reject(error);
                        return throwError(error);
                    })
                )
                .subscribe((token) => {
                    this.tokenStorage.setToken(token);
                    resolve(true);
                });
        });
    }

    getRoles(): string[] {
        return this.tokenStorage.getRoles();
    }

    getPermissions(): string[] {
        return this.tokenStorage.getPermissions();
    }

    refreshToken() {
        this.http
            .post<void>(`${this.baseUrl}/refresh-token`, {},
                {
                    headers: {
                        Authorization: `Bearer ${this.tokenStorage.getRefreshToken()}`
                    }
                }
            )
            .subscribe((token) => this.tokenStorage.setToken(token));
    }

    isAuthenticated(): Promise<boolean> {
        const token = this.tokenStorage.getAccessToken();
        if (!token) {
            return Promise.resolve(false);
        }
        return new Promise<boolean>((resolve, reject) => {
            this.http.post(`${this.baseUrl}/check-token`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .pipe(
                    catchError((error: HttpErrorResponse) => {
                        reject(error);
                        return throwError(error);
                    })
                )
                .subscribe((res) => {
                    resolve(true);
                });
        });
    }
}
