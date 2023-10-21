import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit{
  @Input() public form!: FormGroup

  public resources!: FormGroup

  public ngOnInit(): void {
    if (this.form)
      this.resources = this.form.get('resources') as FormGroup
  }
}
