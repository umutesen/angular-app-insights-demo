import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalErrorHandler } from './global-error-handler';
import { ApplicationInsights, IConfig, IConfiguration, SeverityLevel } from '@microsoft/applicationinsights-web';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: ApplicationInsights,
      useFactory: appInsightsFactory
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function appInsightsFactory(): ApplicationInsights {
  const config: IConfig & IConfiguration = {
    instrumentationKey: environment.appInsightsKey,
    disableTelemetry: environment.appInsightsKey === "",
    enableCorsCorrelation: true
  };

  // send telemetry immediately for dev environment 
  if (!environment.production) {
    config.maxBatchInterval = 0;
    config.maxBatchSizeInBytes = 0;
    config.loggingLevelConsole = 2; // log internal app insights errors to console
  }

  return new ApplicationInsights({ config: config });
}
