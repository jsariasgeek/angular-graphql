import { CREATE_LINK_MUTATION } from './../graphql';
import { Link } from './../types';
import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-link',
  templateUrl: './create-link.component.html',
  styleUrls: ['./create-link.component.css']
})
export class CreateLinkComponent implements OnInit {

    description=''
    url=''
    token = localStorage.getItem('GC_AUTH_TOKEN')


  constructor(public apollo:Apollo) { }

  ngOnInit() {
  }

  createLink(){
    console.log(this.token);
    this.apollo.mutate({
      mutation:CREATE_LINK_MUTATION,
      variables:{url:this.url, description:this.description}
    }).subscribe((response)=>{

    })
  }

}
