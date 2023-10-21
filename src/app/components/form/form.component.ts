import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { OpenaiService } from 'src/app/services/openai.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public form!: FormGroup;

  constructor(private fb: FormBuilder, private openaiService: OpenaiService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      personalBackground: this.fb.group({
        educationalBackground: ['', Validators.required],
        currentOccupation: ['', Validators.required],
        relevantExperiences: ['', Validators.required],
      }),
      interests: ['', Validators.required],
      skills: ['', Validators.required],
      resources: this.fb.group({
        budget: ['', Validators.required],
        physicalResources: ['', Validators.required],
      }),
      marketPreferences: ['', Validators.required],
      goals: this.fb.group({
        shortTerm: ['', Validators.required],
        longTerm: ['', Validators.required],
      }),
      targetAudience: this.fb.group({
        targetAudience: ['', Validators.required],
        audienceInsights: ['', Validators.required],
      }),
      industry: ['', Validators.required],
      riskTolerance: ['', Validators.required],
      vision: ['', Validators.required],
      time: ['', Validators.required],
      geo: ['', Validators.required],
      legal: ['', Validators.required],
    });
  }

  public getFormGroup(controlName: string): FormGroup {
    return this.form.get(controlName) as FormGroup;
  }

  submit(): void {
    if (this.form.invalid) return;
  }
}
