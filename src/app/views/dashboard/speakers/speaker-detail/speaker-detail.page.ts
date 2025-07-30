import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Speaker } from 'src/app/models/Dashboard';

@Component({
  selector: 'app-speaker-detail',
  templateUrl: './speaker-detail.page.html',
  styleUrls: ['./speaker-detail.page.scss'],
  standalone: false
})
export class SpeakerDetailPage implements OnInit {

  @Input() speaker!: Speaker;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log('Speaker Detail:', this.speaker);
  }

  async closeModal(){
    await this.modalCtrl.dismiss();
  }

}
