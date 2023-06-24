import styles from "../styles/GridHeader.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const GridHeader = ({ queryParams, setQueryParams, lists, preferences }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const sendSearchQuery = () => {
    setQueryParams((prev) => ({
      ...prev,
      description: searchQuery,
      page: 0,
    }));
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
            <Button onClick={() => sendSearchQuery()} className="greyButton">
              Search
            </Button>
          </div>
        </div>
        <div className={styles.cell}>
          <div className={styles.cellText}>Base:</div>
          <Select
            size="small"
            key={queryParams.base} // To force re-rendering!!!
            defaultValue={queryParams.base}
            onChange={(e) => {
              setQueryParams((prev) => ({
                ...prev,
                base: e.target.value,
                page: 0,
              }));
            }}
          >
            {lists.base.map((el) => (
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
            key={queryParams.key}
            defaultValue={queryParams.key}
            onChange={(e) => {
              setQueryParams((prev) => ({
                ...prev,
                key: e.target.value,
                page: 0,
              }));
            }}
          >
            {lists.key.map((el) => (
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
            key={queryParams.sort}
            defaultValue={queryParams.sort}
            onChange={(e) => {
              setQueryParams((prev) => ({
                ...prev,
                sort: e.target.value,
                page: 0,
              }));
            }}
          >
            {lists.sort.map((el) => (
              <MenuItem value={el} key={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className={styles.cell}>
          <Button
            onClick={() => setQueryParams(preferences)}
            className="greyButton"
          >
            Reset table
          </Button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default GridHeader;
