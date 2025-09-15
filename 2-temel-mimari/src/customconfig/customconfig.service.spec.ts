import { Test, TestingModule } from '@nestjs/testing';
import { CustomconfigService } from './customconfig.service';

describe('CustomconfigService', () => {
  let service: CustomconfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomconfigService],
    }).compile();

    service = module.get<CustomconfigService>(CustomconfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
