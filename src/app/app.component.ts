import { Component, OnInit } from '@angular/core';
import { ApplicationInsights, SeverityLevel } from '@microsoft/applicationinsights-web';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularAppInsightsDemo';

  constructor(private appInsights: ApplicationInsights) { }

  ngOnInit() {
    this.appInsights.loadAppInsights();

    this.appInsights.trackTrace({
      message: 'App initialised at ' + new Date().toString(),
      severityLevel: SeverityLevel.Information
    });

    this.appInsights.trackException({
      error: new Error('My bug-free app throws an error'),
    });

    throw new Error('An unhandled exception never happens, really.');
  }
}
