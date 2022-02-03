/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { uid } from 'react-uid';
import useSortableData from '../sortTable';
import { deleteUser } from '../../redux/actions/user.actions';
import DeleteModal from '../../components/deleteModal';

function MyDataTable({
  data, sortable, col, delUser,
}) {
  const [show, setShow] = useState(false);
  const [deleteUser, setDeleteUser] = useState();
  const checkSortable = (term) => sortable.includes(term);
  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  const { items, requestSort, sortConfig } = useSortableData(data);
  const handleDelonClick = (user) => {
    delUser(user);
    setShow(false);
  };

  const delModal = (user) => {
    setDeleteUser(user);
    setShow(true);
  };

  const getOrder = (name) => {
    if (!sortConfig) {
      return undefined;
    }
    return (sortConfig.key === name ? sortConfig.direction : undefined);
  };
  return (

    <>
      {data.length < 1 ? (<h6>There are no users to show</h6>) : (
        <div className="table-responsive my-datatable text-center">
          <table className="table border">
            <thead>
              <tr className="table-light border-bottom border-light ">
                {col.map((prop) => (
                  <th className={`${checkSortable(prop) ? 'p-0' : undefined}`} key={prop}>
                    {checkSortable(prop) ? (
                      <button type="button" className="h-100 w-100 m-0 btn btn-light text-bold" onClick={() => requestSort(prop)}>

                        {capitalizeFirstLetter(prop)}
                        {getOrder(prop) !== undefined && (
                        <i className={`fas ms-1 text-success fa-angle-double-${getOrder(prop)}`} />
                        )}

                      </button>
                    ) : capitalizeFirstLetter(prop)}
                  </th>
                ))}
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {items.map((user) => (
                <tr key={uid(user)}>
                  {col.map((value) => (
                    <td key={user[value]}>{user[value]}</td>
                  ))}
                  <td><Link to={`/users/${user.id}`} className="btn btn-warning w-100 btn-sm"> Edit</Link></td>
                  <td><button type="button" className="btn btn-danger w-100 btn-sm" onClick={() => delModal(user)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {
            show && (
            <DeleteModal name={deleteUser.name} handleDelete={() => handleDelonClick(deleteUser)} open={show} handleClose={() => setShow(false)} />

            )
          }
        </div>
      )}
    </>
  );
}

MyDataTable.defaultProps = {
  sortable: [],
};

MyDataTable.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  sortable: PropTypes.arrayOf(String),
  col: PropTypes.arrayOf(String).isRequired,
  delUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  delUser: deleteUser,
};

export default connect(null, mapDispatchToProps)(MyDataTable);
