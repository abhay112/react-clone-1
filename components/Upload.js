import React from "react";
import Button from "@mui/material/Button";
// import MovieIcon from "@mui/icons-material/Movie";
import LinearProgress from "@mui/material/LinearProgress";

const Upload = () => {
  return (
    <div>
      <Button
        className="upload-btn"
        variant="outlined"
        fullWidth
        component="label"
        // startIcon={MovieIcon}
        style={{ marginTop: "1rem" }}
      >
        <input
          type="file"
          accept="image/*"
          style={{ display: "none", marginRight: "1rem" }}
        />
        Upload
      </Button>
      <LinearProgress
        varient="determinate"
        value={50}
        style={{ marginTop: "0.2rem" }}
      />
    </div>
  );
};

export default Upload;
