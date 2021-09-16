import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Không tìm thấy sản phẩm
      </Typography>
      <Typography variant="body2" align="center">
        Không tìm thấy sảnh phẩm nào &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Hãy kiểm tra lai ?
      </Typography>
    </Paper>
  );
}
