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

Please provide a detailed business idea structured as follows:

**Executive Summary**
- **Elevator Pitch**: A brief (1-2 sentence) description of what your business does and the unique value proposition.
- **Mission and Vision**: State the business's purpose (mission) and the long-term goal (vision).

**Problem Statement**
- **Problem Identification**: Clearly describe the problem you have identified.
- **Target Audience**: Who experiences this problem? Describe the demographics, psychographics, and size of the potential market.

**Solution**
- **Product/Service Description**: What is your product or service, and how does it solve the identified problem?
- **Unique Selling Proposition (USP)**: Highlight what makes your solution unique or better than existing solutions.

**Market Analysis**
- **Market Size**: Estimate the number of potential customers and the value of the market.
- **Market Trends**: Identify major trends in the industry or market that your business is entering.
- **Competitive Analysis**: Who are your major competitors? What are their strengths and weaknesses?

**Business Model**
- **Revenue Streams**: How will the business make money? (e.g., sales, subscriptions, ads)
- **Pricing Strategy**: Describe the pricing mechanism.
- **Sales & Distribution**: How will the product or service be delivered to the customers?

**Marketing and Sales Strategy**
- **Positioning**: How do you want the market to perceive your product/service?
- **Promotion and Advertising**: How will you reach out to potential customers?
- **Sales Strategy**: Online sales, brick and mortar, direct sales, etc.

**Operational Plan**
- **Supply Chain**: If applicable, how will you obtain, produce, and distribute your product?
- **Technology**: What technology or software will be required?
- **Team**: Key team members and roles.

**Financial Projections**
- **Startup Costs**: Initial costs required to start the business.
- **Projected Income Statement**: Estimates of future revenues, costs, and profits.
- **Break-even Analysis**: Point at which total cost and total revenue are equal.

**Risks and Challenges**
- Identify potential risks and challenges your business might face.
- **Mitigation Strategies**: How do you plan to mitigate these risks?

**Conclusion/Ask**: Conclude your business idea, and if applicable, state any specific requirements or questions you have.
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
