import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../interfaces/Empresa';
import { Chart } from 'chart.js/auto'; 

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
})

export class ContenidoComponent implements OnInit /*, AfterViewInit*/ {
  symbol = ''; 
  stockQuote: any;
  StockPrice: number | undefined;
  total: number | undefined; 

  listEmpresas: Empresa[] = []
  mostrarGrafico = false;
  
  constructor(
    private stockService: StockService,
    public empresaService: EmpresaService,
    private cdr: ChangeDetectorRef
  ) {}

  chart: any;
  sectorData: { label: string; value: number }[] = [];

  ngOnInit(): void {
    this.listEmpresas = this.empresaService.getListEmpresas();
    // Verifica si el símbolo está presente antes de obtener el precio
    if (this.symbol) {
      // Obtiene y asigna el precio a StockPrice
      this.stockService.getPrice(this.symbol).subscribe((data: any) => {
        this.StockPrice = data.price;
      });
    }
  }

  /*ngAfterViewInit() {
    // Espera hasta que el DOM esté listo antes de intentar crear el gráfico
    setTimeout(() => {
      if (!this.mostrarGrafico) {
        this.createSectorChart();
      }
    });
  }*/

  eliminarAccion(empresa: Empresa) {
    this.empresaService.deleteEmpresa(empresa);
    this.listEmpresas = this.empresaService.getListEmpresas();
   /* this.createSectorChart();*/
  }

  /*private createSectorChart() {
    const totalInversion = this.getTotalInversion();
    this.sectorData = this.getSectorData();

    if (this.chart) {
      this.chart.destroy(); // Destruye el gráfico existente si hay uno
    }

    // Verificar si el elemento del DOM está disponible
    const ctx = document.getElementById('sectorChart') as HTMLCanvasElement | null;
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.sectorData.map(data => data.label),
          datasets: [
            {
              data: this.sectorData.map(data => (data.value / totalInversion) * 100),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800'],
            },
          ],
        },
      });
      this.mostrarGrafico = true;
      // Detectar cambios y asegurarse de que la vista se ha actualizado
      this.cdr.detectChanges();
    }
  }*/

  // Función para obtener la inversión total
  /*private getTotalInversion(): number {
    return this.empresaService.getListEmpresas().reduce((total, empresa) => total + empresa.invertido, 0);
  }

  // Función para obtener los datos de sectores
  private getSectorData(): { label: string; value: number }[] {
    const sectorData: { [sector: string]: number } = {};

    // Calcular la inversión por sector
    this.empresaService.getListEmpresas().forEach(empresa => {
      const sector = empresa.industria || 'Sin definir';
      sectorData[sector] = (sectorData[sector] || 0) + empresa.invertido;
    });

    // Convertir a formato de array
    return Object.entries(sectorData).map(([label, value]) => ({ label, value }));*/




    
  }

