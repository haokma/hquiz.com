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
import categoryApi from 'apis/categoryApi';
import topicApi from 'apis/topicApi';
import Page from 'components/Page';
import { STATUS_LIST } from 'constants/index';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

export const EditTopic = () => {
  const history = useHistory();
  const { id } = useParams();

  const [categoryList, setCategoryList] = useState([]);

  const TopicSchema = Yup.object().shape({
    name: Yup.string()
      .required('Vui lòng nhập tên đề thi')
      .min(4, 'Tên đề thi chứa ít nhất 4 kí tư'),
    time: Yup.number('Vui long nhap dung ding dang').required('Vui lòng nhập thời gian làm bài'),
    total: Yup.number('Vui long nhap dung ding dang').required(
      'Vui lòng nhập tổng số câu của bài thi'
    ),
    categoryId: Yup.string().required('Vui lòng chọn danh mục'),
    status: Yup.string().required('Vui lòng chọn trạng thái đề thi')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      time: 0,
      total: 0,
      categoryId: '',
      status: ''
    },
    validationSchema: TopicSchema,
    onSubmit: async (values) => {
      try {
        await topicApi.update(id, values);
        toast.success('Sua de thi thanh cong');
        history.push('/dashboard/topic');
      } catch (error) {
        console.log(error);
      }
    }
  });
  const { handleSubmit, touched, errors, getFieldProps, setFieldValue } = formik;

  useEffect(() => {
    const fetchListCategory = async () => {
      try {
        const res = await categoryApi.getList();
        setCategoryList(res.data.categoryList);
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };
    fetchListCategory();
  }, []);
  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await topicApi.getById(id);
        const { topic } = res.data;
        console.log(topic);
        setFieldValue('time', topic.time);
        setFieldValue('name', topic.name);
        setFieldValue('categoryId', topic.categoryId);
        setFieldValue('status', topic.status);
        setFieldValue('total', topic.total);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopic();
  }, [id, setFieldValue]);
  return (
    <>
      <Page title="Sua de thi || CMS">
        <Container maxWidth="2xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Sua de thi
            </Typography>
            <Button variant="contained" component={RouterLink} to="/dashboard/topic">
              Danh sach de thi
            </Button>
          </Stack>
          <Stack>
            <FormikProvider value={formik}>
              <Form onSubmit={handleSubmit}>
                <Stack mb={3}>
                  <TextField
                    autoComplete="name"
                    fullWidth
                    label="Nhập tên đề thi"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Stack>
                <Stack mb={3}>
                  <TextField
                    type="number"
                    autoComplete="time"
                    fullWidth
                    label="Nhập thoi gian"
                    {...getFieldProps('time')}
                    error={Boolean(touched.time && errors.time)}
                    helperText={touched.time && errors.time}
                  />
                </Stack>
                <Stack mb={3}>
                  <TextField
                    autoComplete="total"
                    fullWidth
                    label="Nhập so cau"
                    {...getFieldProps('total')}
                    error={Boolean(touched.total && errors.total)}
                    helperText={touched.total && errors.total}
                  />
                </Stack>
                <Stack mb={3}>
                  <FormControl variant="outlined">
                    <InputLabel id="Category">Danh mục</InputLabel>
                    <Select
                      labelId="Category"
                      id="Category"
                      defaultValue=""
                      label="Danh mục"
                      {...getFieldProps('categoryId')}
                      error={Boolean(touched.categoryId && errors.categoryId)}
                    >
                      {categoryList.map((category, index) => (
                        <MenuItem key={index} value={category._id}>
                          {category.title}
                        </MenuItem>
                      ))}
                    </Select>
                    {Boolean(touched.categoryId && errors.categoryId) && (
                      <FormHelperText error={Boolean(touched.categoryId && errors.categoryId)}>
                        {touched.categoryId && errors.categoryId}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Stack>
                <Stack mb={5}>
                  <FormControl variant="outlined">
                    <InputLabel id="status">Trạng thái</InputLabel>
                    <Select
                      labelId="status"
                      id="status"
                      defaultValue=""
                      label="Trạng thái"
                      {...getFieldProps('status')}
                      error={Boolean(touched.status && errors.status)}
                    >
                      {STATUS_LIST.map((status, index) => (
                        <MenuItem value={status.value} key={index}>
                          {status.lable}
                        </MenuItem>
                      ))}
                    </Select>
                    {Boolean(touched.status && errors.status) && (
                      <FormHelperText error={Boolean(touched.status && errors.status)}>
                        {touched.status && errors.status}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Stack>

                <Button type="submit" size="large" variant="contained">
                  Save
                </Button>
              </Form>
            </FormikProvider>
          </Stack>
        </Container>
      </Page>
    </>
  );
};
