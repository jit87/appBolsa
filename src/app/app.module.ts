import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ObjectKeysPipe } from './object-keys.pipe';
import { GoogleChartsModule } from 'angular-google-charts';


//Rutas
import { APP_ROUTING } from './app.routes';

//Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { EditarAccionesComponent } from './components/editar-acciones/editar-acciones.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { EmpresaService } from './services/empresa.service';
import { StockService } from './services/stock.service';
import { IndustryChartComponent } from './components/industry-chart/industry-chart.component'; 
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContenidoComponent,
    EditarAccionesComponent,
    IndustryChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    APP_ROUTING,
    GoogleChartsModule,
    FormsModule
  ],
  providers: [EmpresaService,StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
