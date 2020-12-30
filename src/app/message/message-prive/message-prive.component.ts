import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message-prive',
  templateUrl: './message-prive.component.html',
  styleUrls: ['./message-prive.component.scss']
})
export class MessagePriveComponent implements OnInit {

  emailCollegueContacte: string = '';

  constructor(private messageService: MessageService, private formBuilder: FormBuilder, private authService: AuthService, private routerLinkActive: ActivatedRoute ) { }

  ngOnInit(): void {

    this.emailCollegueContacte = this.routerLinkActive.snapshot.params['email'];
  }

}
