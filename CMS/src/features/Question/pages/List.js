import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import {
  Autocomplete,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@material-ui/core';
import { Box } from '@material-ui/system';
import questionApi from 'apis/questionApi';
import topicApi from 'apis/topicApi';
import { sentenceCase } from 'change-case';
import { ListToolbar, MoreMenu, TableHeadList } from 'components/common';
import Label from 'components/Label';
import Page from 'components/Page';
import Scrollbar from 'components/Scrollbar';
import { STATUS_LIST } from 'constants/index';
import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'topic', label: 'Topic', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];
export const ListQuestion = () => {
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [idDelete, setIdDelete] = useState('');
  const [selected, setSelected] = useState([]);
  const [count, setCount] = useState(20);
  const [loading, setLoading] = useState(false);
  const [loadingTopic, setLoadingTopic] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [filters, setFilters] = useState({
    order: 'asc',
    orderBy: 'title',
    page: 0,
    limit: 20,
    title_like: '',
    topic: '',
    status: ''
  });
  const fetchListQuestion = useCallback(async (filters) => {
    try {
      setLoading(true);
      const res = await questionApi.getList({ ...filters, page: filters.page + 1 });
      const { pagination, questionList } = res.data;
      console.log({ pagination, questionList });
      setQuestionList(questionList);
      setCount(pagination._total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setQuestionList([]);
    }
  }, []);
  const fetchTopicList = async (filters) => {
    try {
      setLoadingTopic(true);
      const res = await topicApi.getList(filters);
      const { topic } = res.data;
      setLoadingTopic(false);
      setTopicList(topic);
    } catch (error) {
      setLoadingTopic(false);
      toast.error(error.response.data.error);
    }
  };
  useEffect(() => {
    fetchListQuestion(filters);
  }, [filters, fetchListQuestion]);
  useEffect(() => {
    if (!openSelect) {
      setTopicList([]);
    }
  }, [openSelect]);
  // Function Table
  const handleRequestSort = (event, property) => {
    const isAsc = filters.orderBy === property && filters.order === 'asc';
    setFilters((prev) => ({
      ...prev,
      order: isAsc ? 'desc' : 'asc',
      orderBy: property
    }));
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = questionList.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const handleChangePage = (event, newPage) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage
    }));
  };
  const handleChangeRowsPerPage = (event) => {
    setFilters((prev) => ({
      ...prev,
      limit: parseInt(event.target.value, 10),
      page: 0
    }));
  };

  // Handle Question
  const handleDelete = (categoryId) => {
    setOpen(true);
    if (typeof categoryId === 'string') {
      setIdDelete([].concat(categoryId));
      return;
    }
    setIdDelete(categoryId);
  };
  const onDeleteQuestion = async () => {
    try {
      await questionApi.delete(idDelete);
      toast.success('Xóa câu hỏi thành công');
      fetchListQuestion(filters);
      setOpen(false);
      setSelected([]);
      setFilters((prev) => ({
        ...prev,
        page: 0
      }));
    } catch (error) {
      toast.error(error.respose.data.error);
      setOpen(false);
    }
  };
  const handleFilterByName = (search) => {
    setFilters((prev) => ({
      ...prev,
      title_like: search,
      page: 0
    }));
  };
  // Handle Topic
  const handleChangSearchTopic = (search) => {
    fetchTopicList({ limit: 1000, title_like: search });
  };
  return (
    <>
      <Page title="Câu hỏi | CMS">
        <Container maxWidth="2xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Danh sách câu hỏi
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/question/create"
              startIcon={<Icon icon={plusFill} />}
            >
              Tạo câu hỏi
            </Button>
          </Stack>
          <Card>
            <ListToolbar
              numSelected={selected.length}
              onFilterName={handleFilterByName}
              handleDelete={() => handleDelete(selected)}
            />
            <Grid container padding={1} pb={4} spacing={1}>
              <Grid item xs={3}>
                <Autocomplete
                  fullWidth
                  open={openSelect}
                  onOpen={() => setOpenSelect(true)}
                  onClose={() => setOpenSelect(false)}
                  id="topic"
                  options={topicList}
                  getOptionLabel={(option) => option.name}
                  getOptionSelected={(option, value) => option.name === value.name}
                  onInputChange={(event) => handleChangSearchTopic(event.target.value)}
                  onChange={(event, value) =>
                    setFilters((prev) => ({
                      ...prev,
                      topic: value?._id || ''
                    }))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Đề thi"
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loadingTopic ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        )
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={2}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="status">Trạng thái</InputLabel>
                  <Select
                    defaultValue=""
                    labelId="status"
                    id="status"
                    label="Trạng thái"
                    onChange={(event) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: event.target.value
                      }))
                    }
                  >
                    <MenuItem value="">
                      <em>Tất cả</em>
                    </MenuItem>
                    {STATUS_LIST.map((status, index) => (
                      <MenuItem value={status.value} key={index}>
                        {status.lable}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {loading ? (
              <Stack mb={2} display="flex" alignItems="center">
                <CircularProgress color="primary" />
              </Stack>
            ) : (
              <>
                <Scrollbar>
                  <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                      <TableHeadList
                        headLabel={TABLE_HEAD}
                        order={filters.order}
                        orderBy={filters.orderBy}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                        rowCount={questionList.length}
                      />
                      <TableBody>
                        {questionList.map((row) => {
                          const { _id, title, topic, status } = row;
                          const isItemSelected = selected.indexOf(_id) !== -1;
                          const isStatus = status === 'ACTIVE' ? 'success' : 'banned';
                          return (
                            <TableRow
                              hover
                              key={_id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isItemSelected}
                                  onChange={(event) => handleClick(event, _id)}
                                />
                              </TableCell>
                              <TableCell align="left">{title}</TableCell>
                              <TableCell align="left">{_id}</TableCell>
                              <TableCell align="left">{topic}</TableCell>
                              <TableCell align="left">
                                <Label
                                  variant="ghost"
                                  color={(isStatus === 'banned' && 'error') || 'success'}
                                >
                                  {sentenceCase(status)}
                                </Label>
                              </TableCell>
                              <TableCell align="left">
                                <MoreMenu
                                  handleDelete={() => handleDelete(_id)}
                                  handleEdit={() => history.push('/dashboard/topic')}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Scrollbar>
                {questionList.length <= 0 && (
                  <Box textAlign="center" mt={5}>
                    {' '}
                    <Typography>Hiện tại chưa có câu hỏi nào</Typography>
                  </Box>
                )}
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15, 20, 25]}
                  component="div"
                  count={count}
                  rowsPerPage={filters.limit}
                  page={filters.page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}
          </Card>
        </Container>
      </Page>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xóa Danh Mục</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chăc chắn muốn xóa danh mục này không ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={() => onDeleteQuestion()} color="primary" autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
