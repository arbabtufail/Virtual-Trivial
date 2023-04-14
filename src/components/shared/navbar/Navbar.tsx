import styles from "./Navbar.module.scss";

const Navbar = () => {
  const NavbarLogo = () => {
    return (
      <div className={styles["navbar-logo"]}>
        <img src="login/Experios.png" alt="Logo Virtual Trivial" />
      </div>
    );
  };

  const NavbarButtons = () => {};

  return <div className={styles.navbar}>{NavbarLogo()}</div>;
};
export default Navbar;
