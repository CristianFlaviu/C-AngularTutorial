
import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { Route } from '@angular/compiler/src/core';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()

export class MemberDetailResolver implements Resolve<User> {
    constructor(private userService: UserService,
                private router: Router,
                private alertify: AlertifyService ){}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        const idString = 'id';
        return this.userService.getUser(route.params[idString]).pipe(
            catchError(error => {
                this.alertify.error('problem retgrieving date');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
