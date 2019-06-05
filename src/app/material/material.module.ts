import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule
  ],
  exports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
