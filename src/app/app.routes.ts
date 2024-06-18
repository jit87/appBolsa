import { Component } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditarAccionesComponent } from "./components/editar-acciones/editar-acciones.component";
import { ContenidoComponent } from "./components/contenido/contenido.component";
import { BuscadorEmpresaComponent } from "./components/buscador-empresa/buscador-empresa.component";


const APP_ROUTES: Routes = [
    { path:'contenido', component: ContenidoComponent},
    { path:'editar-acciones', component: EditarAccionesComponent},
    { path:'buscar/:ticker', component: BuscadorEmpresaComponent},
    { path:'**', pathMatch: 'full', redirectTo: 'contenido'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);