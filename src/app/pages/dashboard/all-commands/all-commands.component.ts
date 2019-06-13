import { Component, OnInit } from '@angular/core';
import { ClientFormModel } from 'src/app/models/client-form.model';
import { CommandService } from 'src/app/services/command.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-all-commands',
  templateUrl: './all-commands.component.html',
  styleUrls: ['./all-commands.component.scss']
})
export class AllCommandsComponent implements OnInit {
  displayedColumns: string[] = ['Recipient Name', 'Recipient Address', 'Loading Address',
    'Deposit Address', 'Packages'];
  dataSource: ClientFormModel[] = [];

  constructor(public commandService: CommandService, public authService: AuthService) { }

  ngOnInit() {
    this.commandService.getClientCommands(this.authService.currentUser.email).subscribe(res => {
      this.dataSource = res;
      console.log(this.dataSource);
    });
  }
}
