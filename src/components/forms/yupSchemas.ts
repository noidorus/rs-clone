import { doesUsernameExist } from './../../firebase/services';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const required = 'Required field!';

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .required(required)
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Write correct email!'
    ),
  password: Yup.string().required(required),
});

const updateInfoSchema = Yup.object().shape({
  username: Yup.string()
    .required(required)
    .min(5, 'Min length 5')
    .test('checkDuplUsername', 'Username exist', async (value) => {
      const usernameExist = await doesUsernameExist(value);
      return usernameExist ? false : true;
    }),
  fullName: Yup.string().required(required).min(3, 'Min length 3'),
});

const signUpSchema = Yup.object().shape({
  username: Yup.string().required(required).min(5, 'Min length 5'),
  fullName: Yup.string().required(required).min(5, 'Min length 5'),
  email: Yup.string()
    .required(required)
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Write correct email!'
    ),
  password: Yup.string()
    .required(required)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#-_?&])[A-Za-z\d@$!%*#-_?&]{8,}$/,
      '8 symbols, 1 letter, 1 digit, 1 special character!'
    ),
});

export const signInResolver = yupResolver(signInSchema);
export const signUpResolver = yupResolver(signUpSchema);
export const updateInfoResolver = yupResolver(updateInfoSchema);

export type SignInSchemaType = Yup.InferType<typeof signInSchema>;
export type SignUpSchemaType = Yup.InferType<typeof signUpSchema>;
export type UpdateInfoSchemaType = Yup.InferType<typeof updateInfoSchema>;
