import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        RouterModule
    ]
})
export class AppComponent {
  appVersion = environment.appVersion
}
