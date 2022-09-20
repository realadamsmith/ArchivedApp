import { useAdminAuth2 } from './../customHooks';

const WithAdminAuth2 = props => useAdminAuth2(props) && props.children;

export default WithAdminAuth2; 
