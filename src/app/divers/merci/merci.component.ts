import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-merci',
  templateUrl: './merci.component.html',
  styleUrls: ['./merci.component.scss']
})
export class MerciComponent implements OnInit {

  // INITIALISATION
  compteur:number = 0;
  remerciementsRestant:number = 10;
  constructor(private notification: NotificationService,
    private router: Router) { }

  ngOnInit(): void {
  }


  redirection() {
    this.remerciementsRestant--;
    if(this.remerciementsRestant==0) {
      this.router.navigate(['/accueil']);
    } 
    else if (this.remerciementsRestant==1) {
      this.notification.showSuccess("C'est le dernier... Encore merci !","Merci !!!");
    }
    else 
    {
      this.notification.showSuccess("Je vous dois encore quelques remerciements! Disons... encore "+this.remerciementsRestant+" ??","Merci !!!");
    }  
  }
}
