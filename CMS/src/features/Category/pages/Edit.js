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
import Page from "components/Page";
import { STATUS_LIST } from "constants/index";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

export const EditCategory = () => {
  const { id } = useParams();
  const history = useHistory();

  const categorySchema = Yup.object().shape({
    name: Yup.string()
      .required("Vui lòng nhập tên danh mục")
      .min(4, "Tên danh mục chứa ít nhất 4 kí tự"),
    status: Yup.string().required("Vui lòng chọn trạng thái danh mục"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      status: "",
    },
    validationSchema: categorySchema,
    onSubmit: async (values) => {
      try {
        await categoryApi.update(id, values);
        history.push("/dashboard/category");
        toast.success("Sửa danh mục thành công");
      } catch (error) {
        toast.error(error.response.data.error);
      }
    },
  });
  const {
    handleSubmit,
    getFieldProps,
    values,
    setFieldValue,
    touched,
    errors,
  } = formik;

  useEffect(() => {
    const fetchCategoryById = async () => {
      try {
        const res = await categoryApi.getById(id);
        const { category } = res.data;
        setFieldValue("name", category.name);
        setFieldValue("status", category.status);
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };
    fetchCategoryById();
  }, [setFieldValue, id]);

  return (
    <Page title="Sửa danh mục | CMS">
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Sửa danh mục
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/category"
          >
            Danh sách Category
          </Button>
        </Stack>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <Stack mb={2}>
              <TextField
                fullWidth
                autoComplete="name"
                type="text"
                label="Nhập tên danh mục"
                {...getFieldProps("name")}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
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
              Lưu
            </Button>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
};
