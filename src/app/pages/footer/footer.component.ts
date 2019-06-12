import { Component, OnInit, AfterViewInit } from '@angular/core';
import { footerAnimation } from 'src/app/animations/footer-animation';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [footerAnimation]
})
export class FooterComponent implements OnInit, AfterViewInit {
  state = 'none';

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.state = 'maximum';
  }
}
