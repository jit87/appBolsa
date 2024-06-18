import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

//Rutas
import { APP_ROUTING } from './app.routes';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { EditarAccionesComponent } from './components/editar-acciones/editar-acciones.component'; 
import { BuscadorEmpresaComponent } from './components/buscador-empresa/buscador-empresa.component';

// Servicios
import { EmpresaService } from './services/empresa.service';
import { StockService } from './services/stock.service';

@NgModule({
  declarations: [
    AppComponent,
    ContenidoComponent,
    EditarAccionesComponent,
    BuscadorEmpresaComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule, 
    APP_ROUTING
  ],
  providers: [EmpresaService, StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
