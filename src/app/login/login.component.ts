import { LOGIN_USER_MUTATION } from './../graphql';
import { Apollo } from 'apollo-angular';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login:boolean = true;
  username:string = '';
  password:string = '';
  name:string = '';

  constructor(private router:Router,
              private apollo:Apollo,
              private as:AuthService) { }

  ngOnInit() {
  }

  saveUserData(id, token){
    localStorage.setItem('GC_USER_ID', id);
    localStorage.setItem('GC_AUTH_TOKEN', token);
    this.as.setUserId(id);
  }

  confirm(){
    if(this.login){
      this.apollo.mutate({
        mutation:LOGIN_USER_MUTATION,
        variables:{
          username:this.username,
          password:this.password
        }
      }).subscribe(result => {
        console.log(result);
        const id = result.data.loginUser.user.id;
        const token = result.data.loginUser.token;
        console.log(id, token);
        this.saveUserData(id, token);

        this.router.navigate(['/']);

      },(error)=>{
        alert(error);
        console.log(error);
      })
    }
  }

}
