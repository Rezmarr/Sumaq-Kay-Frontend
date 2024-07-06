export namespace ErrorUtil {
  export function getApiErrorMessage(error: any): string {
    try {
      if (error.error instanceof Blob)
        return error.statusText ?? 'Algo salió mal, inténtalo más tarde';

      if (
        !error ||
        !error.error ||
        !error.error.message ||
        typeof error.error.message !== 'string' ||
        error.error.message.trim().length === 0
      )
        return 'Algo salió mal, inténtalo más tarde';

      return error.error.message;
    } catch (error) {
      return 'Algo salió mal, inténtalo más tarde';
    }
  }
}
