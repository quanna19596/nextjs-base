export type TCommonPaths = {};

export type TCommonQueries = {};

export type TCommonBody = {};

export type TCommonResponseSuccess = {};

export type TCommonResponseError = {};

export type TPaths<T = {}> = TCommonPaths & T;
export type TQueries<T = {}> = TCommonQueries & T;
export type TBody<T = {}> = TCommonBody & T;
export type TResponseSuccess<T = {}> = TCommonResponseSuccess & T;
export type TResponseFailed<T = {}> = TCommonResponseError & T;
export type TRequest<TP = {}, TQ = {}, TB = {}> = {
  paths?: TP;
  queries?: TQ;
  body?: TB;
};
