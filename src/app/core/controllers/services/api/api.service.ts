import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { map } from 'rxjs/internal/operators/map';
import { URLParam } from 'src/app/core/interfaces/url-param.interface';
import { RoutesUtil } from 'src/app/core/utils/route.util';
import { DownloadFile } from '../../../interfaces/download-file.interface';

interface IGetDelete<DataQuery> {
  readonly url?: string | URLParam;
  readonly query?: DataQuery;
}

interface IPostPatch<DataRequest> {
  readonly url?: string | URLParam;
  readonly request?: DataRequest;
}

@Injectable({
  providedIn: 'root',
})
export class APIService {
  protected readonly http: HttpClient;
  protected readonly baseURL: string;
  protected readonly prefix: string;

  constructor(
    private readonly injector: Injector,
    @Inject(String)
    baseURL: string,
    @Inject(String)
    prefix?: string
  ) {
    this.http = this.injector.get(HttpClient);
    this.baseURL = baseURL;
    this.prefix = prefix ?? '';
  }

  protected get<DataResponse, DataQuery>(
    getData?: IGetDelete<DataQuery>
  ): Promise<DataResponse> {
    const params = this.construirQueryParam(getData?.query);
    const endpoint = this.safeEndpoint(
      `${this.prefix}/${RoutesUtil.procesarURL(getData?.url)}`
    );

    return firstValueFrom(
      this.http.get<DataResponse>(`${this.baseURL}/${endpoint}`, {
        params,
      })
    );
  }

  protected post<DataResponse, DataRequest>(
    postData?: IPostPatch<DataRequest>
  ): Promise<DataResponse> {
    const endpoint = this.safeEndpoint(
      `${this.prefix}/${RoutesUtil.procesarURL(postData?.url)}`
    );

    return firstValueFrom(
      this.http.post<DataResponse>(
        `${this.baseURL}/${endpoint}`,
        postData?.request
      )
    );
  }

  protected patch<DataResponse, DataRequest>(
    patchData?: IPostPatch<DataRequest>
  ): Promise<DataResponse> {
    const endpoint = this.safeEndpoint(
      `${this.prefix}/${RoutesUtil.procesarURL(patchData?.url)}`
    );

    return firstValueFrom(
      this.http.patch<DataResponse>(
        `${this.baseURL}/${endpoint}`,
        patchData?.request
      )
    );
  }

  protected delete<DataResponse, DataQuery>(
    deleteData?: IGetDelete<DataQuery>
  ): Promise<DataResponse> {
    const params = this.construirQueryParam(deleteData?.query);
    const endpoint = this.safeEndpoint(
      `${this.prefix}/${RoutesUtil.procesarURL(deleteData?.url)}`
    );

    return firstValueFrom(
      this.http.delete<DataResponse>(`${this.baseURL}/${endpoint}`, {
        params,
      })
    );
  }

  // protected getBlob<DataQuery>(
  //   getData?: IGetDelete<DataQuery>
  // ): Promise<DownloadFile> {
  //   const params = this.construirQueryParam(getData?.query);
  //   const endpoint = this.safeEndpoint(
  //     `${this.prefix}/${RoutesUtil.procesarURL(getData?.url)}`
  //   );

  //   return firstValueFrom(
  //     this.http
  //       .get(`${this.baseURL}/${endpoint}`, {
  //         params,
  //         responseType: 'blob',
  //         observe: 'response',
  //       })
  //       .pipe(
  //         map((response) => {
  //           // // MÉTODO IMPORTANTE PARA CARGAR HEADERS
  //           response.headers.keys();
  //           const headersMap: Map<string, string[]> = (response.headers as any)
  //             .headers;

  //           const contentType = headersMap.get('content-type')![0];
  //           const filename = headersMap.get('filename')![0];

  //           return {
  //             file: new Blob([response.body!], { type: contentType }),
  //             filename: filename,
  //             contentType: contentType,
  //           };
  //         })
  //       )
  //   );
  // }

  // protected postBlob<DataQuery>(
  //   postData?: IPostPatch<DataQuery>
  // ): Promise<DownloadFile> {
  //   const endpoint = this.safeEndpoint(
  //     `${this.prefix}/${RoutesUtil.procesarURL(postData?.url)}`
  //   );

  //   return firstValueFrom(
  //     this.http
  //       .post(`${this.baseURL}/${endpoint}`, postData?.request, {
  //         responseType: 'blob',
  //         observe: 'response',
  //       })
  //       .pipe(
  //         map((response) => {
  //           // // MÉTODO IMPORTANTE PARA CARGAR HEADERS
  //           response.headers.keys();
  //           const headersMap: Map<string, string[]> = (response.headers as any)
  //             .headers;

  //           const contentType = headersMap.get('content-type')![0];
  //           const filename = headersMap.get('filename')![0];

  //           return {
  //             file: new Blob([response.body!], { type: contentType }),
  //             filename: filename,
  //             contentType: contentType,
  //           };
  //         })
  //       )
  //   );
  // }

  private construirQueryParam(query: any): {
    [param: string]: string;
  } {
    const params: {
      [param: string]: string;
    } = {};

    if (!query) return params;

    Object.keys(query).forEach((key) => {
      if (
        query[key] === null ||
        query[key] === undefined ||
        query[key].toString().trim().length === 0
      )
        return;

      params[key] = query[key].toString();
    });

    return params;
  }

  private safeEndpoint(endpoint: string): string {
    return endpoint
      .split('/')
      .filter((e) => e.length > 0)
      .join('/');
  }
}
