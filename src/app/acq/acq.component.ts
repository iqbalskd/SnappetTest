import {Component, OnInit, Input} from '@angular/core';
import { MdVisionService } from '../shared/mdVision.service';
import {nvD3} from 'ng2-nvd3'
declare let d3: any;

@Component({
  selector: 'app-contact',
  templateUrl: './acq.component.html',
  styleUrls: ['./acq.component.css'],
})
export class AcqComponent implements OnInit {
options;
  data: any;
 
  constructor(private _mdVisionService: MdVisionService)
  {
    
  }

  ngOnInit()
  {
    this._mdVisionService.getAcqScores()
      .then((acqScores) =>
      {
          this.data = this.formatData(acqScores);
      });

this.options = {
   chart: {
                type: 'discreteBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                },
                x: function(d){return d.timeframe;},
                y: function(d){return d.score;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.2f')(d);
                },
                duration: 500,
                xAxis: {
                    axisLabel: 'Date',
                    tickFormat: function(d) {
                        return d3.time.format('%x')(new Date(d))
                    },
                    rotateLabels: 30,
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Score',
                    axisLabelDistance: -10
                },
                 zoom: {
                    enabled: true,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
  };
  }

  private formatData(acqData) {
    let resultantData = [];
    resultantData.push({key: 'ACQ Score', bar: true, values:[]});
    if(acqData.data)
    {
        let count = 0;
      for (let acq of acqData.data) 
      {
        
        resultantData[0].values.push(
         {
             timeframe: acq.body.effective_time_frame.date_time,
             score: acq.body.score
         }
        );
        count+=1;
        if(count==30)
        {
            break ;
        }
      }
    }
    return resultantData;
  }
}
