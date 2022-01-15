import { State } from '../../enums';

export class Address {
    public line1: string = '';
    public line2: string = '';
    public city: string = '';
    public state: State = null;
    public postalCode: string = '';

    constructor(params?: Partial<Address>) {
        if (!!params) {
            this.line1 = params.line1 || this.line1;
            this.line2 = params.line2 || this.line2;
            this.city = params.city || this.city;
            this.state = params.state || this.state;
            this.postalCode = params.postalCode || this.postalCode;
        }
    }
}
