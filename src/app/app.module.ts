import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './core/in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';

const devImports = [];
if (isDevMode()) {
  devImports.push(
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 400 }),
  );
}
// that’s because in Angular 15 with AOT, isDevMode() can’t be used directly in the module imports array
// since it’s a runtime call, not a compile-time constant.
// we’ll fix it by moving the conditional logic outside of the @NgModule metadata.

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ...devImports, // safe: computed before the decorator runs
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
