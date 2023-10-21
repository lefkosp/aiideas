import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const MaterialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCheckboxModule,
  MatButtonModule,
  MatProgressSpinnerModule,
];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...MaterialModules],
  exports: [FormsModule, ReactiveFormsModule, ...MaterialModules],
})
export class MaterialModule {}
