import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import {categorias} from 'src/app/models/datatype'
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexPlotOptions,
  ApexYAxis,
  ApexAnnotations,
  ApexFill,
  ApexGrid,
  ApexTitleSubtitle,
 
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};
export type ChartOptionsBarras = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: any; //ApexXAxis;
  annotations: ApexAnnotations;
  fill: ApexFill;
  stroke: ApexStroke;
  grid: ApexGrid;
};

export type chartOptionsPastel = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
// --001|josue.deluna|CambioTipoGrafica|F-2509
@Component({
  selector: 'app-panlel-controll-admin',
  templateUrl: './panlel-controll-admin.page.html',
  styleUrls: ['./panlel-controll-admin.page.scss'],
})
export class PanlelControllAdminPage implements OnInit {
  // se crea variable para as graficas de tipo chartOption
  chartOptions:ChartOptions
  chartOptionsPastel:chartOptionsPastel
  category:any 
  chartOptionsBarras:ChartOptionsBarras

  segmentValue = 'graficas'; 
  constructor() {
    this.category= categorias
  }
  //Creacion de metodo para el funcionamiento del grafico
 generateData(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
  segmentChanged(ev: any) {
    this.segmentValue = ev.detail.value;
    // Aquí puedes realizar acciones basadas en el valor del segmento
  }
  ngOnInit() {
    //uso de la variable para llenar la variable del grafico
    // --001
   this.chartOptionsBarras = {
      series: [
        {
          name: "Servings",
          data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65, 35]
        }
      ],
      annotations: {
        points: [
          {
            x: "Bananas",
            seriesIndex: 0,
            label: {
              borderColor: "#775DD0",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#775DD0"
              },
              text: "Bananas are good"
            }
          }
        ]
      },
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
          // endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2
      },

      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"]
        }
      },
      xaxis: {
        labels: {
          rotate: -45
        },
        categories: [
          "Apples",
          "Oranges",
          "Strawberries",
          "Pineapples",
          "Mangoes",
          "Bananas",
          "Blackberries",
          "Pears",
          "Watermelons",
          "Cherries",
          "Pomegranates",
          "Tangerines",
          "Papayas"
        ],
        tickPlacement: "on"
      },
      yaxis: {
        title: {
          text: "Servings"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100]
        }
      }
    };// --001 Fina folio
    // this.chartOptions = {
    //   series: [
    //     {
    //       name: "series1",
    //       data: [31, 40, 28, 51, 42, 109, 100]
    //     },
    //     {
    //       name: "series2",
    //       data: [11, 32, 45, 32, 34, 52, 41]
    //     }
    //   ],
    //   chart: {
    //     height: 350,
    //     type: "area"
    //   },
    //   dataLabels: {
    //     enabled: false
    //   },
    //   stroke: {
    //     curve: "smooth"
    //   },
    //   xaxis: {
    //     type: "datetime",
    //     categories: [
    //       "2018-09-19T00:00:00.000Z",
    //       "2018-09-19T01:30:00.000Z",
    //       "2018-09-19T02:30:00.000Z",
    //       "2018-09-19T03:30:00.000Z",
    //       "2018-09-19T04:30:00.000Z",
    //       "2018-09-19T05:30:00.000Z",
    //       "2018-09-19T06:30:00.000Z"
    //     ]
    //   },
    //   tooltip: {
    //     x: {
    //       format: "dd/MM/yy HH:mm"
    //     }
    //   } 
    // };
    this.chartOptionsPastel={
      series: [44, 55, 13, 43, 22],
      chart: {
        type: "donut"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 100,
              height: 150,
              type: "area"
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    //Forsa el evento "reize", actualizando el chart 
    setTimeout(()=>(window as any).dispatchEvent(new Event('reize')),1);
    
  }

}
