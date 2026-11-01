import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, concatMap, tap } from 'rxjs/operators';
import { ApptokenService } from 'src/app/core/service/apptoken.service';
import { AuthenService } from 'src/app/core/service/authen.service';

@Component({
    selector: 'app-auth-callback',
    imports: [],
    templateUrl: './auth-callback.component.html',
    styleUrl: './auth-callback.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthCallbackComponent implements OnInit {

  authenSV = inject(AuthenService)
  appToken = inject(ApptokenService)
  router = inject(Router)

  ngOnInit(): void {
    
  }

}
