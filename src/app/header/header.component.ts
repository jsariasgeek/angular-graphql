import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logged:boolean = false;

  constructor(private as:AuthService) { }

  ngOnInit() {
    this.as.isAuthenticated.pipe(
      distinctUntilChanged()
    ).subscribe((isAuthenticated:boolean) => {
      this.logged = isAuthenticated;
    }

    )
  }

  logout(){
    this.as.logout();
  }

}
