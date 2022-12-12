import {
  FC,
  ChangeEvent,
  useState,
} from 'react';

import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Divider,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'src/components/Link';

import type { Customer } from 'src/models/customer';
import { useTranslation } from 'react-i18next';
import Label from 'src/components/Label';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

interface ResultsProps {
  customers: Customer[];
}

const getUserRoleLabel = (customerRole: string): JSX.Element => {
  const map = {
    male: {
      text: 'male',
      color: 'info'
    },
    female: {
      text: 'female',
      color: 'error'
    }
  };

  const { text, color }: any = map[customerRole];

  return <Label color={color}>{text}</Label>;
};

const Results: FC<ResultsProps> = ({ customers }) => {

  const applyFilters = (
    customers: Customer[],
    query: string,
  ): Customer[] => {
    return customers.filter((customer) => {
      let matches = true;
  
      if (query) {
        const properties = ['c_id', 'c_name'];
        let containsQuery = false;
  
        properties.forEach((property) => {
          if (customer[property].includes(query)) {
            containsQuery = true;
          }
        });
  
        if (!containsQuery) {
          matches = false;
        }
      }
  
      return matches;
    });
  };
  
  const applyPagination = (
    customers: Customer[],
    page: number,
    limit: number
  ): Customer[] => {
    return customers.slice(page * limit, page * limit + limit);
  };
  const [selectedItems, setSelectedUsers] = useState<string[]>([]);
  const { t }: { t: any } = useTranslation();

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [query, setQuery] = useState<string>('');

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSelectAllUsers = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedUsers(event.target.checked ? customers.map((customer) => customer.c_id) : []);
  };

  const handleSelectOneUser = (
    _event: ChangeEvent<HTMLInputElement>,
    customerId: string
  ): void => {
    if (!selectedItems.includes(customerId)) {
      setSelectedUsers((prevSelected) => [...prevSelected, customerId]);
    } else {
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((id) => id !== customerId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredUsers = applyFilters(customers, query);
  const paginatedUsers = applyPagination(filteredUsers, page, limit);
  const selectedBulkActions = selectedItems.length > 0;
  const selectedSomeUsers =
    selectedItems.length > 0 && selectedItems.length < customers.length;
  const selectedAllUsers = selectedItems.length === customers.length;

  return (
    <>
      {(
        <Card>
          <Box p={2}>
            {!selectedBulkActions && (
              <TextField
                sx={{
                  m: 0
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchTwoToneIcon />
                    </InputAdornment>
                  )
                }}
                onChange={handleQueryChange}
                placeholder={t('Search by id or customername...')}
                value={query}
                size="small"
                fullWidth
                margin="normal"
                variant="outlined"
              />
            )}
          </Box>

          <Divider />

          {paginatedUsers.length === 0 ? (
            <>
              <Typography
                sx={{
                  py: 10
                }}
                variant="h3"
                fontWeight="normal"
                color="text.secondary"
                align="center"
              >
                {t("We couldn't find any customers matching your search criteria")}
              </Typography>
            </>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedAllUsers}
                          indeterminate={selectedSomeUsers}
                          onChange={handleSelectAllUsers}
                        />
                      </TableCell>
                      <TableCell>{t('customer id')}</TableCell>
                      <TableCell>{t('Name')}</TableCell>
                      <TableCell align="center">{t('Number of Orders')}</TableCell>
                      <TableCell>{t('Role')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedUsers.map((customer) => {
                      const isUserSelected = selectedItems.includes(customer.c_id);
                      return (
                        <TableRow hover key={customer.c_id} selected={isUserSelected}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isUserSelected}
                              onChange={(event) =>
                                handleSelectOneUser(event, customer.c_id)
                              }
                              value={isUserSelected}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="h5">
                              {customer.c_id}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Avatar
                                sx={{
                                  mr: 1
                                }}
                                src={customer.c_name}
                              />
                              <Box>
                                <Link
                                  variant="h5"
                                  href="#"
                                >
                                  {customer.c_name}
                                </Link>
                                <Typography noWrap variant="subtitle2">
                                  {customer.count}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Typography fontWeight="bold">
                              {customer.count}
                            </Typography>
                          </TableCell>
                          <TableCell>{getUserRoleLabel(customer.c_sex === 1 ? "male" : "female")}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box p={2}>
                <TablePagination
                  component="div"
                  count={filteredUsers.length}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleLimitChange}
                  page={page}
                  rowsPerPage={limit}
                  rowsPerPageOptions={[5, 10, 15]}
                />
              </Box>
            </>
          )}
        </Card>
      )}
    </>
  );
};

Results.propTypes = {
  customers: PropTypes.array.isRequired
};

Results.defaultProps = {
  customers: []
};

export default Results;
