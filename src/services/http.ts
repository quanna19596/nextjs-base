import { isAxiosError } from "axios";

const http = {
  request: async <TResponseSuccess, TResponseFailed>(
    promise: Promise<TResponseSuccess>,
  ): Promise<{
    data: TResponseSuccess | null;
    error: TResponseFailed | null | unknown;
  }> => {
    try {
      const data = await promise;
      return { data, error: null };
    } catch (error) {
      if (isAxiosError(error)) {
        return { data: null, error: error.response?.data as TResponseFailed };
      }
      return { data: null, error };
    }
  },
};

export default http;
