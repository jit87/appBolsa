import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthModule, provideAuth0 } from '@auth0/auth0-angular';

//Rutas
import { APP_ROUTING } from './app.routes';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { EditarAccionesComponent } from './components/editar-acciones/editar-acciones.component'; 
import { BuscadorEmpresaComponent } from './components/buscador-empresa/buscador-empresa.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { FooterComponent } from './components/footer/footer.component';

// Servicios
import { EmpresaService } from './services/empresa.service';
import { StockService } from './services/stock.service';


@NgModule({
  declarations: [
    AppComponent,
    ContenidoComponent,
    EditarAccionesComponent,
    BuscadorEmpresaComponent,
    NavbarComponent,
    PerfilComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule, 
    APP_ROUTING,
     AuthModule.forRoot({
      domain: "dev-12csjvjuyvgnl25b.eu.auth0.com",
      clientId: "P6CZ7LGou5BKdtmuVaXBKTmKQot0cyTb",
       authorizationParams: {
         redirect_uri: window.location.origin
      }
     })
  ],
  providers: [EmpresaService, StockService, provideAuth0({
      domain: 'dev-12csjvjuyvgnl25b.eu.auth0.com',
      clientId: 'P6CZ7LGou5BKdtmuVaXBKTmKQot0cyTb',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })],
  bootstrap: [AppComponent]
})
export class AppModule { }
