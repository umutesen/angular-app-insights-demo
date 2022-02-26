import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveEnd, Router } from '@angular/router';
import { MonitoringService } from './monitoring.service';
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularAppInsightsDemo';

  constructor(private monitoringService: MonitoringService,
    private router: Router) { }

  ngOnInit() {
    this.router.events
      .pipe(filter((event): event is ResolveEnd => event instanceof ResolveEnd))
      .subscribe((event) => {
        const activatedComponent = this.getActivatedComponent(event.state.root);
        if (activatedComponent) {
          this.monitoringService.logPageView(activatedComponent.id, event.url);
        }
      });

    this.monitoringService.logInfo('App initialised at ' + new Date().toString());

    this.monitoringService.logError(new Error('My bug-free app throws an error'));

    throw new Error('An unhandled exception never happens, really.');
  }

  private getActivatedComponent(snapshot: ActivatedRouteSnapshot): any {
    if (snapshot.firstChild) {
      return this.getActivatedComponent(snapshot.firstChild);
    }

    return snapshot.component;
  }
}
