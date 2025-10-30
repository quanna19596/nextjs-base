export type TService = {
  name: string;
  baseUrl: string;
  groups: TGroup[];
};

export type TGroup = {
  name: string;
  endpoints: TEndpoint[];
};

export type TEndpoint = {};
