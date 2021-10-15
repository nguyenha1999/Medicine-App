import React, { Suspense } from 'react';
import { Skeleton } from 'antd';
import PropTypes from 'prop-types';

const Routers = (props) => {
  const { component } = props;
  return (
    <Suspense fallback={<Skeleton />}>
      {component}
    </Suspense>
  )
};

Routers.propTypes = {
  component: PropTypes.node
}

export default Routers;
