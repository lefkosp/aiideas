import { Injectable } from '@angular/core';
import { OpenAI } from 'openai';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  public openai = new OpenAI();

  constructor() {}

  public async main() {
    const completion = await this.openai.chat.completions.create({
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
      model: 'gpt-3.5-turbo',
    });

    console.log(completion?.choices[0]);
  }
}
