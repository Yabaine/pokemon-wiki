import React, { FC, ReactNode, Suspense } from 'react';
import Loader from '../../../components/Loader';
import { FallbackType } from '../../../types';

type Props = {
  children: ReactNode;
  loaderType: FallbackType;
};

const SuspenseWrapper: FC<Props> = ({ children, loaderType }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
  /* return <Suspense fallback={<span>Loading</span>}>{children}</Suspense>; */
};

export default SuspenseWrapper;
