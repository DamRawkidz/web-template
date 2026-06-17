import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExComponentsComponent } from './ex-components.component';

describe('ExComponentsComponent', () => {
  let component: ExComponentsComponent;
  let fixture: ComponentFixture<ExComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
