import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-target-audience',
  templateUrl: './target-audience.component.html',
  styleUrls: ['./target-audience.component.scss'],
})
export class TargetAudienceComponent implements OnInit {
  @Input() public form!: FormGroup;

  public audience!: FormGroup;

  ngOnInit(): void {
    if (this.form) this.audience = this.form.get('targetAudience') as FormGroup;
  }
}
