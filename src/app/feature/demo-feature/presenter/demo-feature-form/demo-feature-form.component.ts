import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseForm } from 'seventy-one-base';

@Component({
    selector: 'app-demo-feature-form',
    imports: [],
    templateUrl: './demo-feature-form.component.html',
    styleUrl: './demo-feature-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoFeatureFormComponent extends BaseForm {

  createForm(): any {
    return this.fb.group({})
  }
}
