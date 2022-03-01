import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  loadArabic;
  constructor(
    private FB:FormBuilder,
    private http:HttpClient ,
    private route:Router ,
    public translate:TranslateService,
    public appComp:AppComponent  ) { this.loadArabic = appComp.loadArabic }

  ngOnInit(): void
  {
    this.loginForm = this.FB.group({

      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
// login method
  login(){
   this.http.get<any>("http://localhost:3000/sginUp").subscribe(
     res=>{
       const user = res.find((a:any)=>{
         return a.email === this.loginForm.controls['email'].value && a.password === this.loginForm.controls['password'].value
       })
       if(user){
        alert(this.loadArabic? " 😊😊 تم الدخول بنجاح " :"login successffuly 😊😊");
        this.loginForm.reset();
        this.route.navigate(['resturant']);
       }else{
        alert(this.loadArabic? " عذرا لا يوجد مستخدم لهذه البيانات 🤦‍♂️🤦‍♂️ ": "Sorry user not found 🤦‍♂️🤦‍♂️");
       }
     }
   )
  }

}
