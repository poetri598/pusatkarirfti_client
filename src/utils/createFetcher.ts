import api from "./api";
import { ApiResponse } from "@/utils/responseController";

export const createFetcher = <T>(endpoint: string, setData: React.Dispatch<React.SetStateAction<T>>, setError: React.Dispatch<React.SetStateAction<string | null>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  return async () => {
    try {
      const res = await api.get<ApiResponse<T>>(endpoint);
      if (res.data.status === "success") {
        setData(res.data.data);
      } else {
        setError(res.data.message);
      }
    } catch (err: any) {
      setError(err.message || "Unable to fetch data");
    } finally {
      setLoading(false);
    }
  };
};
