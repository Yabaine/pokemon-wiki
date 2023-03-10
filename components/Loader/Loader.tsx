import React, { FC } from 'react';
import { FallbackType } from '../../types';
import { withBem } from '../../utils/bem';

interface Props {
  loaderType: FallbackType;
}

const Loader: FC<Props> = (loaderType) => {
  /* const b = withBem('loader'); */

  return <span className="loader"></span>;
};

export default Loader;
