import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
})
export class GoalsComponent implements OnInit {
  @Input() public form!: FormGroup;

  public goals!: FormGroup;

  public ngOnInit(): void {
    if (this.form) this.goals = this.form.get('goals') as FormGroup;
  }
}
