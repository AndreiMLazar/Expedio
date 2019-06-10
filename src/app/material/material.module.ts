import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// tslint:disable-next-line: max-line-length
import { MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule, MatButtonModule, MatProgressSpinnerModule, MatRadioModule, MatSnackBarModule, MatSelectModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  exports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSnackBarModule,
    MatSelectModule
  ]
})
export class MaterialModule { }
