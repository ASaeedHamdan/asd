import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from '../app.component';
AppComponent
HttpClient
FormGroup

@Component({
  selector: 'app-sgin-up',
  templateUrl: './sgin-up.component.html',
  styleUrls: ['./sgin-up.component.css']
})
export class SginUpComponent implements OnInit {
sginUpForm : FormGroup;
loadArabic;
  constructor(
      private FB:FormBuilder ,
      private http:HttpClient ,
      private route:Router ,
      public translate:TranslateService ,
      public appComp:AppComponent  )
       {
        this.loadArabic = appComp.loadArabic
       }

  ngOnInit(): void {
    this.sginUpForm = this.FB.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  // make method to create user
  sginUp(){
  this.http.post("http://localhost:3000/sginUp" , this.sginUpForm.value).subscribe(
    res=>{
         alert(this.loadArabic? "  😊😊 تم التسجيل بنجاح " : "registration successffuly  😊😊  ");
         this.sginUpForm.reset();
         this.route.navigate(['login']);
    },
    err=>{
        alert( this.loadArabic? "عذرا حدث خطا ما اثناء ىالتسجيل ": " error happened while registration 😢😢");
      }
  )
  }

}
