import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { BusinessIdeaService } from '../services/business-idea.service';

@Injectable({
  providedIn: 'root',
})
export class IdeaGuard implements CanActivate {
  constructor(
    private router: Router,
    private businessIdeaService: BusinessIdeaService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.businessIdeaService.getIdea()) {
      return true;
    } else {
      this.router.navigate(['/form']);
      return false;
    }
  }
}
