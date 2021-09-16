import {
  Box,
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
  Typography
} from '@material-ui/core';
import topicApi from 'apis/topicApi';
import { sentenceCase } from 'change-case';
import { ListToolbar, MoreMenu, TableHeadList } from 'components/common';
import Label from 'components/Label';
import Page from 'components/Page';
import Scrollbar from 'components/Scrollbar';
import { STATUS_LIST } from 'constants/index';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'categoryId', label: 'categoryId', alignRight: false },
  { id: 'total', label: 'Total', alignRight: false },
  { id: 'time', label: 'Time', alignRight: false },
  { id: 'view', label: 'View', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false }
];

export const ListTopic = () => {
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(10);
  const [topicList, setTopicList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [idDelete, setIdDelete] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    page: 0,
    limit: 20,
    order: 'asc',
    orderBy: 'name',
    name_like: '',
    status: ''
  });
  const fetchTopicList = useCallback(async (filters) => {
    try {
      setLoading(true);

      const res = await topicApi.getList({ ...filters, page: filters.page + 1 });
      const { topic, pagination } = res.data;

      setTopicList(topic);
      setCount(pagination._total);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.error);
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchTopicList(filters);
  }, [fetchTopicList, filters]);

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
      const newSelecteds = topicList.map((n) => n._id);
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

  const handleFilterByName = (search) => {
    setFilters((prev) => ({
      ...prev,
      name_like: search
    }));
  };
  const handleDelete = (categoryId) => {
    setOpen(true);
    if (typeof categoryId === 'string') {
      setIdDelete([].concat(categoryId));
      return;
    }
    setIdDelete(categoryId);
  };
  const onDeleteCategory = async () => {
    try {
      await topicApi.delete(idDelete);
      fetchTopicList(filters);
      setSelected([]);
      toast.success('Xóa đề thi thành công ');
    } catch (error) {
      toast.error(error.response.data.error);
    }
    setOpen(false);
  };
  return (
    <div>
      <Page title="Đề thi | CMS">
        <Container maxWidth="2xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Đề thi
            </Typography>
            <Button variant="contained" component={RouterLink} to="/dashboard/topic/create">
              Tạo đề thi
            </Button>
          </Stack>
          <Card>
            <ListToolbar
              numSelected={selected.length}
              onFilterName={handleFilterByName}
              handleDelete={() => handleDelete(selected)}
            />
            <Grid container padding={1} pb={4} spacing={1}>
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
                  <TableContainer>
                    <Table>
                      <TableHeadList
                        headLabel={TABLE_HEAD}
                        order={filters.order}
                        orderBy={filters.orderBy}
                        rowCount={topicList.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                      />
                      <TableBody>
                        {topicList.map((row) => {
                          const { _id, name, total, status, time, categoryId, views } = row;
                          const isStatus = status === 'ACTIVE' ? 'success' : 'banned';
                          const isItemSelected = selected.indexOf(_id) !== -1;
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
                              <TableCell align="left">{name}</TableCell>
                              <TableCell align="left">{_id}</TableCell>
                              <TableCell align="left">{categoryId}</TableCell>
                              <TableCell align="left">{total}</TableCell>
                              <TableCell align="left">{time}</TableCell>
                              <TableCell align="left">{views}</TableCell>
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
                                  handleEdit={() => history.push(`/dashboard/topic/edit/${_id}`)}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Scrollbar>
                {topicList.length <= 0 && (
                  <Box textAlign="center" mt={5}>
                    {' '}
                    <Typography>Hiện tại chưa có đề thi nào</Typography>
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
          <Button onClick={() => onDeleteCategory()} color="primary" autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
