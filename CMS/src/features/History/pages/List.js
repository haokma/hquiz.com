import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import {
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  DialogTitle
} from '@material-ui/core';
import historyApi from 'apis/historyApi';
import { ListToolbar, MoreMenu, TableHeadList } from 'components/common';
import Page from 'components/Page';
import Scrollbar from 'components/Scrollbar';
import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const TABLE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'user', label: 'User', alignRight: false },
  { id: 'topic', label: 'Topic', alignRight: false },
  { id: 'score', label: 'Score', alignRight: false },
  { id: '' }
];

export const ListHisroty = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(20);
  const [idDeleted, setIdDeleted] = useState([]);
  const [selected, setSelected] = useState([]);
  const [historyList, setHistoryList] = useState([]);
  const [filters, setFilters] = useState({
    order: 'asc',
    orderBy: 'title',
    limit: 20,
    page: 0
  });

  const fetchHistoryList = useCallback(async (filters) => {
    try {
      setLoading(true);
      const res = await historyApi.getList({ ...filters, page: filters.page + 1 });
      const { history, pagination } = res.data;
      setHistoryList(history);
      setCount(pagination._total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.response.data.error);
    }
  }, []);

  useEffect(() => {
    fetchHistoryList(filters);
  }, [fetchHistoryList, filters]);

  // Function Table
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelects = historyList.map((history) => history._id);
      setSelected(newSelects);
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
  const handleRequestSort = (event, property) => {
    const isAsc = property === filters.orderBy && filters.order === 'asc';
    setFilters((prev) => ({
      ...prev,
      order: isAsc ? 'dsec' : 'asc',
      orderBy: property
    }));
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

  // Handle History
  const handleDelete = (id) => {
    setOpen(true);
    setIdDeleted(idDeleted.concat(id));
  };
  const onDeleteCategory = async () => {
    try {
      await historyApi.delete(idDeleted);
      fetchHistoryList(filters);
      setSelected([]);
      toast.success('Xóa lịch sử thành công');
    } catch (error) {
      toast.error(error.response.data.error);
    }
    setOpen(false);
  };
  const handleFilterByName = () => {};
  return (
    <>
      <Page>
        <Container maxWidth="2xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Lịch sử
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/category/create"
              startIcon={<Icon icon={plusFill} />}
            >
              Tạo lịch sử
            </Button>
          </Stack>
          <Card>
            <ListToolbar
              numSelected={selected.length}
              handleDelete={() => handleDelete(selected)}
              onFilterName={handleFilterByName}
            />
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
                        numSelected={selected.length}
                        rowCount={historyList.length}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                      />
                      <TableBody>
                        {historyList.map((row) => {
                          const { user, topic, score, _id } = row;
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
                                ></Checkbox>
                              </TableCell>
                              <TableCell align="left">{_id}</TableCell>
                              <TableCell align="left">{user}</TableCell>
                              <TableCell align="left">{topic}</TableCell>
                              <TableCell align="left">{score}</TableCell>
                              <TableCell align="left">
                                <MoreMenu
                                  handleDelete={() => handleDelete(_id)}
                                  handleEdit={() => history.push('/')}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Scrollbar>
                <TablePagination
                  count={count}
                  page={filters.page}
                  rowsPerPage={filters.limit}
                  rowsPerPageOptions={[5, 10, 15, 20]}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  component="div"
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
    </>
  );
};
