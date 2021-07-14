import { useRouter } from "next/router";
import { getUrl } from './AuthUrl.js'

const ManualLogin = () => {
  const router = useRouter();

  return (
    <button onClick={ () => { router.push(getUrl('true')) } }>
      login
    </button>
  );
}

export default ManualLogin;