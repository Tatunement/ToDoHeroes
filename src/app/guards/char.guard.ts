import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayerService } from '../services/player.service';

@Injectable({
  providedIn: 'root',
})
export class CharGuard implements CanActivate {
  constructor(private playerService: PlayerService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.playerService.playerChanges.pipe(
      map((player) => {
        const isCreated = !!player
        if (isCreated) {
          return true
        }
        return this.router.createUrlTree(['/charactercreation']);
      })
    );
  }
}
