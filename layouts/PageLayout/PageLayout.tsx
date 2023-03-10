import ErrorBoundaryWrapper from '../../lib/client/providers/ErrorBoundaryWrapper';
import React from 'react';
import SuspenseWrapper from '../../lib/client/providers/SuspenseWrapper';
import { withBem } from '../../utils/bem';
import Navbar from '../../components/Navbar';
export const siteTitle = 'Next.js Sample Website';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const b = withBem('page-layout');

  return (
    <ErrorBoundaryWrapper errorFallbackType="screen">
      <SuspenseWrapper loaderType="screen">
        <div className={b()}>
          {/* <aside>
            <Navbar />
          </aside> */}

          <main className={b('main')}>
            <ErrorBoundaryWrapper errorFallbackType="page">
              <SuspenseWrapper loaderType="page">{children}</SuspenseWrapper>
            </ErrorBoundaryWrapper>
          </main>
          <footer className={b('footer')}></footer>
        </div>
      </SuspenseWrapper>
    </ErrorBoundaryWrapper>
  );
}
