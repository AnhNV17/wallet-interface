import { TestBed } from '@angular/core/testing';

import { TransferCoinsService } from './transfer-coins.service';

describe('TransferCoinsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransferCoinsService = TestBed.get(TransferCoinsService);
    expect(service).toBeTruthy();
  });
});
