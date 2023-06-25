import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { FilesResponse } from '../model/files';

@Injectable({
  providedIn: 'root',
})
export class AwsServiceService {
  private endpoint =
    'https://78w51v1ay5.execute-api.eu-central-1.amazonaws.com/dev/';

  private jwt: string = '';
  private headers = new HttpHeaders({Authorization: ''});
  
  constructor(private http: HttpClient, private cognitoService: AuthService) {}

  public uploadFile(
    type: string,
    lastModified: number,
    size: number,
    caption: string,
    tags: string[],
    file?: File,
    foldername?: string
  ) {
    this.getToken();
    
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
              caption: caption,
              tags: tags,
              foldername: foldername
            },
          };
          this.http
            .post(this.endpoint + "file", JSON.stringify(requestBody), { headers: this.headers })
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

  private async getToken() {
    await this.cognitoService.getToken().then((res) => {
      console.log(res);
      this.jwt = res;

      console.log(this.jwt);
      this.headers = new HttpHeaders({
        Authorization: this.jwt,
      });
    });
  }

  public async getFiles(folderName: string): Promise<Observable<FilesResponse>> {
    await this.getToken();
    let path = folderName.replace(/\//g, "-");
    return this.http.get<FilesResponse>(this.endpoint + "files/" + path  + "-", { headers: this.headers}).pipe();
  }

  public async getAlbums(folderName: string): Promise<Observable<any>> {
    await this.getToken();
    return this.http.get(this.endpoint + "album/" + folderName, { headers: this.headers });
  }

  public async createAlbum(folderName: string): Promise<Observable<any>> {
    await this.getToken();
    return this.http.post(this.endpoint + "album", {"foldername": folderName}, { headers: this.headers });
  }
}
