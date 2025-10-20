export type TCommonPaths = {};

export type TCommonQueries = {};

export type TCommonBody = {};

export type TCommonResponseSuccess = {};

export type TCommonResponseFailed = {};

export type TRequestPaths<T = {}> = TCommonPaths & T;

export type TRequestQueries<T = {}> = TCommonQueries & T;

export type TRequestBody<T = {}> = TCommonBody & T;

export type TResponseSuccess<T = {}> = TCommonResponseSuccess & T;

export type TResponseFailed<T = {}> = TCommonResponseFailed & T;

export type TRequest<TPaths = {}, TQueries = {}, TBody = {}> = {
  paths?: TPaths;
  queries?: TQueries;
  body?: TBody;
};

export type TRequestQueueItem = ((
  error: Error | null,
  accessToken?: string
) => void);
// export interface ICustomAxiosRequestConfig
//   extends Omit<AxiosRequestConfig, "headers"> {
//   headers: any;
// }
