import React, {createContext, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseURL = 'https://staging.unisocialsolutions.co.uk/api/';
const apiBaseURL = 'https://unisocialsolutions.co.uk/api/';
const assetBaseURL = 'https://unisocialsolutions.co.uk/api/';

const timeout = 60000;
export const ApiContext = createContext();

const getToken = async () => {
  const userInfoString = await AsyncStorage.getItem('userInfo');
  if (!userInfoString) {
    return null;
  }
  const userInfo = JSON.parse(userInfoString);
  return userInfo.api_token;
};

export const ApiProvider = props => {
  const get = async (url, options) => {
    const requestURL = `${baseURL}${url}`;
    const token = await getToken();
    axios
      .get(requestURL, {
        headers: {Authorization: `Bearer ${token}`},
        timeout: parseInt(timeout, 10),
      })
      .then(response => {
        if (options.success) {
          options.success(response);
        } else {
          __DEV__ && console.warn(response);
        }
      })
      .catch(error => {
        if (options.error) {
          options.error(error);
        } else {
          __DEV__ && console.warn(error);
        }
      });
  };

  const post = async (url, params, form, options) => {
    let CancelToken = axios.CancelToken;
    const requestURL = `${baseURL}${url}`;
    const token = await getToken();
    axios
      .post(requestURL, params, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': form ? 'multipart/form-data' : 'application/json',
        },
        timeout: parseInt(timeout, 10),
        onDownloadProgress: progress => {
          if (options.onDownloadProgress) {
            options.onDownloadProgress(progress);
          }
        },
        onUploadProgress: progress => {
          if (options.onUploadProgress) {
            options.onUploadProgress(progress);
          }
        },
        cancelToken: new CancelToken(cancel => {
          if (options.cancel) {
            options.cancel(cancel);
          }
        }),
      })
      .then(response => {
        if (options.success) {
          options.success(response.data);
        } else {
          __DEV__ && console.warn(response.data);
        }
      })
      .catch(error => {
        if (options.error) {
          options.error(error);
        } else {
          __DEV__ && console.warn(error);
        }
      });
  };

  const put = async (url, params, options) => {
    let CancelToken = axios.CancelToken;
    const requestURL = `${baseURL}${url}`;
    const token = await getToken();

    axios
      .put(requestURL, params, {
        headers: {Authorization: `Bearer ${token}`},
        timeout: parseInt(timeout, 10),
        onDownloadProgress: progress => {
          if (options.onDownloadProgress) {
            options.onDownloadProgress(progress);
          }
        },
        onUploadProgress: progress => {
          if (options.onUploadProgress) {
            options.onUploadProgress(progress);
          }
        },
        cancelToken: new CancelToken(cancel => {
          if (options.cancel) {
            options.cancel(cancel);
          }
        }),
      })
      .then(response => {
        if (options.success) {
          options.success(response.data);
        } else {
          __DEV__ && console.warn(response.data);
        }
      })
      .catch(error => {
        if (options.error) {
          options.error(error);
        } else {
          __DEV__ && console.warn(error);
        }
      });
  };

  const patch = async (url, params, options) => {
    let CancelToken = axios.CancelToken;
    const requestURL = `${baseURL}${url}`;
    const token = await getToken();

    axios
      .patch(requestURL, params, {
        headers: {Authorization: `Bearer ${token}`},
        timeout: parseInt(timeout, 10),
        onDownloadProgress: progress => {
          if (options.onDownloadProgress) {
            options.onDownloadProgress(progress);
          }
        },
        onUploadProgress: progress => {
          if (options.onUploadProgress) {
            options.onUploadProgress(progress);
          }
        },
        cancelToken: new CancelToken(cancel => {
          if (options.cancel) {
            options.cancel(cancel);
          }
        }),
      })
      .then(response => {
        if (options.success) {
          options.success(response.data);
        } else {
          __DEV__ && console.warn(response.data);
        }
      })
      .catch(error => {
        if (options.error) {
          options.error(error);
        } else {
          __DEV__ && console.warn(error);
        }
      });
  };

  const remove = async (url, params, options) => {
    const requestURL = `${baseURL}${url}`;
    const token = await getToken();

    axios
      .delete(requestURL, {
        headers: {Authorization: `Bearer ${token}`},
        timeout: parseInt(timeout, 10),
        data: {...params},
        params: {...params},
      })
      .then(response => {
        if (options.success) {
          options.success(response.data);
        } else {
          __DEV__ && console.warn(response.data);
        }
      })
      .catch(error => {
        if (options.error) {
          options.error(error);
        } else {
          __DEV__ && console.warn(error);
        }
      });
  };

  const postNotification = deviceToken => {
    let data = JSON.stringify({
      to: deviceToken,
      notification: {
        title: 'Hey User!',
        body: 'You triggered a notification on button click',
        mutable_content: true,
      },
      data: {
        url: '<url of media image>',
        dl: '<deeplink action on tap of notification>',
      },
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://fcm.googleapis.com/fcm/send?',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'key=AAAAoqEoZfQ:APA91bFSYYvo4QRCtgDHKhnFeLFSdGZGRH-rpKB4_te2ngVtpf5u-bjY-t3VvQOykozRPTgzwIcCN2g7lpkSvhfMilm87yTt5TbTj602v31M9i879l9AONaOHSpbbd0jNi6LVRDRUrvl',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const contextValue = {
    baseURL,
    apiBaseURL,
    assetBaseURL,
    get,
    post,
    remove,
    put,
    patch,
    postNotification,
  };

  return (
    <ApiContext.Provider value={contextValue}>
      {props.children}
    </ApiContext.Provider>
  );
};

export const useAxios = () => useContext(ApiContext);
