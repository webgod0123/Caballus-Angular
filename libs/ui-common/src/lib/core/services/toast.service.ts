import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { DtoError } from '../models/base/dto-error';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    constructor(private _toast: ToastrService) {}

    public success(title: string, message?: string): void {
        this._toast.success(message, title);
    }

    public info(title: string, message?: string): void {
        this._toast.info(message, title);
    }

    public warn(title: string, message?: string): void {
        this._toast.warning(message, title);
    }

    public error(error: HttpErrorResponse): void;
    public error(title: string, message?: string): void;
    public error(errorOrTitle: string | HttpErrorResponse, message?: string): void {
        if (typeof errorOrTitle === 'string') {
            this._toast.error(message, errorOrTitle);
        } else {
            try {
                console.log('error', errorOrTitle);

                // Attempt to pull error string from error format returned by server dtos
                const dtoErr = this.extractErrorMessages(errorOrTitle);
                if (!!dtoErr) {
                    message = dtoErr;
                } else {
                    let error;
                    if (typeof errorOrTitle.error === 'string') {
                        error = JSON.parse(errorOrTitle.error);
                    } else {
                        error = errorOrTitle.error;
                    }
                    if (!!error && !!error.message) {
                        message = error.message;
                    } else if (!!error && !!error.error && typeof error.error === 'string') {
                        message = error.error;
                    } else {
                        console.warn('Unable to parse HttpErrorResponse', errorOrTitle);
                        throw new Error('Unable to parse HttpErrorResponse Error');
                    }
                }
            } catch (e) {
                message =
                    errorOrTitle.statusText.toLowerCase() === 'ok'
                        ? errorOrTitle.message
                        : errorOrTitle.statusText;
            }
            if (typeof message !== 'string') {
                message =
                errorOrTitle.statusText.toLowerCase() === 'ok'
                    ? errorOrTitle.message
                    : errorOrTitle.statusText;
            }
            this._toast.error(message, 'Request Error');
        }
    }

    // For getting error strings from errors returned by server dtos
    public extractErrorMessages(httpErr: HttpErrorResponse): string {
        let errors = [];

        // Some reason the error property is sometimes a string, parse it if necessary
        const errorObject =
            typeof httpErr.error === 'string' ? JSON.parse(httpErr.error) : httpErr.error;

        if (typeof errorObject.message === 'string') {
            return errorObject.message;
        }
        for (const m of errorObject.message) {
            errors = this.extractErrorsFromErrorItem(m, errors);
        }

        const allErrs = errors.join(', ');
        console.log('All errors: ', allErrs);
        return allErrs;
    }

    public extractErrorsFromErrorItem(e: DtoError, errors: string[]): string[] {
        for (const key in e.constraints) {
            errors.push(e.constraints[key]);
        }
        for (const c of e.children) {
            errors = this.extractErrorsFromErrorItem(c, errors);
        }
        return errors;
    }
}
