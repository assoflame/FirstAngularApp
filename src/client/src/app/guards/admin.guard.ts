import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import {inject} from "@angular/core";
import { Role, User } from "../dataTransferObjects/Auth";
 
export const adminGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthenticationService).userValue?.role === Role.Admin;
};