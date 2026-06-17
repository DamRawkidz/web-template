import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoFeatureSearchComponent } from './demo-feature-search.component';

describe('DemoFeatureSearchComponent', () => {
  let component: DemoFeatureSearchComponent;
  let fixture: ComponentFixture<DemoFeatureSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoFeatureSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoFeatureSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
