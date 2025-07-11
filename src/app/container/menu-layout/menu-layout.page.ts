import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu-layout',
  templateUrl: './menu-layout.page.html',
  styleUrls: ['./menu-layout.page.scss'],
  standalone: false
})
export class MenuLayoutPage implements OnInit {

  constructor(private translate: TranslateService ) { }

  ngOnInit() {
  }

  setLang(lang: string){
    this.translate.use(lang);
    localStorage.setItem('lang', lang);  
  }

}
