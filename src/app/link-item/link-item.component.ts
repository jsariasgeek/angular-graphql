import { Apollo } from 'apollo-angular';
import { Link } from './../types';
import { Component, OnInit, Input } from '@angular/core';
import { DELETE_LINK_MUTATION } from '../graphql';

@Component({
  selector: 'app-link-item',
  templateUrl: './link-item.component.html',
  styleUrls: ['./link-item.component.css']
})
export class LinkItemComponent implements OnInit {

  @Input()
  link:Link;

  constructor(private apollo:Apollo) { }

  ngOnInit() {
  }

  voteForLink = async ()=> {
    //ToDo
  }

  deleteLink(linkId){
    this.apollo.mutate({
      mutation:DELETE_LINK_MUTATION,
      variables:{linkId:linkId}
    }).subscribe((response)=>{
      console.log(response);
      if(response.data.deleteLink.deleted){
        console.log('deleted');
      }
    })
  }

}
// createLink(){
//     this.apollo.mutate({
//       mutation:CREATE_LINK_MUTATION,
//       variables:{url:this.url, description:this.description}
//     }).subscribe((response)=>{

//     })
//   }
