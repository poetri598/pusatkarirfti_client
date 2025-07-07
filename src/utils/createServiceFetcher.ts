type ServiceFn<T> = () => Promise<{
  success: boolean;
  data?: T;
  error?: string;
}>;

export const createServiceFetcher = <T>(
  serviceFn: ServiceFn<T>,
  setData: React.Dispatch<React.SetStateAction<T>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return async () => {
    try {
      const res = await serviceFn();
      if (res.success && res.data) {
        setData(res.data);
        setError(null);
      } else {
        setError(res.error || "Terjadi kesalahan");
      }
    } catch (err: any) {
      setError(err.message || "Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };
};
