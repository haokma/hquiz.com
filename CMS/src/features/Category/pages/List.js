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
import { Box } from '@material-ui/system';
import categoryApi from 'apis/categoryApi';
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
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'slug', label: 'Slug', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

export const CategoryList = () => {
  const history = useHistory();

  const [count, setCount] = useState(10);
  const [selected, setSelected] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idDelete, setIdDelete] = useState('');
  const [filters, setFilters] = useState({
    page: 0,
    limit: 15,
    order: 'asc',
    orderBy: 'title',
    filterName: '',
    status: ''
  });

  const fetchCategoryList = useCallback(async (formValues) => {
    try {
      setLoading(true);
      const res = await categoryApi.getList({
        page: formValues.page + 1,
        limit: formValues.limit,
        order: formValues.order,
        orderBy: formValues.orderBy,
        title_like: formValues.filterName,
        status: formValues.status
      });
      const { _total } = res.data.pagination;
      const { categories } = res.data;
      setCategoryList(categories);
      setCount(_total);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.error);
      setCategoryList([]);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategoryList(filters);
  }, [filters, fetchCategoryList]);

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
      const newSelecteds = categoryList.map((n) => n._id);
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

  // Handle Category
  const handleFilterByName = (value) => {
    setFilters((prev) => ({
      ...prev,
      filterName: value
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
      await categoryApi.delete(idDelete);
      fetchCategoryList(filters);
      toast.success('Xóa danh mục thành công');
    } catch (error) {
      toast(error.response.data.error);
    }
    setOpen(false);
    setSelected([]);
  };

  return (
    <>
      <Page title="Danh mục | CMS">
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Danh mục
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/category/create"
              startIcon={<Icon icon={plusFill} />}
            >
              Tạo danh mục
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
                  <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                      <TableHeadList
                        headLabel={TABLE_HEAD}
                        order={filters.order}
                        orderBy={filters.orderBy}
                        rowCount={categoryList.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                      />
                      <TableBody>
                        {categoryList.map((row) => {
                          const { _id, title, slug, status } = row;
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
                              <TableCell align="left">{slug}</TableCell>
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
                                  setOpen={setOpen}
                                  handleEdit={() => history.push(`/dashboard/category/edit/${_id}`)}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Scrollbar>

                {categoryList.length <= 0 && (
                  <Box textAlign="center" mt={5}>
                    {' '}
                    <Typography>Hiện tại chưa có danh mục nào</Typography>
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
      {/* Modal Delete */}
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
