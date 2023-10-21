import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personal-background',
  templateUrl: './personal-background.component.html',
  styleUrls: ['./personal-background.component.scss']
})
export class PersonalBackgroundComponent implements OnInit{
  @Input() public form!: FormGroup

  public personalBackground!: FormGroup

  public ngOnInit(): void {
    if (this.form)
      this.personalBackground = this.form.get('personalBackground') as FormGroup
  }
}
