import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
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
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  InputLabel,
  TextField,
  Autocomplete
} from '@material-ui/core';
import categoryApi from 'apis/categoryApi';
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
  { id: 'slug', label: 'Slug', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

export const ListSubCategory = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [count, setCount] = useState(20);
  const [open, setOpen] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [idDelete, setIdDelete] = useState([]);
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [filters, setFilters] = useState({
    order: 'asc',
    orderBy: 'title',
    page: 0,
    limit: 20,
    title_like: '',
    status: ''
  });

  const fetchSubCategoryList = useCallback(async (filters) => {
    try {
      setLoading(true);
      const res = await categoryApi.getSubList({ ...filters, page: filters.page + 1 });
      const { category, pagination } = res.data;
      setCategoryList(category);
      setCount(pagination._total);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setCategoryList([]);
    }
  }, []);
  const fetchCategoryList = async (filters) => {
    try {
      setLoadingCategory(true);
      const res = await categoryApi.getList(filters);
      const { categoryList } = res.data;
      setList(categoryList);
      setLoadingCategory(false);
    } catch (error) {
      setLoadingCategory(false);
    }
  };
  useEffect(() => {
    fetchSubCategoryList(filters);
  }, [fetchSubCategoryList, filters]);

  useEffect(() => {
    if (!openSelect) {
      setList([]);
    }
  }, [openSelect]);
  // Function Table
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = categoryList.map((category) => category._id);
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
  const onRequestSort = (event, property) => {
    const isAsc = property === filters.orderBy && filters.order === 'asc';
    setFilters((prev) => ({
      ...prev,
      order: isAsc ? 'desc' : 'asc',
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

  // Handle Sub Category
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
      fetchSubCategoryList(filters);
      toast.success('Xóa danh mục con thành công');
    } catch (error) {
      toast(error.response.data.error);
    }
    setOpen(false);
    setSelected([]);
  };
  const handleFilterByName = (search) => {
    setFilters((prev) => ({
      ...prev,
      title_like: search
    }));
  };

  // Handle Sub Category
  const handleChangSearchTopic = (search) => {
    fetchCategoryList({ limit: 1000, title_like: search });
  };
  return (
    <>
      <Page title="Danh mục con | CMS">
        <Container maxWidth="2xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Danh mục con
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/category/create"
              startIcon={<Icon icon={plusFill} />}
            >
              Tạo danh mục con
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
                  // defaultValue=""
                  fullWidth
                  open={openSelect}
                  onOpen={() => setOpenSelect(true)}
                  onClose={() => setOpenSelect(false)}
                  id="category"
                  options={list}
                  getOptionLabel={(option) => option.title}
                  getOptionSelected={(option, value) => option.title === value.title}
                  onInputChange={(event) => handleChangSearchTopic(event.target.value)}
                  onChange={(event, value) =>
                    setFilters((prev) => ({
                      ...prev,
                      parentId: value?._id || ''
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
                            {loadingCategory ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
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
              <Scrollbar>
                <TableContainer>
                  <Table>
                    <TableHeadList
                      headLabel={TABLE_HEAD}
                      order={filters.order}
                      orderBy={filters.orderBy}
                      numSelected={selected.length}
                      rowCount={categoryList.length}
                      onRequestSort={onRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {categoryList.map((row) => {
                        const { _id, title, slug, status } = row;
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
                              ></Checkbox>
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
            )}
            {categoryList.length <= 0 && !loading && (
              <Box textAlign="center" mt={5}>
                {' '}
                <Typography>Hiện tại chưa có danh mục con nào</Typography>
              </Box>
            )}
            <TablePagination
              component="div"
              count={count}
              page={filters.page}
              rowsPerPage={filters.limit}
              rowsPerPageOptions={[5, 10, 15, 20, 25]}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
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
