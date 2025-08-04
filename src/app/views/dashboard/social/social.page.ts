import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-social',
  templateUrl: './social.page.html',
  styleUrls: ['./social.page.scss'],
  standalone: false,
})
export class SocialPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  modalDismiss() {
    this.modalCtrl.dismiss();
  }
}
