import * as yup from 'yup';

export const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  status: yup.string().required(),
  projectId: yup.string().required(),
});