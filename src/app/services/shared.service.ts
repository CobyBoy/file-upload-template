import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  validating$ = new BehaviorSubject(false);
  isValid$ = new BehaviorSubject(false);
  isSubmitting$ = new BehaviorSubject(false);

  constructor() {}
}
