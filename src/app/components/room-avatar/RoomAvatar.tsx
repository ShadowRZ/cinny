import { JoinRule } from 'matrix-js-sdk';
import { AvatarFallback, AvatarImage, Icon, Icons } from 'folds';
import React, { ComponentProps, ReactNode, forwardRef, useState } from 'react';
import * as css from './RoomAvatar.css';
import { joinRuleToIconSrc } from '../../utils/room';

type RoomAvatarProps = {
  src?: string;
  alt: string;
  renderInitials: () => ReactNode;
};
export function RoomAvatar({
  variant,
  src,
  alt,
  renderInitials,
}: RoomAvatarProps & css.RoomAvatarVariants) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <AvatarFallback className={css.RoomAvatar({ variant })}>{renderInitials()}</AvatarFallback>
    );
  }

  return (
    <AvatarImage
      className={css.RoomAvatar({ variant })}
      src={src}
      alt={alt}
      onError={() => setError(true)}
    />
  );
}

export const RoomIcon = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, 'src'> & {
    joinRule: JoinRule;
  }
>(({ joinRule, ...props }, ref) => (
  <Icon src={joinRuleToIconSrc(Icons, joinRule, false) ?? Icons.Hash} {...props} ref={ref} />
));