import { AuthGuard } from './auth.guard';
import { DashboardRedirectGuard } from './dashboard-redirect.guard';
import { PermissionGuard } from './permission.guard';

export const guards = [AuthGuard, DashboardRedirectGuard, PermissionGuard];

export { AuthGuard, DashboardRedirectGuard, PermissionGuard };
