import type { FC } from 'react';
import { PageBreadcrumb } from '../PageBreadcrumb/PageBreadcrumb';

interface PageHeaderProps {
  title: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title }) => {
  return (
    <div>
      <PageBreadcrumb />
      <div className="flex flex-row md:justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-2">
        <header className="flex items-center">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            {title}
          </h2>
        </header>
      </div>
    </div>
  );
}

export default PageHeader;