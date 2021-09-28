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
  Typography,
} from "@material-ui/core";
import categoryApi from "apis/categoryApi";
import topicApi from "apis/topicApi";
import Page from "components/Page";
import { STATUS_LIST } from "constants/index";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

export const CreateTopic = () => {
  const [categroyList, setCategoryList] = useState([]);

  const TopicSchema = Yup.object().shape({
    name: Yup.string()
      .required("Vui lòng nhập tên đề thi")
      .min(4, "Tên đề thi chứa ít nhất 4 kí tư"),
    description: Yup.string()
      .required("Vui lòng nhập miêu tả đề thi")
      .min(4, "Miêu tả đề thi chứa ít nhất 4 kí tư"),
    time: Yup.number().required("Vui lòng nhập thời gian làm bài"),
    questionCount: Yup.number().required(
      "Vui lòng nhập tổng số câu của bài thi"
    ),
    categoryId: Yup.string().required("Vui lòng chọn danh mục"),
    status: Yup.string().required("Vui lòng chọn trạng thái đề thi"),
    image: Yup.string().required("Vui lòng chọn trạng thái đề thi"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      time: 0,
      categoryId: "",
      questionCount: 0,
      status: "",
      description: "",
      image: "",
    },
    validationSchema: TopicSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        await topicApi.create(values);
        toast.success("Tạo đề thi thành công");
      } catch (error) {
        toast.error(error.response.data.error);
      }
    },
  });

  const { handleSubmit, touched, errors, values, getFieldProps } = formik;

  useEffect(() => {
    const fetchListCategory = async () => {
      try {
        const res = await categoryApi.getList();
        setCategoryList(res.data.categories);
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };
    fetchListCategory();
  }, []);

  return (
    <>
      <Page title="Tạo đề thi | CMS">
        <Container maxWidth="2xl">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4" gutterBottom>
              Tạo đề thi
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/topic"
            >
              Danh sách đề thi
            </Button>
          </Stack>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <Stack mb={3}>
                <TextField
                  autoComplete="name"
                  fullWidth
                  label="Nhập tên đề thi"
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Stack>
              <Stack mb={3}>
                <TextField
                  autoComplete="description"
                  fullWidth
                  label="Nhập miêu tả đề thi"
                  {...getFieldProps("description")}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Stack>
              <Stack mb={3}>
                <TextField
                  autoComplete="image"
                  fullWidth
                  label="Nhập đường dẫn ảnh"
                  {...getFieldProps("image")}
                  error={Boolean(touched.image && errors.image)}
                  helperText={touched.image && errors.image}
                />
              </Stack>
              <Stack mb={3}>
                <TextField
                  fullWidth
                  label="Nhập thời gian"
                  type="number"
                  {...getFieldProps("time")}
                  error={Boolean(touched.time && errors.time)}
                  helperText={touched.time && errors.time}
                />
              </Stack>
              <Stack mb={3}>
                <TextField
                  fullWidth
                  label="Nhập tổng số câu"
                  type="number"
                  {...getFieldProps("questionCount")}
                  error={Boolean(touched.questionCount && errors.questionCount)}
                  helperText={touched.questionCount && errors.questionCount}
                />
              </Stack>
              <Stack mb={3}>
                <FormControl variant="outlined">
                  <InputLabel id="Category">Danh mục</InputLabel>
                  <Select
                    labelId="Category"
                    id="Category"
                    defaultValue={values.categoryId}
                    label="Danh mục"
                    {...getFieldProps("categoryId")}
                    error={Boolean(touched.categoryId && errors.categoryId)}
                  >
                    {categroyList.map((category, index) => (
                      <MenuItem key={index} value={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {Boolean(touched.categoryId && errors.categoryId) && (
                    <FormHelperText
                      error={Boolean(touched.categoryId && errors.categoryId)}
                    >
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
                    defaultValue={values.status}
                    label="Trạng thái"
                    {...getFieldProps("status")}
                    error={Boolean(touched.status && errors.status)}
                  >
                    {STATUS_LIST.map((status, index) => (
                      <MenuItem value={status.value} key={index}>
                        {status.lable}
                      </MenuItem>
                    ))}
                  </Select>
                  {Boolean(touched.status && errors.status) && (
                    <FormHelperText
                      error={Boolean(touched.status && errors.status)}
                    >
                      {touched.status && errors.status}
                    </FormHelperText>
                  )}
                </FormControl>
              </Stack>
              <Button type="submit" variant="contained" size="large">
                Tạo đề thi
              </Button>
            </Form>
          </FormikProvider>
        </Container>
      </Page>
    </>
  );
};
