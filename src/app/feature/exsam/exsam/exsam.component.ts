import { Component, OnInit, ChangeDetectionStrategy, LOCALE_ID, numberAttribute, Input } from '@angular/core';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppDateAdapter, PICK_FORMATS, SHARED } from 'src/app/shared/shared';
import { ExComponentsComponent } from './components/ex-components/ex-components.component';
import { CustomComponent } from './components/custom/custom.component';

@Component({
    selector: 'app-exsam',
    templateUrl: './exsam.component.html',
    styleUrls: ['./exsam.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        SHARED,
        ExComponentsComponent,
        RouterOutlet,
        CustomComponent
    ]
})
export class ExsamComponent implements OnInit {
  // @Input({ transform: numberAttribute }) count: number = 0
  @Input({ transform: numberAttribute }) id :string = ''
  @Input() example: string
  @Input() data2: string

  @Input() query: string
  @Input() query2: string
  // route parameters
  // query parameters
  // route data from data property
  // route data from resolvers
  constructor() {
    // this.activertotuer.param.sub
  }

  ngOnInit(): void {
    console.log(this.id)
    console.log(`value from path = ${this.id}`)
    console.log(`value from queryString = ${this.query}`)
    console.log(`value from queryString = ${this.query2}`)
    console.log(`value from data = ${this.example}`)
  }

}
