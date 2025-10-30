import type { FC } from 'react';

interface PageHeaderProps {
  title: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title }) => {
  return (
    <div>
      <div className="flex flex-row md:justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-2">
        <header className="flex items-center">
          <h2 className="text-3xl font-extrabold mb-4 text-black dark:text-white">
            {title}
          </h2>
        </header>
      </div>
    </div>
  );
}

export default PageHeader;