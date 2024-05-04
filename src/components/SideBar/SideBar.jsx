import styles from "./SideBar.module.css";
import companyIcon from "../../assets/logo.png";

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_content}>
        <img
          src={companyIcon}
          className={styles.companyIcon}
          alt="company-icon"
        ></img>
      </div>
    </div>
  );
};

export default SideBar;
