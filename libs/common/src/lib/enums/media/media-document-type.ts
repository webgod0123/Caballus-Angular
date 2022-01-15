export enum MediaDocumentType {
    Image = '[MediaDocumentType] Image',
    Document = '[MediaDocumentType] Document'
}

export namespace MediaDocumentType {
    export function toString(type: MediaDocumentType): string {
        switch (type) {
            case MediaDocumentType.Image:
                return 'Image';
            case MediaDocumentType.Document:
                return 'Document';
            default:
                return '';
        }
    }

    export const members: MediaDocumentType[] = [
        MediaDocumentType.Image,
        MediaDocumentType.Document
    ];
}
