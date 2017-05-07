import {Component, OnInit, Input} from '@angular/core';
import { MdVisionService } from '../shared/mdVision.service';
import {nvD3} from 'ng2-nvd3'
declare let d3: any;

@Component({
  selector: 'BloodPressureComponent',
  styleUrls: ['./bmi.component.css'],
  templateUrl: './bmi.component.html',
  
  providers:[MdVisionService]
})
export class BMIComponent implements OnInit {
  options;
  data: any;
 
  constructor(private _mdVisionService: MdVisionService)
  {
    
  }

  ngOnInit()
  {
    this._mdVisionService.getBMIData()
      .then((bmiData) =>
      {
          this.data = this.formatData(bmiData);
      });

this.options = {
chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
                xAxis: {
                    axisLabel: 'Time'
                },
                yAxis: {
                    axisLabel: 'Values',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: -10
                }
            }
           
  }
  }

  private formatData(data)
  {
    let resultantData = [];
    resultantData.push({ classed : 'dashed', color:"#ff7f0e",strokeWidth:2, key: 'BMI', values:[]});
    resultantData.push({classed : 'dashed', color:"#7777ff",strokeWidth:2, key: 'Weight', values:[]});

    if(data)
    {
        let count = 0;
      for (let measurement of data.measurement) 
      {
        
         resultantData[0].values.push(
          {
              series:0,
              x: count,
              y: measurement.bmi
          }
        );
        resultantData[1].values.push(
          {
              series:1,
              x:count,
              y: measurement.weight
          }
        );
        count+=1;

      }
    }
    return resultantData;
  }
}
