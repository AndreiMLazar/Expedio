import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  templateUrl: './error.component.html',
  // styleUrls: ['./error.component.scss'],
  selector: 'app-error',
})
export class ErrorComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string, duration: number }) {}
}
