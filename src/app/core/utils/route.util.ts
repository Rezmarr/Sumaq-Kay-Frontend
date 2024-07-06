import { URLParam } from '../interfaces/url-param.interface';

export namespace RoutesUtil {
  export function procesarURL(data: string | URLParam | undefined): string {
    if (!data) return '';

    if (typeof data === 'string') return data;

    let baseURL = data.url;

    for (let i = 0; i < data.params.length; i++) {
      baseURL = baseURL.replace('$' + (i + 1), data.params[i]);
    }

    return baseURL;
  }
}
