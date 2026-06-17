import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-custom',
    imports: [],
    templateUrl: './custom.component.html',
    styleUrl: './custom.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomComponent {

}
