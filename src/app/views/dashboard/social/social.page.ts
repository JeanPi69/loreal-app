import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-social',
  templateUrl: './social.page.html',
  styleUrls: ['./social.page.scss'],
  standalone: false
})
export class SocialPage implements OnInit {

  isLoading = true;

  constructor() { }

  ngOnInit() {
  }

}
