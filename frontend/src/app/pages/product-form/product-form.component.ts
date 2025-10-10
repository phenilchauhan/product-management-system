import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  categories: any[] = [];
  editMode = false;
  productId: number | null = null;
  file: File | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private ps: ProductService,
    private cs: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      categoryId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.cs.getAll().subscribe(res => this.categories = res);

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.productId = +id;
      this.ps.getProductById(+id).subscribe(p => {
        this.form.patchValue({ name: p.name, price: p.price, categoryId: p.categoryId });
      });
    }
  }

  onFileChange(ev: any) {
    this.file = ev.target.files?.[0] || null;
  }

  async onSubmit() {
    if (this.form.invalid) return;

    const fd = new FormData();
    fd.append('name', this.form.value.name);
    fd.append('price', String(this.form.value.price));
    fd.append('categoryId', String(this.form.value.categoryId));
    if (this.file) fd.append('image', this.file);

    this.loading = true;
    try {
      if (this.editMode && this.productId) {
        await lastValueFrom(this.ps.updateProduct(this.productId, fd));
      } else {
        await lastValueFrom(this.ps.createProduct(fd));
      }
      this.router.navigateByUrl('/products');
    } catch (err) {
      console.error(err);
      alert('Save failed');
    } finally {
      this.loading = false;
    }
  }
}
