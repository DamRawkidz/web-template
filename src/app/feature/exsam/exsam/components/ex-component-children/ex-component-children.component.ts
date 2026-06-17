import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnInit, inject } from '@angular/core';

@Component({
    selector: 'app-ex-component-children',
    imports: [],
    templateUrl: './ex-component-children.component.html',
    styleUrl: './ex-component-children.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExComponentChildrenComponent implements OnInit {

  @Input() childrenid :string = ''
  @Input() example: string
  @Input() query: string

  destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    console.log(`value from path = ${this.childrenid}`)
    console.log(`value from queryString = ${this.query}`)
    console.log(`value from data = ${this.example}`)
  }




  handleDestroy(){
    console.log('test')
    this.destroyRef.onDestroy(() => {
      console.log('triggle on destory')
    })
  }



}
