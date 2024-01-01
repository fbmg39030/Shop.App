import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _isSpinnerLoading: boolean = false;
  public get isSpinnerLoading(): boolean {
    return this._isSpinnerLoading;
  }
  public set isSpinnerLoading(value: boolean) {
    this._isSpinnerLoading = value;
  }

  constructor() { }
}
