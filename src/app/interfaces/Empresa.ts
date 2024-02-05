import { StockService } from "../services/stock.service";

export interface Empresa{
    nombre: string;
    ticker: string;
    precio: number;
    acciones: number;
    per: number;
    invertido: number; 
   // yield: number; 
   // dividendos: number; 
}



