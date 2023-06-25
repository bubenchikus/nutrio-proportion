const useStyles = {
  greyButton: {
    backgroundColor: "rgb(132, 132, 132)",
    color: "white",
    width: "150px",
    "&:hover": {
      backgroundColor: "rgb(14, 146, 16)",
    },
  },
  redButton: {
    backgroundColor: "rgb(132, 132, 132)",
    color: "white",
    width: "150px",
    "&:hover": {
      backgroundColor: "rgb(147, 14, 14)",
    },
  },
  rectangle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
};

export default useStyles;
