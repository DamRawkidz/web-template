import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, booleanAttribute, inject, numberAttribute } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormResetEvent, PristineChangeEvent, ReactiveFormsModule, StatusChangeEvent, TouchedChangeEvent, Validators, ValueChangeEvent, FormSubmittedEvent } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, forkJoin, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

const enum Fields {
  FirstName = 'firstName',
  LastName = 'lastName'
}

const enum UID_VALUE {
  DEFAULT = 0,
  FIRST = 1,
  SECOND = 2,
}

interface CustomeTypeInWeb {
  name: string
  lastName: string
}
interface CustomeTypeMathClassBackend {
  name: string
  last_name: string
}

interface addressTypeForm {
  road: FormControl<string>
}

interface specialTypeForm {
  isModernStyle: FormControl<boolean>
}

interface formType {
  firstName: FormControl<string | null>;
  address: FormArray<FormGroup<addressTypeForm>>,
  special: FormGroup<specialTypeForm | null>,
}


function inputTransFormer(argu: string) {
  return argu.toUpperCase()
}


@Component({
    selector: 'app-ex-components',
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './ex-components.component.html',
    styleUrl: './ex-components.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExComponentsComponent implements OnInit, OnChanges {

  get getFormAddress(): FormArray<FormGroup<addressTypeForm>> {
    return this.form.get('address') as FormArray<FormGroup<addressTypeForm>>
  }

  userList = []
  userSV$ = of([])

  destroyRef = inject(DestroyRef)

  @Input({ required: true }) name: string = ''


  @Input({ transform: booleanAttribute }) isExpaned: boolean = false
  @Input({ transform: numberAttribute }) age: number
  @Input({ transform: inputTransFormer }) data: string



  form: FormGroup<formType>
  fb = inject(FormBuilder)

  user = []

  constructor() {


    this.form = this.fb.group<formType>({
      firstName: this.fb.control('', { validators: [Validators.required] }),
      address: this.fb.array<FormGroup<addressTypeForm>>([
        // this.fb.group({road: this.fb.control('')})
      ]),
      special: this.fb.group<specialTypeForm>({
        isModernStyle: this.fb.control(false)
      })


    })
    // this.form.controls.




  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('age' in changes) {
      // /....
    }
  }

  ngOnInit(): void {
    console.log(this.isExpaned)
    console.log(this.age)
    console.log(this.data)
    // this.form.controls.special.controls.isModernStyle.setValue(true)
    // this.form.get('special.isModernStyle').setValue(41)
    this.form.events.subscribe(event => {
      if (event instanceof TouchedChangeEvent) {
        console.log(event.touched);
      } else if (event instanceof PristineChangeEvent) {
        console.log(event.pristine);
      } else if (event instanceof StatusChangeEvent) {
        console.log(event.status);
      } else if (event instanceof ValueChangeEvent) {
        console.log(event.value);
      } else if (event instanceof FormResetEvent) {
        console.log('Reset');
      } else if (event instanceof FormSubmittedEvent) {
        console.log('Submit');
      }
    })



  }

  addFormArray() {
    let form = this.getFormAddress
    form.push(this.creatFormArray())
  }

  creatFormArray() {
    return this.fb.group<addressTypeForm>({
      road: this.fb.control('')
    })
  }


  handleDestroy() {
    this.destroyRef.onDestroy(() => {
      console.log('triggle on destory')
    })
  }
}
function sharedRepaly(arg0: number): import("rxjs").OperatorFunction<any[], unknown> {
  throw new Error('Function not implemented.');
}

