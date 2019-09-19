import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalErrorHandler } from './global-error-handler';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

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
  return new ApplicationInsights({
    config: {
      instrumentationKey: 'INSTRUMENTATION_KEY'
    }
  });
}
