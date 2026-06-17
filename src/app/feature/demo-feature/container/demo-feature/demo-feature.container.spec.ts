import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoFeatureContainer } from './demo-feature.container';

describe('DemoFeatureContainer', () => {
  let component: DemoFeatureContainer;
  let fixture: ComponentFixture<DemoFeatureContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoFeatureContainer]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoFeatureContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
