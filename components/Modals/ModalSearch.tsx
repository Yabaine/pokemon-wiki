import React, { FC, useState, ReactNode } from 'react';
import { withBem } from '../../utils/bem';
import * as Dialog from '@radix-ui/react-dialog';
import SearchResults from '../SearchResults';
import SuspenseWrapper from '../../lib/client/providers/SuspenseWrapper';
import ModalHeader from './ModalHeader';
import { SearchContextProvider } from '../../lib/client/providers/Context';

type Props = {
  type?: string;
};

type Children = {
  children?: ReactNode;
};

const b = withBem('modal');

export const CloseModal: FC<Children> = ({ children }) => {
  return <Dialog.Close className={b('close')}>{children}</Dialog.Close>;
};

const ModalSearch: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const type = 'search';

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.DialogTrigger>
          <span>Search</span>
        </Dialog.DialogTrigger>
        <Dialog.DialogPortal>
          <Dialog.Overlay className={b('overlay')} />
          {/* SearchContextProvider envuelve toda la zona donde utilizamos las variables 
        globales de los estados de busqueda */}
          <SearchContextProvider>
            {' '}
            <Dialog.Content className={b('no-fullscreen')}>
              {type && <ModalHeader type={type}></ModalHeader>}
              <div className={b('content')}>
                <SuspenseWrapper loaderType="item">
                  <SearchResults />
                </SuspenseWrapper>
              </div>
            </Dialog.Content>
          </SearchContextProvider>
        </Dialog.DialogPortal>
      </Dialog.Root>
    </>
  );
};

export default ModalSearch;
