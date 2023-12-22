import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { MeetData } from 'src/app/dataTransferObjects/MeetData';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  public chart: any;
  public meetsId: any;
  public countCustomers: any;

  constructor (private userService : UsersService ) {
  }

  ngOnInit(): void {
    this.createChart();
  }

  createChart(){
    this.userService.getStatistics()
    .subscribe({
      next : (response: Array<MeetData>) => {
        this.meetsId = response.map(meet => meet.meetId);
        this.countCustomers = response.map(meet => meet.customersCount);
        
        this.chart = new Chart("MyChart", {
          type: 'bar',
          data: {
            labels: this.meetsId, 
             datasets: [
              {
                label: "Количество посетителей",
                data: this.countCustomers,
                backgroundColor: 'blue'
              }, 
            ]
          },
    
          options: {
            aspectRatio:2.5
          }
          
        });
      },
      error : error => {
        console.log(error)
      }
    });
  }
}
