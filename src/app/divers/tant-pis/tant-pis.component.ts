import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-tant-pis',
  templateUrl: './tant-pis.component.html',
  styleUrls: ['./tant-pis.component.scss']
})
export class TantPisComponent implements OnInit {

  constructor(private notification: NotificationService) { }

  ngOnInit(): void {
  }

  redirection() {
    this.notification.showWarning("Non... vraiment... il conduit nulle part","Pas si vite !");
  }

}
