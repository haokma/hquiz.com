import searchFill from '@iconify/icons-eva/search-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
import { Icon } from '@iconify/react';
import {
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Toolbar,
  Tooltip,
  Typography
} from '@material-ui/core';
// material
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

export function ListToolbar({ numSelected, onFilterName, handleDelete }) {
  const [search, setSearch] = useState('');
  const timeRef = useRef();

  const handleSearch = (event) => {
    setSearch(event.target.value);

    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    timeRef.current = setTimeout(() => {
      onFilterName(event.target.value);
    }, 300);
  };
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter'
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={search}
          onChange={handleSearch}
          placeholder="Search user..."
          type="text"
          startAdornment={
            <InputAdornment position="start">
              <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete" onClick={() => handleDelete()}>
          <IconButton>
            <Icon icon={trash2Fill} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Icon icon={roundFilterList} />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  );
}

ListToolbar.propTypes = {
  numSelected: PropTypes.number,
  onFilterName: PropTypes.func,
  handleDelete: PropTypes.func
};
