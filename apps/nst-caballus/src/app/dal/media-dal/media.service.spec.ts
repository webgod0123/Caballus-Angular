import { Test, TestingModule } from '@nestjs/testing';
import { MediaDalService } from './media-dal.service';

describe('MediaDalService', () => {
  let service: MediaDalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaDalService],
    }).compile();

    service = module.get<MediaDalService>(MediaDalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
