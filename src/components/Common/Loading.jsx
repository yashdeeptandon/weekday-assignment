import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.overlay}>
      <Box className={styles.loader}>
        <CircularProgress color="success" />
      </Box>
    </div>
  );
}
