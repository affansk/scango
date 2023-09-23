import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://docs.bcomo.com/',
  headers: {
    'x-api-key': 'Affan',
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    const {message} = response?.data;

    if (message === 'error') {
      global.toast.show(message, {
        type: 'SUCCESS',
        placement: 'center',
        duration: 4000,
        animationType: 'zoom-in',
      });
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    const {data} = error?.response;
    global.toast.show(data?.message, {
      type: 'DANGER',
      placement: 'bottom',
      duration: 2000,
      animationType: 'zoom-in',
    });
    //console.log("error--",error?.response?.data);

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export function getIdByQrCode(qrCode: string) {
  return instance.get(`qrcode/${qrCode}`);
}
