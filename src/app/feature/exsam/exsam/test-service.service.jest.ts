import { TestBed } from '@angular/core/testing';

import { TestServiceService } from './test-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TestServiceService', () => {
  let service: TestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule
      ],
      providers: [
        {
          provide: TestServiceService, useValue: {}
        }
      ]
    });

    service = TestBed.inject(TestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy()
  });

});
