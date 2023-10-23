import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OpenAI } from 'openai';
import { Observable } from 'rxjs';
import OPENAI_API_KEY from '../../api';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  private readonly openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  constructor() {}

  public generateIdea(form: FormGroup): Observable<string | null> {
    const prompt = `
  Generate a business idea for 2023 considering the following information:
  
  Personal Background:
  - Educational Background: ${form.value.personalBackground.educationalBackground}
  - Current Occupation: ${form.value.personalBackground.currentOccupation}
  - Relevant Experiences: ${form.value.personalBackground.relevantExperiences}
  
  Interests:
  - ${form.value.interests}
  
  Skills:
  - ${form.value.skills}
  
  Resources:
  - Budget: ${form.value.resources.budget}
  - Physical Resources: ${form.value.resources.physicalResources}
  
  Market Preferences:
  - ${form.value.marketPreferences}
  
  Goals:
  - Short Term: ${form.value.goals.shortTerm}
  - Long Term: ${form.value.goals.longTerm}
  
  Target Audience:
  - Audience: ${form.value.targetAudience.targetAudience}
  - Insights: ${form.value.targetAudience.audienceInsights}
  
  Industry:
  - ${form.value.industry}
  
  Risk Tolerance:
  - ${form.value.riskTolerance}
  
  Vision:
  - ${form.value.vision}
  
  Time Commitment:
  - ${form.value.time}
  
  Geographic Considerations:
  - ${form.value.geo}
  
  Legal and Regulatory Requirements:
  - ${form.value.legal}
  `.trim();

    return new Observable((observer) => {
      this.openai.chat.completions
        .create({
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful assistant tasked with generating innovative business ideas for 2023.',
            },
            { role: 'user', content: prompt },
          ],
          model: 'gpt-3.5-turbo',
          temperature: 0.7,
          max_tokens: 2000,
        })
        .then((completion) => {
          if (completion?.choices[0]?.message?.content) {
            observer.next(completion.choices[0].message.content.trim());
          } else {
            observer.next(null);
          }
          observer.complete();
        })
        .catch((error) => {
          console.error(
            'Error calling OpenAI API:',
            error.response ? error.response.data : error.message
          );
          observer.error(error);
        });
    });
  }
}
