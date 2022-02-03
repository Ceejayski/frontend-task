import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

function MyCard({ children }) {
  const header = React.Children.map(children, (child) => (child.type.displayName === 'Header' ? child : null));
  const body = React.Children.map(children, (child) => (child.type.displayName === 'Body' ? child : null));
  return (
    <div className="my-card shadow py-3">
      <div className="my-card-header border-bottom px-3 pb-3">
        {header}
      </div>
      <div className="my-card-body px-3 pt-3">
        {body}
      </div>
    </div>
  );
}

const Header = ({ children }) => <h5>{children}</h5>;
Header.displayName = 'Header';
MyCard.Header = Header;

const Body = ({ children }) => children;
Body.displayName = 'Body';
MyCard.Body = Body;

MyCard.propTypes = {
  children: PropTypes.node.isRequired,
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyCard;
