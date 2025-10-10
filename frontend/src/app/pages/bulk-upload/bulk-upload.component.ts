import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import * as Papa from 'papaparse';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html'
})
export class BulkUploadComponent {
  uploading = false;
  progress = 0;
  batchSize = 200;

  constructor(private ps: ProductService) { }

  onFileSelected(ev: any) {
    const file: File = ev.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results: any) => {
        const rows = results.data as any[];
        await this.uploadInBatches(rows);
      },
      error: (err: any) => {
        console.error(err);
        alert('CSV parse error');
      }
    });
  }

  async uploadInBatches(rows: any[]) {
    this.uploading = true;
    const batches = [];
    for (let i = 0; i < rows.length; i += this.batchSize) {
      batches.push(rows.slice(i, i + this.batchSize));
    }

    for (let i = 0; i < batches.length; i++) {
      try {
        await lastValueFrom(this.ps.bulkUploadBatch(batches[i]));
        this.progress = Math.round(((i + 1) / batches.length) * 100);
      } catch (err) {
        console.error('Batch upload failed', err);
        alert('Batch upload failed; see console');
        break;
      }
    }
    this.uploading = false;
    alert('Bulk upload finished (or stopped on error).');
  }
}
