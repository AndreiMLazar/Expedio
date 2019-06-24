import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FileHandle } from 'src/app/directives/drag-and-drop.directive';

@Component({
  selector: 'app-change-picture',
  templateUrl: './change-picture.component.html',
  styleUrls: ['./change-picture.component.scss']
})
export class ChangePictureComponent implements OnInit {
  files: FileHandle[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  filesDropped(files: FileHandle[]): void {
    this.files = files;
  }

  upload() {
    this.authService.updateAvatar(this.files[0].file);
  }
}
