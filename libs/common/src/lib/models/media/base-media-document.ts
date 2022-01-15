
import { MediaDocumentType } from '../../enums';

export class BaseMediaDocument {
    public path: string = '';
    public name: string = '';
    public type: MediaDocumentType = null;
    public dateUploaded: Date;

    // Only set went sent to front end
    public url: string = '';

    constructor(params?: Partial<BaseMediaDocument>) {
        if (!!params) {
            this.path = params.path || this.path;
            this.name = params.name || this.name;
            this.type = params.type || this.type;
            this.dateUploaded = params.dateUploaded || this.dateUploaded;

            this.url = params.url || this.url;
        }
    }
}
