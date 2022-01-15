import { Injectable } from '@nestjs/common';
import {
    MediaDocumentType,
    Media,
    UploadedFileObject,
    BaseMediaDocument,
    MediaCollectionName
} from '@caballus/api-common';
import { MediaRepository } from './media.repository';
import { ObjectId } from '@rfx/njs-db/mongo';
import { FileService } from '@rfx/njs-file';

@Injectable()
export class MediaService {
    constructor(
        private readonly mediaRepo: MediaRepository,
        private readonly fileService: FileService
    ) {}

    /**
     * Creates a new base media document from the given uploaded file
     * For saving on other db objects for other collections or for saving to media repo inside Media object
     *
     * @param type The type of the document being uploaded
     * @param file The uploaded file object, gotten straight from the
     * @UploadedFile decorator in the controller
     * @param userIdentity The UserIdentity of the user who uploaded the file
     * @returns The base media document
     */

    public async createBaseMediaDocument(
        type: MediaDocumentType,
        file: UploadedFileObject,
        dateUploaded?: Date,
    ): Promise<BaseMediaDocument> {
        // If mediadoc is not given, create a new one
        const rfxFile = await this.fileService.uploadFile(file.buffer, file.mimetype, 'media', file.originalname);
        const media = new BaseMediaDocument({
            ...rfxFile,
            dateUploaded: dateUploaded || new Date()
        });
        return media;
    }

    public async createMedia(
        collectionName: MediaCollectionName,
        collectionId: ObjectId,
        type: MediaDocumentType,
        file: UploadedFileObject,
    ): Promise<BaseMediaDocument> {
        const base = await this.createBaseMediaDocument(type, file, new Date());
        const media = new Media({
            collection: collectionName,
            collectionId: collectionId,
            history: [base],
            latest: base,
        });
        await this.mediaRepo.createMedia(media);
        return base;
    }

    public getSignedUrl(path): Promise<string> {
        return this.fileService.getUrl(path);
    }

    public async deleteMedia(_id: ObjectId): Promise<void> {
        return await this.mediaRepo.deleteMedia(_id);
    }

    public async urlFromLocalFile(localPath: string, fileName: string): Promise<string> {
        const rfxFile = await this.fileService.uploadLocalFile(localPath, 'media', fileName);
        return this.getSignedUrl(rfxFile.path);
    }
}
