import { ALL_LINKS_QUERY } from './../graphql';
import { Apollo } from 'apollo-angular';
import { Link } from './../types';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {

  links:Link[] = [];
  loading:boolean = true;

  constructor(private apollo:Apollo) {}

  ngOnInit() {
    this.apollo.watchQuery({
      query:ALL_LINKS_QUERY
    }).valueChanges.subscribe((response:any)=>{
      this.links = response.data.links;
      this.loading = false;
    })
  }

}
