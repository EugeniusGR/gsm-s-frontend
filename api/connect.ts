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
  const response = await instance.post('/create-user', {
    email,
    password,
    country,
    fullName,
  });
  console.log(response);
};

type LoginParams = {
  email: string;
  password: string;
};

export const loginUser = async ({ email, password }: LoginParams) => {
  const response = await instance
    .get('/login', {
      params: {
        email,
        password,
      },
    })
    .then((el) => console.log(el))
    .catch((error) => {
      console.log(JSON.stringify(error));
      console.log(error.body);
      console.log(error.message);
      console.log(error.data);
    });
};
