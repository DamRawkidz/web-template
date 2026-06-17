import { Injectable, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { DemoDirective } from './directives/demo.directive';

import { MatToolbarModule } from '@angular/material/toolbar';
import localeTh from '@angular/common/locales/th';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

registerLocaleData(localeTh)
@Injectable()
export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    let monthNamesThai = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
      "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค"];
    // if (displayFormat === 'input') {
    date.setHours(7)
    let day: string = date.getDate().toLocaleString()
    day = +day < 10 ? '0' + day : day;
    // let month: string = (date.getMonth() + 1).toLocaleString()
    // month = +month < 10 ? '0' + month : month;
    let year = date.getFullYear();
    return `${day}/${monthNamesThai[date.getMonth()]}/${year + 543}`;
    // }
    // return date.toDateString();
  }
}




export const PICK_FORMATS = {
  parse: {
    dateInput: {
      month: 'short',
      year: 'numeric',
      day: 'numeric'
    }
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { day: 'numeric', year: 'numeric', month: 'long' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};
//  format for Moment
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MMM-YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'DD-MMM-YYYY',
    dateA11yLabel: 'DD-MMM-YYYY',
    monthYearA11yLabel: 'DD-MMM-YYYY',
  },
};


export const mat = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  MatButtonModule,
  MatDatepickerModule,
  // MatExpansionModule,
  // MatToolbarModule,
  // MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  // MatGridListModule,
  // MatTableModule,
  MatIconModule,
  // MatChipsModule,
  // MatCheckboxModule,
  // MatStepperModule,
  // MatRadioModule,
  // MatSelectModule,
  // MatDatepickerModule,
  // MatAutocompleteModule,
  // MatSnackBarModule,
  // MatMenuModule,
  // MatNativeDateModule,
  // MatProgressBarModule
]

const pipe = [

] as const

const directive = [
  DemoDirective
] as const

export const SHARED = [
  ...mat,
  ...pipe,
  // ...directive,
] as const



// @NgModule({
//   declarations: [
//     DemoDirective,
//     DemoPipe,
//     ThaiDatePipe
//   ],
//   imports: [
//     ...mat
//   ],
//   exports: [
//     ...mat
//   ],
//   providers: [
//     // { provide: LOCALE_ID, useValue: 'th-TH'},
//     // { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS},
//     // { provide: DateAdapter, useClass: AppDateAdapter},
//     // {
//     //   provide : MAT_FORM_FIELD_DEFAULT_OPTIONS,
//     //   useValue: {
//     //       appearance: 'fill'
//     //   }
//     // }
//   ]
// })
// export class SharedModule { }




