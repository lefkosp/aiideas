import { Component, HostListener, OnInit } from '@angular/core';
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

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    // Determine the current scroll position
    const scrollY = window.scrollY;

    // Calculate the index of the section to snap to
    const sections = document.querySelectorAll('.form-section');
    let targetSectionIndex = 0;

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop > scrollY) {
        break; // Found the section to snap to
      }

      targetSectionIndex = i;
    }

    // Scroll to the target section
    const targetSection = sections[targetSectionIndex];
    this.scrollToSection(targetSection);
  }

  scrollToSection(section: Element): void {
    section.scrollIntoView({
      behavior: 'smooth', // Enable smooth scrolling
      block: 'start', // Align the start of the section with the top of the viewport
    });
  }

  public focusOnNextInputField(event: Event) {
    event.preventDefault();

    const currentInput = event.target as HTMLInputElement;
    const inputs = document.querySelectorAll('input, textarea');
    let found = false;

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i] === currentInput) {
        if (i < inputs.length - 1) {
          // Focus on the next input within the same section
          const nextInput = inputs[i + 1] as HTMLInputElement;
          nextInput.focus();
          found = true;
          break;
        }
      }
    }

    if (!found) {
      // If there's no next input to focus on, submit the form
      this.submit();
    }
  }

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
