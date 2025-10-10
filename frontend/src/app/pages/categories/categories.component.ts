import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  form: FormGroup;
  editMode = false;
  editId: number | null = null;

  constructor(private cs: CategoryService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.cs.getAll().subscribe(res => this.categories = res);
  }

  async onSubmit() {
    if (this.form.invalid) return;

    const payload = { name: this.form.value.name };
    try {
      if (this.editMode && this.editId) {
        await lastValueFrom(this.cs.update(this.editId, payload));
      } else {
        await lastValueFrom(this.cs.create(payload));
      }
      this.form.reset();
      this.editMode = false;
      this.editId = null;
      this.loadCategories();
    } catch (err) {
      console.error(err);
      alert('Error saving category');
    }
  }

  editCategory(cat: any) {
    this.form.patchValue({ name: cat.name });
    this.editMode = true;
    this.editId = cat.id || null;
  }

  async deleteCategory(id: number) {
    if (!confirm('Are you sure to delete?')) return;
    try {
      await lastValueFrom(this.cs.delete(id));
      this.loadCategories();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  }

  cancelEdit() {
    this.form.reset();
    this.editMode = false;
    this.editId = null;
  }
}
