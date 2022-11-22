import { Injectable } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import IdTokenVerifier from 'idtoken-verifier';
import { Observable, map, switchMap, tap, of, take } from 'rxjs';
import { _globals } from '../models/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(protected auth: AuthService) { }

  public getClaims(): Observable<Record<any, any>> {
    return this.auth.getAccessTokenSilently().pipe(
      map(accessToken => {
        const verifier = new IdTokenVerifier({
          issuer: _globals.clientId,
          audience: _globals.audience,
        });
        const result = verifier.decode(accessToken);
        return result?.payload || {};
      }),
      switchMap(claims => {
        return this.auth.user$.pipe(
          map(user => {
            return {...claims, ...user};
          })
        )
      })
    );
  }

  public getUserPermissions():Observable<string[]> {
    if (this.isAuthenticated()) {
      return this.getClaims().pipe(take(1), switchMap((claims) => {
        return of(claims['permissions'] as string[]);
      }));
    } else {
      return of([]);
    }
  }

  public getUser(): Observable<User | null | undefined> {
    return this.auth.user$;
  }

  public logout(returnTo: string): void {
    return this.auth.logout({ returnTo: returnTo });
  }

  public isAuthenticated(): Observable<boolean> {
    return this.auth.isAuthenticated$;
  }

  public loginWithRedirect(): Observable<void> {
    return this.auth.loginWithRedirect();
  }
}
