import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { PagesEnum } from "src/app/models/pages.enum";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  currentPage = new BehaviorSubject<PagesEnum>(PagesEnum.PROFILE);

  setCurrentPage(page: PagesEnum): void {
    this.currentPage.next(page);
  }

  getCurrentPage(): Observable<PagesEnum> {
    return this.currentPage.asObservable();
  }
}
