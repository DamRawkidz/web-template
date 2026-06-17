import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DemoFeatureSearchComponent } from '../../presenter/demo-feature-search/demo-feature-search.component';
import { DemoFeatureListComponent } from '../../presenter/demo-feature-list/demo-feature-list.component';

@Component({
    selector: 'app-demo-feature',
    imports: [
        DemoFeatureSearchComponent,
        DemoFeatureListComponent
    ],
    templateUrl: './demo-feature.container.html',
    styleUrl: './demo-feature.container.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoFeatureContainer {

}
