import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessIdeaService } from 'src/app/services/business-idea.service';
import { LoadingService } from 'src/app/services/loading.service';

interface IBusinessIdea {
  idea: string;
  mvp: string;
  targetMarket: string;
  promotion: string;
  businessModel: string;
  pricing: string;
}

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.scss'],
})
export class IdeaComponent implements OnInit {
  public parsedIdea!: IBusinessIdea;
  public loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private businessIdeaService: BusinessIdeaService,
    private loadingService: LoadingService
  ) {
    this.loadingService.getLoadingStatus().subscribe((status) => {
      this.loading = status;
    });
  }

  ngOnInit(): void {
    const businessIdea = this.businessIdeaService.getIdea();
    if (businessIdea) this.parsedIdea = this.parseBusinessIdea(businessIdea);
  }

  parseBusinessIdea(text: string): IBusinessIdea {
    const sections = text.split(/\d+\.\s+\*\*\s*(?=\w)/); // Split the text into sections based on numbering and double asterisks

    // if (sections.length < 7) {
    //   // Ensure there are at least 7 sections as per your structure
    //   throw new Error('Invalid business idea format');
    // }

    // Extract information from each section while removing duplicate titles and asterisks
    const cleanUpSection = (section: string): string => {
      return section
        .replace(
          /^(Idea|MVP \(Minimum Viable Product\)|Target Market|Promotion|Business Model|Pricing)\*\*\s+-\s+/g,
          ''
        )
        .trim();
    };

    const idea = cleanUpSection(sections[1]);
    const mvp = cleanUpSection(sections[2]);
    const targetMarket = cleanUpSection(sections[3]);
    const promotion = cleanUpSection(sections[4]);
    const businessModel = cleanUpSection(sections[5]);
    const pricing = cleanUpSection(sections[6]);

    // Create an object with the extracted information
    const businessIdea: IBusinessIdea = {
      idea,
      mvp,
      targetMarket,
      promotion,
      businessModel,
      pricing,
    };

    return businessIdea;
  }
}
