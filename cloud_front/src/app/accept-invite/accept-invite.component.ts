import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AwsServiceService } from '../service/aws-service.service';

@Component({
  selector: 'app-accept-invite',
  templateUrl: './accept-invite.component.html',
  styleUrls: ['./accept-invite.component.css'],
})
export class AcceptInviteComponent {
  username: string = '';
  invitedBy: string = '';
  show: boolean = false;
  constructor(private route: ActivatedRoute, private awsService: AwsServiceService) {}

  async ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.username = params['username'];
      this.invitedBy = params['invitedBy'];
      this.sendRequest();
    });
  }
  async sendRequest() {
    const res = await this.awsService.processInvite(`accept?username=${this.username}&invitedBy=${this.invitedBy}`);
      res.subscribe({
        next: (response) => {
          this.show = true;
          console.log(response);
        },
        error: (error) => {
          console.log('Error sharing folder:', error);
        },
      });
  }
}
