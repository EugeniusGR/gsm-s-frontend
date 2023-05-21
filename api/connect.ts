import instance from './client';

type CreateUserParams = {
  email: string;
  password: string;
  country: string;
  fullName: string;
};

export const createUser = async ({
  email,
  password,
  country,
  fullName,
}: CreateUserParams) => {
  return await instance
    .post('/create-user', {
      email,
      password,
      country,
      fullName,
    })
    .then((el) => el.data)
    .catch((error) => {
      console.log('error', error.message);
      return false;
    });
};

type LoginParams = {
  email: string;
  password: string;
};

export const loginUser = async ({ email, password }: LoginParams) => {
  return await instance
    .get('/login', {
      params: {
        email,
        password,
      },
    })
    .then((el) => el.data)
    .catch((error) => {
      return false;
    });
};

export const getSensorData = async (userId: string) => {
  return await instance
    .get('/get-sensor-data', {
      params: {
        userId,
      },
    })
    .then((el) => el.data)
    .catch((error) => {
      console.log('error', error.message);
      return false;
    });
};

export const getNotifications = async (userId: string) => {
  return await instance
    .get('/get-notifications-data', {
      params: {
        userId,
      },
    })
    .then((el) => el.data)
    .catch((error) => {
      console.log('error', error.message);
      return false;
    });
};

export const logSensorData = async (sensorData: {
  sensorId: string;
  temperature: string;
  isMove: boolean;
  isSound: boolean;
  isGus: boolean;
  isOn: boolean;
  userId: string;
}) => {
  return await instance
    .post('/log-sensor', sensorData)
    .then((el) => el.data)
    .catch((error) => {
      console.log('error', error.message);
      return false;
    });
};

export const getUserData = async (userId: string) => {
  return await instance
    .get('/get-user', {
      params: {
        userId,
      },
    })
    .then((el) => el.data)
    .catch((error) => {
      console.log('error', error.message);
      return false;
    });
};
