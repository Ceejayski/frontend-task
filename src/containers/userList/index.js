import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserDetails } from '../../redux/actions/user.actions';
// import { Card } from 'react-bootstrap';
import MyCard from '../../components/myCard';
import MyDataTable from '../myDataTable';

function UserList({
  error, users, loading, getUsers,
}) {
  useEffect(() => {
    if (users.length < 2) {
      getUsers();
    }
  }, []);
  return (
    <div>

      <MyCard>
        <MyCard.Header style={{ backgroundColor: 'white' }}>
          <div className="d-flex justify-content-between">
            <div>User List</div>
            <div><Link to="/users/new" className="btn btn-primary btn-sm px-4">Add new</Link></div>
          </div>
        </MyCard.Header>
        <MyCard.Body>
          {loading && (
            <div className="d-flex justify-content-center w-100">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p className="mb-0 text-center">Loading...</p>
            </div>
          )}

          { !loading && error === '' && (
            <MyDataTable data={users} sortable={['name', 'id', 'username']} col={['id', 'name', 'username', 'email', 'city']} />
          ) }
          {error !== '' && (<><p className="mb-0 text-center">Something went wrong</p></>)}
        </MyCard.Body>
      </MyCard>
    </div>
  );
}

UserList.propTypes = {
  users: PropTypes.arrayOf(Object).isRequired,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { users, error, loading } = state;
  return {
    users,
    error,
    loading,
  };
};

const mapDispatchToProps = {
  getUsers: getUserDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
