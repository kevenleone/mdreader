import clsx from 'clsx';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type BreadCrumbProps = {
  paths: string[];
};

export const ArrowLeft: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 text-gray-500 dark:text-gray-100"
    viewBox="0 0 512 512"
  >
    <title>Arrow Back</title>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="48"
      d="M244 400L100 256l144-144M120 256h292"
    />
  </svg>
);

const BreadCrumb: React.FC<BreadCrumbProps> = ({ paths = [] }) => {
  const navigate = useNavigate();

  const activePath = paths[paths.length - 1];

  return (
    <>
      <span
        onClick={() => navigate(-1)}
        className="cursor-pointer   flex h-6  items-center leading-7 my-4 rounded-lg transition-all"
      >
        <ArrowLeft />
        <span className="hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ml-2 text-gray-600 text-lg">
          Click to Back
        </span>
      </span>
      <ul className="hidden sm:flex">
        {(paths as string[]).map((path, index) => {
          const position = index + 1;
          const firstIndex = position === 1;
          const lastIndex = position === paths.length;
          const isActivePath = path === activePath;
          const href = `/preview/${[...paths].splice(0, index + 1).join('/')}`;
          const route = `${path} ${position !== paths.length ? '/' : ''}`;

          const handleClick = (event: any) => {
            event.preventDefault();

            navigate(href);
          };

          return (
            <li
              className={clsx(
                {
                  'font-bold text-gray-900': isActivePath,
                },
                { 'text-gray-600': !isActivePath },
                'mb-6 mr-2 dark:text-white text-sm '
              )}
              key={index}
            >
              {firstIndex || lastIndex ? (
                route
              ) : (
                <a href={href} onClick={handleClick}>
                  {route}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default BreadCrumb;