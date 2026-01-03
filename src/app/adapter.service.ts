import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IDownloadItemModelProperties, NewsModel } from './models';

@Injectable({
  providedIn: 'root',
})
export class AdapterService {
  constructor(private _http: HttpClient) {}

  getProjects(): Observable<IDownloadItemModelProperties[]> {
    return this._http
      .get(
        'https://raw.githubusercontent.com/Weebeveloper/white_blood_games/refs/heads/master/projects.txt',
        { responseType: 'text' }
      )
      .pipe(
        map((data) =>
          data
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line)
            .map((line) => {
              const [name, icon, description, fileUrl] = line.split('||');
              return {
                name,
                icon,
                description,
                fileUrl,
              } as IDownloadItemModelProperties;
            })
        )
      );
  }

  getNews(): Observable<NewsModel[]> {
    return this._http
      .get(
        'https://raw.githubusercontent.com/Weebeveloper/white_blood_games/refs/heads/master/updates.txt',
        { responseType: 'text' }
      )
      .pipe(
        map((data) =>
          data
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line)
            .slice(0, 20)
            .map((line) => {
              const [project, category, news] = line.split('||');
              return {
                project,
                category,
                news,
              } as NewsModel;
            })
        )
      );
  }
}
