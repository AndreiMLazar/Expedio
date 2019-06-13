import { Component, OnInit } from '@angular/core';
import { CommandService } from 'src/app/services/command.service';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PeriodicElement } from '../overview/overview.component';
import { ClientFormModel } from 'src/app/models/client-form.model';

@Component({
  selector: 'app-my-commands',
  templateUrl: './my-commands.component.html',
  styleUrls: ['./my-commands.component.scss']
})
export class MyCommandsComponent implements OnInit {
  panelOpenState = true;
  userCommands: ClientFormModel[] = [];

  constructor(public commandService: CommandService, public authService: AuthService) { }

  ngOnInit() {
    this.commandService.getClientCommands(this.authService.currentUser.email).subscribe(res => {
      console.log(res);
      this.userCommands = res;
    });
  }

}
