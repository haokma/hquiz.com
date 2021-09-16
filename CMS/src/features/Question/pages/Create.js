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
import questionApi from 'apis/questionApi';
import topicApi from 'apis/topicApi';
import Page from 'components/Page';
import { STATUS_LIST } from 'constants/index';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

export const CreateQuestion = () => {
  const [topicList, setTopicList] = useState([]);

  const QuestionSchema = Yup.object().shape({
    question: Yup.string().required('Vui lòng nhập câu hỏi'),
    answerA: Yup.string().required('Vui lòng nhập đáp án A'),
    answerB: Yup.string().required('Vui lòng nhập đáp án B'),
    answerC: Yup.string().required('Vui lòng nhập đáp án C'),
    answerD: Yup.string().required('Vui lòng nhập đáp án D'),
    topic: Yup.string().required('Vui lòng chọn đề thi'),
    status: Yup.string().required('Vui lòng chọn trạng thái câu hỏi ')
  });
  const formik = useFormik({
    initialValues: {
      question: '',
      answerA: '',
      answerB: '',
      answerC: '',
      answerD: '',
      topic: '',
      status: ''
    },
    validationSchema: QuestionSchema,
    onSubmit: async (values) => {
      const { question, answerA, answerB, answerC, answerD, topic, status } = values;
      const newQuestion = {
        title: question,
        answer: [{ title: answerA }, { title: answerB }, { title: answerC }, { title: answerD }],
        topic,
        status
      };
      try {
        await questionApi.create(newQuestion);
        toast.success('Tạo câu hỏi thành công');
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
  });
  const { handleSubmit, touched, errors, getFieldProps, values } = formik;

  useEffect(() => {
    const fetchTopicList = async () => {
      try {
        const res = await topicApi.getList();
        console.log(res.data.topic);
        setTopicList(res.data.topic);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopicList();
  }, []);
  return (
    <>
      <Page title="Tạo câu hỏi | CMS">
        <Container maxWidth="2xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Tạo câu hỏi
            </Typography>
            <Button variant="contained" component={RouterLink} to="/dashboard/question">
              Danh sách câu hỏi
            </Button>
          </Stack>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <Stack mb={3}>
                <TextField
                  fullWidth
                  autoComplete="question"
                  type="text"
                  label="Câu hỏi"
                  {...getFieldProps('question')}
                  error={Boolean(touched.question && errors.question)}
                  helperText={touched.question && errors.question}
                />
              </Stack>
              <Stack mb={3}>
                <TextField
                  fullWidth
                  autoComplete="answerA"
                  type="text"
                  label="Đáp án A"
                  {...getFieldProps('answerA')}
                  error={Boolean(touched.answerA && errors.answerA)}
                  helperText={touched.answerA && errors.answerA}
                />
              </Stack>
              <Stack mb={3}>
                <TextField
                  fullWidth
                  autoComplete="answerB"
                  type="text"
                  label="Đáp án B"
                  {...getFieldProps('answerB')}
                  error={Boolean(touched.answerB && errors.answerB)}
                  helperText={touched.answerB && errors.answerB}
                />
              </Stack>
              <Stack mb={3}>
                <TextField
                  fullWidth
                  autoComplete="answerC"
                  type="text"
                  label="Đáp án C"
                  {...getFieldProps('answerC')}
                  error={Boolean(touched.answerC && errors.answerC)}
                  helperText={touched.answerC && errors.answerC}
                />
              </Stack>
              <Stack mb={3}>
                <TextField
                  fullWidth
                  autoComplete="answerD"
                  type="text"
                  label="Đáp án D"
                  {...getFieldProps('answerD')}
                  error={Boolean(touched.answerD && errors.answerD)}
                  helperText={touched.answerD && errors.answerD}
                />
              </Stack>
              <Stack mb={3}>
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
              <Stack mb={3}>
                <FormControl variant="outlined">
                  <InputLabel id="topic">Đề thi</InputLabel>
                  <Select
                    labelId="topic"
                    id="topic"
                    defaultValue={values.topic}
                    label="Danh mục"
                    {...getFieldProps('topic')}
                    error={Boolean(touched.topic && errors.topic)}
                  >
                    {topicList.map((topic, index) => (
                      <MenuItem key={index} value={topic._id}>
                        {topic.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {Boolean(touched.topic && errors.topic) && (
                    <FormHelperText error={Boolean(touched.topic && errors.topic)}>
                      {touched.topic && errors.topic}
                    </FormHelperText>
                  )}
                </FormControl>
              </Stack>
              <Button variant="contained" size="large" type="submit">
                Tạo câu hỏi
              </Button>
            </Form>
          </FormikProvider>
        </Container>
      </Page>
    </>
  );
};
