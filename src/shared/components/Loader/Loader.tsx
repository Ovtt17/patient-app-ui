import type { FC } from "react";

interface LoaderProps {
  title?: string;
}

const Loader: FC<LoaderProps> = ({ title }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-whiten dark:bg-boxdark-2">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent dark:border-primary-dark dark:border-t-transparent"></div>
      {title && (
        <div className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-200 text-center">
          {title}
        </div>
      )}
    </div>
  );
};

export default Loader;
