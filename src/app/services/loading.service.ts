// loading.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingStatus = new BehaviorSubject<boolean>(false);

  getLoadingStatus() {
    return this.loadingStatus.asObservable();
  }

  setLoadingStatus(status: boolean) {
    this.loadingStatus.next(status);
  }
}
