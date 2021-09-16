import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@material-ui/core';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import authApi from 'apis/authApi';
import Page from 'components/Page';

export const EditUser = () => {
  const history = useHistory();
  const { id } = useParams();

  const UserSchema = Yup.object().shape({
    name: Yup.string()
      .required('Vui lòng nhập tên người dùng')
      .min(4, 'Tên người dùng chưa ít nhât 4 kí tự'),
    role: Yup.string().required('Vui lòng chọn chức vụ'),
    status: Yup.string().required('Vui lòng chọn trạng thái tài khoản')
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      status: '',
      role: '',
      email: ''
    },
    validationSchema: UserSchema,
    onSubmit: async (values) => {
      authApi
        .update(id, values)
        .then(() => {
          history.push('/dashboard/user');
          toast.success('Sửa thông tin tài khoản thành công');
        })
        .catch((err) => toast.error(err));
    }
  });
  const { handleSubmit, getFieldProps, touched, errors, values, setFieldValue } = formik;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = authApi.getById(id);
        const { user } = res.data;
        setFieldValue('name', user.name);
        setFieldValue('role', user.role);
        setFieldValue('email', user.email);
        setFieldValue('status', user.status);
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };
    fetchUser();
  }, [id, setFieldValue]);
  return (
    <Page title="Sủa | CMS">
      <Container maxWidth="2xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Sửa thông tin
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/user">
            Danh sách Tài khoản
          </Button>
        </Stack>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <Stack mb={5}>
              <TextField
                fullWidth
                autoComplete="name"
                type="text"
                label="Tên người dùng"
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
            </Stack>
            <Stack mb={5}>
              <TextField
                fullWidth
                autoComplete="email"
                type="text"
                label="Email"
                {...getFieldProps('email')}
                value={values.email}
                disabled
              />
            </Stack>
            <Stack mb={5}>
              <FormControl variant="outlined">
                <InputLabel id="status">Trạng thái</InputLabel>
                <Select
                  labelId="status"
                  id="status"
                  defaultValue={values.status}
                  label="Trạng thái"
                  {...getFieldProps('status')}
                  error={Boolean(touched.status && errors.status)}
                >
                  <MenuItem value="ACTIVE">Active</MenuItem>
                  <MenuItem value="DISABLE">Disable</MenuItem>
                </Select>
                {Boolean(touched.status && errors.status) && (
                  <FormHelperText error={Boolean(touched.status && errors.status)}>
                    {touched.status && errors.status}
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
            <Stack mb={5}>
              <FormControl variant="outlined">
                <InputLabel id="role">Chức vụ</InputLabel>
                <Select
                  labelId="role"
                  id="role"
                  defaultValue={values.role}
                  label="Chức vụ"
                  {...getFieldProps('role')}
                  error={Boolean(touched.role && errors.role)}
                >
                  <MenuItem value="USER">User</MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                </Select>
                {Boolean(touched.role && errors.role) && (
                  <FormHelperText error={Boolean(touched.role && errors.role)}>
                    {touched.role && errors.role}
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
            <Button variant="contained" size="large" type="submit">
              Lưu
            </Button>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
};
