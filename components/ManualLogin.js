import { useRouter } from "next/router";
import { getAuthUrl } from '../utilities/getAuthUrl.js'

const ManualLogin = ( { displayStyle } ) => {
  const router = useRouter();

  return (
    <div onClick={ () => { router.push(getAuthUrl('true')) } } 
      style={{display: `${displayStyle}`, 
              cursor: 'pointer', 
              fontSize: '20px',
              padding: '2px 20px', 
              border: '1px solid black',
              borderRadius: '20px'}}>
      Login
    </div>
  );
}

export default ManualLogin;