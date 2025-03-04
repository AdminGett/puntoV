import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-panlel-controll-admin',
  templateUrl: './panlel-controll-admin.page.html',
  styleUrls: ['./panlel-controll-admin.page.scss'],
})
export class PanlelControllAdminPage implements OnInit {
  segmentValue = 'all'; 
  constructor() { }
  segmentChanged(ev: any) {
    this.segmentValue = ev.detail.value;
    console.log('Segment changed', this.segmentValue);
    // Aquí puedes realizar acciones basadas en el valor del segmento
  }
  ngOnInit() {
  }

}
