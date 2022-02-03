import React from 'react';
import MyCard from '../components/myCard';
import UserForm from '../containers/userForm';

export default function FormPage() {
  return (
    <div>
      <MyCard>
        <MyCard.Header> Form </MyCard.Header>
        <MyCard.Body>
          <UserForm />
        </MyCard.Body>
      </MyCard>
    </div>
  );
}
