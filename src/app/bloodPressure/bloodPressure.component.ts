import {Component, OnInit, Input} from '@angular/core';
import { MdVisionService } from '../shared/mdVision.service';
import {nvD3} from 'ng2-nvd3'
declare let d3: any;

@Component({
  selector: 'BloodPressureComponent',
  styleUrls: ['./bloodPressure.component.css'],
  templateUrl: './bloodPressure.component.html',
  
  providers:[MdVisionService]
})
export class BloodPressureComponent implements OnInit {
  options;
  data: any;
 
  constructor(private _mdVisionService: MdVisionService)
  {
    
  }

  ngOnInit()
  {
    this._mdVisionService.getBloodPressureData()
      .then((bloodPressures) =>
      {
          this.data = this.formatData(bloodPressures);
          console.log(this.data);
      });

this.options = {
   chart: {
                type: 'lineWithFocusChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 40
                },
                duration: 50,
                xAxis: {
                    axisLabel: 'Days',
                    tickFormat: function(d){
                         return d3.format(',f')(d);
                    }
                },
                x2Axis: {
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                yAxis: {
                    axisLabel: 'B.P',
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    },
                    rotateYLabel: false
                },
                y2Axis: {
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                }

            }
  };
}

  private  formatData(data)
  {
    let resultantData = [];

   
    resultantData.push({key: 'systolic', values:[]});
    resultantData.push({key: 'diastolic', values:[]});


    if(data && data.measurement.length > 0)
    {
        let i = 0;
      for (let measurement of data.measurement) 
      {
        
        resultantData[0].values.push(
          {
              series:0,
              x: i,
              y: measurement.systolic
          }
        );
        resultantData[1].values.push(
          {
              series:1,
              x:i,
              y: measurement.diastolic
          }
        );
        i+=1;
      }
    }
    return resultantData;
  }


        
    

       



}
