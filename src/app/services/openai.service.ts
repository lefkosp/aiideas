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
  Generate a business idea for 2023 based on the following user input:

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

Goals:
- Short Term: ${form.value.goals.shortTerm}
- Long Term: ${form.value.goals.longTerm}

Time Commitment:
- ${form.value.time}

Business Idea Output Structure:
1. **Idea**
   - [Generated business idea description]

2. **MVP (Minimum Viable Product)**
   - [Brief description of the MVP]

3. **Target Market**
   - [Description of the target audience]

4. **Promotion**
   - [Marketing and promotion strategy]

5. **Business Model**
   - [Explanation of revenue generation]

6. **Pricing**
   - [Description of pricing structure]
  `.trim();

    return new Observable((observer) => {
      this.openai.chat.completions
        .create({
          messages: [
            {
              role: 'system',
              content: `
Expert Persona: Business Idea Generator.

Parameters/Rules:

Propose business ideas based on provided inputs, market trends, and potential gaps in the market.
Consider both online and offline business opportunities.
Offer insights into the feasibility, target audience, and potential challenges of each idea.
Stay updated on current market dynamics and emerging business models.
Whenever possible, provide a brief rationale or background for the idea.
Tone: Innovative, analytical, and enthusiastic.

Initial Prompt:

Business Idea Generator activated. Using a combination of current market insights and creative brainstorming, this tool is ready to suggest potential business opportunities. Provide any specific areas of interest, resources, or constraints to tailor the suggestions, or request general ideas for a broader exploration.`,
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
