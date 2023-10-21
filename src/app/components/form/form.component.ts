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
  public businessIdea: string | null = null;
  public loading: boolean = false;

  constructor(private fb: FormBuilder, private openaiService: OpenaiService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      personalBackground: this.fb.group({
        educationalBackground: ['', Validators.nullValidator],
        currentOccupation: ['', Validators.nullValidator],
        relevantExperiences: ['', Validators.nullValidator],
      }),
      interests: ['', Validators.nullValidator],
      skills: ['', Validators.nullValidator],
      resources: this.fb.group({
        budget: ['', Validators.nullValidator],
        physicalResources: ['', Validators.nullValidator],
      }),
      marketPreferences: ['', Validators.nullValidator],
      goals: this.fb.group({
        shortTerm: ['', Validators.nullValidator],
        longTerm: ['', Validators.nullValidator],
      }),
      targetAudience: this.fb.group({
        targetAudience: ['', Validators.nullValidator],
        audienceInsights: ['', Validators.nullValidator],
      }),
      industry: ['', Validators.nullValidator],
      riskTolerance: ['', Validators.nullValidator],
      vision: ['', Validators.nullValidator],
      time: ['', Validators.nullValidator],
      geo: ['', Validators.nullValidator],
      legal: ['', Validators.nullValidator],
    });
  }

  public getFormGroup(controlName: string): FormGroup {
    return this.form.get(controlName) as FormGroup;
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.openaiService.generateIdea(this.form).subscribe(
      (idea) => {
        this.businessIdea = idea;
        this.loading = false;
      },
      (error) => {
        console.error('Error generating business idea:', error);
      }
    );
  }
}
