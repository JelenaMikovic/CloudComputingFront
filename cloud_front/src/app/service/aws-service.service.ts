import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AwsServiceService {

  private endpoint = 'https://pvmabp3qtkiv7kcrr2ahdhcj7u0nrjhc.lambda-url.eu-central-1.on.aws';

  constructor(private http: HttpClient) {}

  public uploadFile(file?: File) {
    
    const formData = new FormData();
    let headers = {};

    if (file != null) {
    formData.append('file', file);

    headers = {
      filename: file.name
    };
  }
    return this.http.post(this.endpoint, JSON.stringify(formData), { headers });
}
}
