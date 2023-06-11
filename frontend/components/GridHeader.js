import styles from "../styles/GridHeader.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import { useState } from "react";

const GridHeader = ({
  queryParams,
  setQueryParams,
  baseList,
  nutrientList,
  sortList,
}) => {
  const [searchQuery, setSearchQuery] = useState();
  return (
    <div className={styles.gridHeader}>
      <div className={styles.grid}>
        <div className={styles.searchCell}>
          {/* <div className={styles.cellText}>Search:</div> */}
          <div className={styles.searchRow}>
            <TextField
              label="Search product..."
              size="small"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <Button
              variant="contained"
              disableElevation
              sx={{ backgroundColor: "rgb(170, 170, 170)" }}
              onClick={() => {
                setQueryParams([
                  searchQuery,
                  queryParams[1],
                  queryParams[2],
                  queryParams[3],
                ]);
              }}
            >
              Search
            </Button>
          </div>
        </div>
        <div className={styles.selectCell}>
          <div className={styles.cellText}>Base:</div>
          <Select
            size="small"
            defaultValue={queryParams[1]}
            onChange={(e) => {
              setQueryParams([
                queryParams[0],
                e.target.value,
                queryParams[2],
                queryParams[3],
              ]);
            }}
          >
            {baseList.map((el) => (
              <MenuItem value={el} key={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className={styles.selectCell}>
          <div className={styles.cellText}>Key:</div>
          <Select
            size="small"
            defaultValue={queryParams[2]}
            onChange={(e) => {
              setQueryParams([
                queryParams[0],
                queryParams[1],
                e.target.value,
                queryParams[3],
              ]);
            }}
          >
            {nutrientList.map((el) => (
              <MenuItem value={el} key={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className={styles.selectCell}>
          <div className={styles.cellText}>Sort:</div>
          <Select
            size="small"
            defaultValue={queryParams[3]}
            onChange={(e) => {
              setQueryParams([
                queryParams[0],
                queryParams[1],
                queryParams[2],
                e.target.value,
              ]);
            }}
          >
            {sortList.map((el) => (
              <MenuItem value={el} key={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default GridHeader;
