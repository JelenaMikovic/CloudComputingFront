import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'cloud_front';
  constructor() {
  }

  public ngOnInit(): void {

  }

  public signOut(): void {
    // this.cognitoService.signOut()
    //   .then(() => {
    //     this.router.navigate(['/login']);
    //   });
  }
}
