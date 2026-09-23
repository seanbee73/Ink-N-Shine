import React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        icon?: string;
        width?: string | number;
        height?: string | number;
        style?: React.CSSProperties;
        class?: string;
      };
    }
  }
}

interface IconProps {
  name: string;
  className?: string;
  size?: number | string;
  style?: React.CSSProperties;
}

export function Icon({ name, className = '', size = 20, style }: IconProps) {
  return React.createElement('iconify-icon', {
    icon: name,
    width: size,
    height: size,
    class: className,
    style: style,
  });
}
