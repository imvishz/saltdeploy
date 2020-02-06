import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  cookieValue : {};
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  userType:string = "";
  constructor(private dataService: DataService,private router: Router,private cookieService: CookieService,@Inject(DOCUMENT) _document?: any) {
    this.cookieValue = this.cookieService.getAll();
      if(!this.cookieValue.hasOwnProperty("userData")){
          // this.router.navigate(['/']);
      }else{
        this.changes = new MutationObserver((mutations) => {
          this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
        });
        this.element = _document.body;
        this.changes.observe(<Element>this.element, {
          attributes: true,
          attributeFilter: ['class']
        });
      }
    
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
  onLogoutClick = function(){
     //Set_Cookies Start
     var cookieFlag = this.dataService.check_cookie('userData');
     console.log("cookieFlag")
     console.log(cookieFlag)
     if(cookieFlag  == true){
         this.dataService.delete_cookie();
         this.dataService.delete_cookieName('userData');
         this.Router.navigate(['/userlogin']);
     }else{
         this.Router.navigate(['/userlogin']);
     }
    
  }

  onprofileClick = function(){
    if(this.userType == "userlogin"){
      // this.Router.navigate(['/userlogin']);
    }else if(this.userType == "companylogin"){
      // this.Router.navigate(['/userlogin']);
    }
  }
}
