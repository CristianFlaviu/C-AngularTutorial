import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService ) { }

  ngOnInit() {
  }

  login() {

    console.log('logging iii');
    this.authService.login(this.model).subscribe(next => {
        console.log(next);
        console.log('success');
      },
      error => {
        console.log(error);
        console.log('error');
      });
  }

}
