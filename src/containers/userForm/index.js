/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { addNewUser, editCurrentUser } from '../../redux/actions/user.actions';
import { findUser } from '../../redux/utils/user.utils';

function UserForm({
  users, createUser, editUser,
}) {
  const { id } = useParams();
  const newUserMode = !id;
  const schema = yup
    .object({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Invalid Email Format').required('Email is required'),
    })
    .required();

  const {
    register, handleSubmit, formState, setValue,
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const mainSubmit = (data) => {
    if (newUserMode) {
      createUser(data);
    } else {
      editUser(data);
    }
    navigate('/');
  };
  useEffect(() => {
    if (!newUserMode) {
      const user = findUser(users, parseInt(id, 10));
      if (user) {
        const {
          name, email, id,
        } = user;
        setValue('name', name);
        setValue('email', email);
        setValue('id', id);
      } else {
        navigate('/404');
      }
    }
  }, []);
  return (
    <div className="container py-3">
      <Form onSubmit={handleSubmit(mainSubmit)} className="w-80 mx-auto">

        {!newUserMode && (
          <input
            type="number"
            name="id"
            id="id"
            {...register('id')}
            className="visually-hidden"
          />
        )}
        <Form.Group className="mb-3">
          <div className="d-flex">
            <label htmlFor="name">Name</label>
            <div className="w-100 ms-4">

              <input
                type="text"
                name="name"
                id="name"
                {...register('name')}
                className={`form-control  ${formState.errors.name ? 'is-invalid' : ''}`}
              />
              <div id="nameHelp" className="form-text text-danger">{formState.errors.name?.message}</div>
            </div>
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <div className="d-flex">

            <label htmlFor="email">Email</label>
            <div className="w-100 ms-4">

              <input
                type="email"
                name="email"
                id="email"
                {...register('email')}
                className={`form-control  ${formState.errors.email ? 'is-invalid' : ''}`}
              />
              <div id="nameHelp" className="form-text text-danger">{formState.errors.email?.message}</div>
            </div>
          </div>
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Link to="/" className="btn-outline-danger btn px-4 btn-sm me-3">Cancel</Link>
          <input type="submit" value="submit" className="btn btn-sm px-4 btn-success" />
        </div>
      </Form>
    </div>
  );
}

UserForm.propTypes = {
  users: PropTypes.arrayOf(Object).isRequired,
  createUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { users } = state;
  return {
    users,
  };
};

const mapDispatchToProps = {
  createUser: addNewUser,
  editUser: editCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
