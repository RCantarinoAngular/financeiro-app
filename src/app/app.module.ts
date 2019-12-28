
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './pages/navigation/nav/nav.component';
import { CoreModule } from './core/core.module'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [

    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
