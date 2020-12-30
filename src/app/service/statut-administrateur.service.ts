import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Role } from 'src/app/models/role';

@Injectable({
  providedIn: 'root'
})
export class StatutAdministrateurService {

  // Constructeur
  constructor(private _authSrv: AuthService, private _router: Router) {
  }

  // Mis en place pour la guard "Administrateur"
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._authSrv.verifierAuthentification()
      .pipe(
        map(col => {
          for (const role of col.roles) {
            if (role.match(Role.RoleAdmin)) {
              // Le role administrateur est bien trouvé, on retourne true
              return true;
            }
          }
          // Le role administrateur n'a pas été trouvé, on retourne false
          return false;
        }),
        tap(possedeStatutAdministrateur => {
          // Cas ou il ne possede pas le role administrateur
          if (!possedeStatutAdministrateur) {
            // Redirection
            this._router.navigate(['/accesRefuse']);
          }
        })
      );
  }
}
