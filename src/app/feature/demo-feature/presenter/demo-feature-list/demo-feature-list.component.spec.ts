import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoFeatureListComponent } from './demo-feature-list.component';

describe('DemoFeatureListComponent', () => {
  let component: DemoFeatureListComponent;
  let fixture: ComponentFixture<DemoFeatureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoFeatureListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoFeatureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
