import React, { FC, ReactNode, Suspense } from 'react';

import { FallbackType } from '../../../types';

type Props = {
  children: ReactNode;
  loaderType: FallbackType;
};

const SuspenseWrapper: FC<Props> = ({ children, loaderType }) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default SuspenseWrapper;
