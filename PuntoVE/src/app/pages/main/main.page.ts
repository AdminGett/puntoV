import { Component,  OnInit, inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  firebase= inject(FirebaseService)
  utils = inject(UtilsService)

  
  ngOnInit() {
  }

}
