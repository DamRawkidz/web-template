import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'seventy-one-base';
export interface LevelType {
  
}

@Injectable({
  providedIn: 'root'
})
export class LevelTypeService  extends BaseService {
 
  constructor(
    
  ) {
    super('/level_type')
   }
}
