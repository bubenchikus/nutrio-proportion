import styles from "../styles/GridHeader.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const GridHeader = ({
  queryParams,
  setQueryParams,
  baseList,
  nutrientList,
  sortList,
  preferences,
  loggedIn,
}) => {
  const [searchQuery, setSearchQuery] = useState();

  const sendSearchQuery = () => {
    setQueryParams([
      searchQuery,
      queryParams[1],
      queryParams[2],
      queryParams[3],
    ]);
  };

  const resetTable = () => {
    if (loggedIn) {
      setQueryParams(["", preferences.base, preferences.key, preferences.sort]);
    } else {
      setQueryParams(["", baseList[1], nutrientList[2], sortList[1]]);
    }
  };

  return (
    <div className={styles.gridHeader}>
      <div className={styles.grid}>
        <div className={styles.cell}>
          <div className={styles.searchRow}>
            <TextField
              InputLabelProps={{ shrink: false }}
              autoComplete="off"
              label={searchQuery ? "" : "Search product..."}
              size="small"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendSearchQuery();
                }
              }}
            />
            <Button onClick={sendSearchQuery} className="greyButton">
              Search
            </Button>
          </div>
        </div>
        <div className={styles.cell}>
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
        <div className={styles.cell}>
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
        <div className={styles.cell}>
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
        <div className={styles.cell}>
          <Button onClick={resetTable} className="greyButton">
            Reset table
          </Button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default GridHeader;
