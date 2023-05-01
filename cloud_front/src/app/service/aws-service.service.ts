import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwsServiceService {

  private endpoint = 'https://pvmabp3qtkiv7kcrr2ahdhcj7u0nrjhc.lambda-url.eu-central-1.on.aws/';

  constructor(private http: HttpClient) {}


  public uploadFile(file?: File) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Observable((observer) => {
        reader.onloadend = () => {
          const content = reader.result as string;
          const requestBody = {
            file: {
              filename: file.name,
              content: content.split(',')[1],
            },
          };
          console.log(requestBody);
          this.http
            .post(this.endpoint, JSON.stringify(requestBody), { headers })
            .subscribe(
              (response) => {
                observer.next(response);
                observer.complete();
              },
              (error) => observer.error(error)
            );
        };
      });
    } else {
      return new Observable();
    }
}
}
