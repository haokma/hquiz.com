import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import authApi from 'apis/authApi';
import { sentenceCase } from 'change-case';
import { ListToolbar, MoreMenu, TableHeadList } from 'components/common';
import Label from 'components/Label';
// components
import Page from 'components/Page';
import Scrollbar from 'components/Scrollbar';
import SearchNotFound from 'components/SearchNotFound';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'avatar', label: 'Avatar', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export function User() {
  const history = useHistory();

  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [filters, setFilters] = useState({
    page: 0,
    order: 'asc',
    orderBy: 'name',
    name_like: '',
    limit: 10
  });

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        setLoading(true);
        const res = await authApi.getList(filters);
        const { user } = res.data;
        setUserList(user);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.error);
        setLoading(false);
      }
    };
    fetchUserList();
  }, [filters]);

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
      const newSelecteds = userList.map((n) => n.name);
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

  const emptyRows =
    filters.page > 0 ? Math.max(0, (1 + filters.page) * filters.limit - userList.length) : 0;

  const filteredUsers = applySortFilter(
    userList,
    getComparator(filters.order, filters.orderBy),
    filters.name_like
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Tài khoản | Minimal-UI">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tài khoản
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            Tạo tài khoản
          </Button>
        </Stack>

        <Card>
          <ListToolbar numSelected={selected.length} onFilterName={handleFilterByName} />
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
                      order={filters.order}
                      orderBy={filters.orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={userList.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {userList
                        .slice(
                          filters.page * filters.limit,
                          filters.page * filters.limit + filters.limit
                        )
                        .map((row) => {
                          const { _id, name, role, email, status } = row;
                          const isItemSelected = selected.indexOf(name) !== -1;
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
                                  onChange={(event) => handleClick(event, name)}
                                />
                              </TableCell>
                              <TableCell align="left">{name}</TableCell>
                              <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Avatar
                                    style={{
                                      width: '60px'
                                    }}
                                    alt={name}
                                    src="http://localhost:3000/static/illustrations/illustration_avatar.png"
                                  />
                                </Stack>
                              </TableCell>
                              <TableCell align="left">{role}</TableCell>
                              <TableCell align="left">{email}</TableCell>
                              <TableCell align="left">
                                <Label
                                  variant="ghost"
                                  color={(isStatus === 'banned' && 'error') || 'success'}
                                >
                                  {sentenceCase(status)}
                                </Label>
                              </TableCell>

                              <TableCell align="right">
                                <MoreMenu
                                  handleEdit={() => history.push(`/dashboard/user/edit/${_id}`)}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    {isUserNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={filters.name_like} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={userList.length}
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
  );
}
