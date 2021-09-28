import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import categoryApi from "apis/categoryApi";
import Page from "components/Page";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

export const CreateCategory = () => {
  const [categoryList, setCategoryList] = useState([]);

  const categorySchema = Yup.object().shape({
    name: Yup.string()
      .required("Vui lòng nhập tên dang mục")
      .min(4, "Tên danh mục chứa ít nhất 4 kí tư"),
    image: Yup.string().required("Vui lòng nhập đường dẫn ảnh"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      parentId: "",
      image: "",
    },
    validationSchema: categorySchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        await categoryApi.create(values);
        toast.success("Thêm danh mục thành công");
        resetForm();
      } catch (error) {
        toast.error(error.response.data.error);
      }
    },
  });
  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    resetForm,
    setFieldValue,
  } = formik;
  const fetchCategoryList = useCallback(async () => {
    try {
      const res = await categoryApi.getList({ limit: 100 });
      const { categories } = res.data;
      setCategoryList(categories);
    } catch (error) {
      toast.error(error.response.data.error);
      setCategoryList([]);
    }
  }, []);
  useEffect(() => {
    fetchCategoryList();
  }, [fetchCategoryList]);
  return (
    <Page title="Tạo danh mục | CMS">
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Tạo Danh Mục
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
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack mb={3}>
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
            <Stack mb={3}>
              <TextField
                fullWidth
                autoComplete="image"
                type="text"
                label="Nhập đường dẫn ảnh"
                {...getFieldProps("image")}
                error={Boolean(touched.image && errors.image)}
                helperText={touched.image && errors.image}
              />
            </Stack>
            <Stack mb={5}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="category">Danh mục cha</InputLabel>
                <Select
                  defaultValue=""
                  labelId="category"
                  id="category"
                  label="Danh mục cha"
                  disabled={true}
                  onChange={(event) =>
                    setFieldValue("parentId", event.target.value)
                  }
                >
                  <MenuItem value="">
                    <em>Trống</em>
                  </MenuItem>
                  {categoryList.map((category, index) => (
                    <MenuItem value={category._id} key={index}>
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              loading={false}
            >
              Tạo
            </LoadingButton>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
};
