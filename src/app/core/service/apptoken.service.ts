import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BaseService } from 'seventy-one-base';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApptokenService extends BaseService {

  

  constructor() {

    
    super("");

    let localStorageUser = localStorage.getItem('token')

    

  }

  

  
}
