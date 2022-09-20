import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { checkUserIsAdmin } from './../Utils';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
});

const useAdminAuth2 = props => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();

  useEffect(() => {
    if (!checkUserIsAdmin(currentUser)) {
      history.push('/tab1');
    }

  }, [currentUser]);

  return currentUser;
}

export default useAdminAuth2;