import {Component, OnInit, Input} from '@angular/core';
import { snappetService } from '../shared/snappet.service';
import {nvD3} from 'ng2-nvd3'
import * as _ from 'underscore';

declare let d3: any;

@Component({
  selector: 'BloodPressureComponent',
  styleUrls: ['./correct.component.css'],
  templateUrl: './correct.component.html',
  
  providers:[snappetService]
})
export class correctComponent implements OnInit {
  options;
  data: any;
 
  constructor(private _snappetService: snappetService)
  {
    
  }

  ngOnInit()
  {
    this._snappetService.getCorrectAnswersData()
      .then((data) =>
      {
          this.data = this.formatData(data);
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
                    axisLabel: 'Date'
                },
                yAxis: {
                    axisLabel: 'Correct Count',
                    axisLabelDistance: -10
                }
            }
           
  }
  }

  private formatData(groups)
  {
    let resultantData = [];
    if(groups)
    {
        let groupCount = 0,
            color = "#ff7f0e";
         _(groups).map(function(group, key:string) {

             if(groupCount==1){
                color = "#2ca02c";
             } else {
                  color = "#7777ff";
             }

               

             
             resultantData.push({classed : 'dashed', color: color,strokeWidth:2, key: key, values:[]});

             // group the each subjects data date wise.
             let dateWiseData =  _.groupBy(group, function(dateRows:any){
                 let date = dateRows.SubmitDateTime.toString().trim();
                return new Date(date).getDate();
            });

            // Assume we have 31 days each month
            for(let i = 1; i<=31; i++)
            {
                var dataPoints = dateWiseData[i],
                    date = null;
                resultantData[groupCount].values.push(
                    {
                        series:groupCount,
                        x: i,
                        y: _(dataPoints).reduce(function(correctCount,instance) { return (correctCount + instance.Correct) }, 0) 
                    }
                );
            }

              
            groupCount+=1;
        });
    }
    return resultantData;
  }
  
}
