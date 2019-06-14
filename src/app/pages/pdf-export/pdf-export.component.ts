import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { ClientFormModel } from 'src/app/models/client-form.model';

@Component({
  selector: 'app-pdf-export',
  templateUrl: './pdf-export.component.html',
  styleUrls: ['./pdf-export.component.scss']
})
export class PdfExportComponent implements OnInit, AfterViewInit {
  @ViewChild('content', { static: true }) private content: ElementRef;
  public order: ClientFormModel;
  quality = 2;

  print(quality: number) {
    const filename = this.router.snapshot.params.awb;

    html2canvas(document.querySelector('#content'), { scale: quality }).then(canvas => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
      pdf.save(filename);
    });
  }

  constructor(public orderService: OrderService,
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.orderService.getClientOrder(this.router.snapshot.params.awb).subscribe(res => {
      this.order = res[0];
    });
    console.log(this.order);
  }


  ngAfterViewInit(): void {
    this.print(this.quality);
  }
}
