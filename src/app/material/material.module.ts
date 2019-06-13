import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// tslint:disable-next-line: max-line-length
import { MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule, MatButtonModule, MatProgressSpinnerModule, MatRadioModule, MatSnackBarModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatExpansionModule, MatChipsModule, MatTabsModule } from '@angular/material';

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
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatChipsModule,
    MatTabsModule
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
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatChipsModule,
    MatTabsModule
  ]
})
export class MaterialModule { }
