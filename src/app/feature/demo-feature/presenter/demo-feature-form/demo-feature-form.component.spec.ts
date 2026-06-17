import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoFeatureFormComponent } from './demo-feature-form.component';

describe('DemoFeatureFormComponent', () => {
  let component: DemoFeatureFormComponent;
  let fixture: ComponentFixture<DemoFeatureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoFeatureFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoFeatureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
