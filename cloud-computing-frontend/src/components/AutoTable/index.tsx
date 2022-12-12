import {
    FC,
    ChangeEvent,
    useState,
  } from 'react';
  
  import PropTypes from 'prop-types';
  import {
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
  import { useTranslation } from 'react-i18next';
  import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
  
  interface ResultsProps {
    dataframe: any[],
    keyName: string,
    selectableProps: string[],
    keyMapper: any,
  }
  
  const Results: FC<ResultsProps> = ({ dataframe, keyName, selectableProps, keyMapper }) => {
  
    const applyFilters = (
      dataframe: any[],
      query: string,
    ): any[] => {
      return dataframe.filter((data) => {
        let matches = true;
    
        if (query) {
          const properties = selectableProps;
          let containsQuery = false;
    
          properties.forEach((property) => {
            if (data[property].includes(query)) {
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
      dataframe: any[],
      page: number,
      limit: number
    ): any[] => {
      return dataframe.slice(page * limit, page * limit + limit);
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
      setSelectedUsers(event.target.checked ? dataframe.map((data) => data[keyName]) : []);
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
  
    const filteredUsers = applyFilters(dataframe, query);
    const paginatedUsers = applyPagination(filteredUsers, page, limit);
    const selectedBulkActions = selectedItems.length > 0;
    const selectedSomeUsers =
      selectedItems.length > 0 && selectedItems.length < dataframe.length;
    const selectedAllUsers = selectedItems.length === dataframe.length;
  
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
                  placeholder={t(`Search by ${selectableProps.map((p) => keyMapper[p])}`)}
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
                        {Object.keys(dataframe[0]).map((key) => {
                            return <TableCell>{t(keyMapper[key])}</TableCell>
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedUsers.map((data) => {
                        const isDataSelected = selectedItems.includes(data[keyName]);
                        return (
                          <TableRow hover key={data[keyName]} selected={isDataSelected}>
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isDataSelected}
                                onChange={(event) =>
                                  handleSelectOneUser(event, data[keyName])
                                }
                                value={isDataSelected}
                              />
                            </TableCell>
                            {Object.keys(data).map((key) => {
                                return (
                                    <TableCell>
                              <Typography fontWeight="bold">
                                {data[key]}
                              </Typography>
                            </TableCell>
                                )
                            })}
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
    dataframe: PropTypes.array.isRequired
  };
  
  Results.defaultProps = {
    dataframe: []
  };
  
  export default Results;
  