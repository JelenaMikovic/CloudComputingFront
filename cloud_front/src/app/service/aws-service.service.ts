import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwsServiceService {

  private endpoint = 'https://y0xjo65rb1.execute-api.eu-central-1.amazonaws.com/dev/file';

  constructor(private http: HttpClient) {}


  public uploadFile(type: string, lastModified: number, size: number, caption: string, file?: File) {
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
              type: type,
              lastModified: lastModified,
              size: size,
              caption: caption
            },
          };
          console.log(requestBody);
          this.http
            .post(this.endpoint, JSON.stringify(requestBody))
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
