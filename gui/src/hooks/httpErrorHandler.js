import { useState, useEffect } from "react";

export default (httpClient) => {
  const [error, setError] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });
  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (error) => {
      setError(error);
    }
  );
  
  useEffect(() => {
    // returned function will be called on component unmount
    return () => {
      httpClient.interceptors.request.eject(resInterceptor);
      httpClient.interceptors.request.eject(reqInterceptor);
    };
  }, [reqInterceptor, resInterceptor, httpClient]);

  const errorConfirmedHandler = () => {
    setError(null);
  };
  return [error, errorConfirmedHandler];
};
