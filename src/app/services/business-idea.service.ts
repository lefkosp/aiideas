import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BusinessIdeaService {
  private businessIdea: string | null = null;

  setIdea(idea: string | null): void {
    this.businessIdea = idea;
  }

  getIdea(): string | null {
    return this.businessIdea;
  }
}
