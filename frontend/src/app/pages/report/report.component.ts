import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html'
})
export class ReportComponent {
  downloading = false;

  constructor(private ps: ProductService) { }

  download(format: 'csv' | 'xlsx') {
    this.downloading = true;
    this.ps.downloadReport(format).subscribe({
      next: (blob: Blob) => {
        saveAs(blob, `products_report.${format === 'xlsx' ? 'xlsx' : 'csv'}`);
        this.downloading = false;
      },
      error: (err: any) => {
        console.error(err);
        alert('Download failed');
        this.downloading = false;
      }
    });
  }
}
