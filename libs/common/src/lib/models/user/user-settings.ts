
export class UserSettings {
    public acceptedTerms: boolean = false;
    public seenWelcomeModal: boolean = false;

    constructor(params?: Partial<UserSettings>) {
        if (!!params) {
            this.acceptedTerms = params.acceptedTerms || this.acceptedTerms;
            this.seenWelcomeModal = params.seenWelcomeModal || this.seenWelcomeModal;
        }
    }
}
