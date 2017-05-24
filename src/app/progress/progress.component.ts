import {Component, OnInit, Input} from '@angular/core';
import { snappetService } from '../shared/snappet.service';
import {nvD3} from 'ng2-nvd3';
import * as _ from 'underscore';


declare let d3: any;

@Component({
  selector: 'app-contact',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit {
options;
  data: any;
 
  constructor(private _snappetService: snappetService)
  {
    
  }

  ngOnInit()
  {
    this._snappetService.getProgressData()
      .then((progressData) =>
      {
          this.data = this.formatData(progressData);
      });

this.options = {
            chart: {
                type: 'multiBarHorizontalChart',
                height: 450,
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                //yErr: function(d){ return [-Math.abs(d.value * Math.random() * 0.3), Math.abs(d.value * Math.random() * 0.3)] },
                showControls: true,
                showValues: true,
                duration: 500,
                xAxis: {
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Values',
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                }
            }
        };
  }

  private formatData(groups) {
    let resultantData = [];
    resultantData.push({ key: "Commulative Progress",
                color: "#1f77b4", values:[]});
    if(groups)
    {
        
        
        //cumulative progress of each subject.
        var out = _(groups).map(function(group, key:string) {
            key = (key=="-") ? 'Unknown' : key;
           resultantData[0].values.push(  
            { 
                label: key, 
                value: _(group).reduce(function(m,x) { return m + x.Progress; }, 0) 
            }
           );
        });
    }
    return resultantData;
  }
}
