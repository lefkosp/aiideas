import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalBackgroundComponent } from './form/personal-background/personal-background.component';
import { FormComponent } from './form/form.component';
import { InterestsComponent } from './form/interests/interests.component';
import { SkillsComponent } from './form/skills/skills.component';
import { ResourcesComponent } from './form/resources/resources.component';
import { MarketComponent } from './form/market/market.component';
import { GoalsComponent } from './form/goals/goals.component';
import { TargetAudienceComponent } from './form/target-audience/target-audience.component';
import { RiskComponent } from './form/risk/risk.component';
import { VisionComponent } from './form/vision/vision.component';
import { TimeComponent } from './form/time/time.component';
import { GeoComponent } from './form/geo/geo.component';
import { LegalComponent } from './form/legal/legal.component';
import { MaterialModule } from '../material/material.module';
import { IndustryComponent } from './form/industry/industry.component';



@NgModule({
  declarations: [
    FormComponent,
    PersonalBackgroundComponent,
    InterestsComponent,
    SkillsComponent,
    ResourcesComponent,
    MarketComponent,
    GoalsComponent,
    TargetAudienceComponent,
    RiskComponent,
    VisionComponent,
    TimeComponent,
    GeoComponent,
    LegalComponent,
    IndustryComponent
  ],
  imports: [
    MaterialModule,
    CommonModule
  ],
  exports: [FormComponent]
})
export class FormModule { }
