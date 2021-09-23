import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { Children } from 'react';

export interface NavLinkProps extends LinkProps {
  children: React.ReactElement;
  activeClassName: string;
}

const ActiveLink = ({ children, activeClassName, ...props }: NavLinkProps) => {
  const { asPath } = useRouter();

  const child = Children.only(children);
  const childClassName = child.props.className || '';

  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

export default ActiveLink;
