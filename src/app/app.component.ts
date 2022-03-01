import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentLnag:string;
  loadArabic = false;
  dynamicCSSUrlar: string;
  dynamicCSSUrleng: string;

  constructor( public translate:TranslateService ,  public sanitizer: DomSanitizer){
    translate.addLangs(['en', 'ar']);
    this.currentLnag = localStorage.getItem("currentLnag")|| "en";
    this.translate.use(this.currentLnag);

   }

  ngOnInit() {
    this.dynamicCSSUrlar = './assets/css/styles-ar.css'
    this.dynamicCSSUrleng = './assets/css/styles-en.css'

  }
  changeCurrentLang(language: string): void
      {
        this.translate.use(language);
        localStorage.setItem("currentLnag",language);


          if (language == "ar")
          {
            this.loadArabic = true;
          }
          else
          {
            this.loadArabic = false;

          }

      }

      switchLang(lang: string) {
        this.translate.use(lang);

        if (lang == "ar")
        {
          this.loadArabic = true;
        }
        else
        {
          this.loadArabic = false;

        }
      }


}
