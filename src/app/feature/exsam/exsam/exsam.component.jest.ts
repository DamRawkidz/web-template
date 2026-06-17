import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExsamComponent } from './exsam.component';
import { AppDateAdapter, PICK_FORMATS, SHARED } from 'src/app/shared/shared';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ExsamComponent', () => {
  let component: ExsamComponent;
  let fixture: ComponentFixture<ExsamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SHARED,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: LOCALE_ID, useValue: 'th-TH'},
        { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS},
        { provide: DateAdapter, useClass: AppDateAdapter},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExsamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
