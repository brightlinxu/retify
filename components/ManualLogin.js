import { useRouter } from "next/router";
import { getAuthUrl } from '../utilities/getAuthUrl.js';
import styles from '../styles/Index.module.css';

const ManualLogin = ( { displayStyle } ) => {
  const router = useRouter();

  return (
    <div onClick={ () => { router.push(getAuthUrl('true')) } } 
      className={styles.loginButton}
    >
      Login
    </div>
  );
}

export default ManualLogin;