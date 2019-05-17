import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from "apollo-link-context";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { LinkItemComponent } from './link-item/link-item.component';
import { LinkListComponent } from './link-list/link-list.component';
import { CreateLinkComponent } from './create-link/create-link.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ApolloLink } from 'apollo-link';

@NgModule({
  declarations: [
    AppComponent,
    LinkItemComponent,
    LinkListComponent,
    CreateLinkComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo:Apollo, httpLink:HttpLink){

    const token = localStorage.getItem('GC_AUTH_TOKEN');
    const authorization = token ? `Bearer ${token}` : null;
    const headers = new HttpHeaders().append('Authorization', authorization);
    const uri = environment.server;
    const http = httpLink.create({uri, headers})

    const middleware = new ApolloLink((operation, forward)=>{
      const token = localStorage.getItem('GC_AUTH_TOKEN');
      if(token){
        operation.setContext({
          headers: new HttpHeaders().set('Authorization', `JWT ${token}`)
        })
      }
      return forward(operation);
    });

    apollo.create({
      link:middleware.concat(http),
      cache:new InMemoryCache()
    });
    // apollo.create({
    //   link:httpLink.create({
    //     uri:environment.server
    //   }),
    //   cache: new InMemoryCache()
    // });

    // const middleware = new ApolloLink((operation, forward)=>{
    //   const token = localStorage.getItem('GC_AUTH_TOKEN');
    //   if(token){
    //     operation.setContext({
    //       headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    //     })
    //   }
    //   return forward(operation);
    // });

    // apollo.create({
    //   link:middleware.concat(http),
    //   cache: new InMemoryCache()
    // })



  }
}
