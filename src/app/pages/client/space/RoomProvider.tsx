import React, { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { useSelectedRoom } from '../../../hooks/router/useSelectedRoom';
import { RoomProvider } from '../../../hooks/useRoom';
import { useMatrixClient } from '../../../hooks/useMatrixClient';
import { JoinBeforeNavigate } from '../../../features/join-before-navigate';
import { useSpace } from '../../../hooks/useSpace';
import { getAllParents } from '../../../utils/room';
import { roomToParentsAtom } from '../../../state/room/roomToParents';

export function SpaceRouteRoomProvider({ children }: { children: ReactNode }) {
  const mx = useMatrixClient();
  const space = useSpace();
  const roomToParents = useAtomValue(roomToParentsAtom);

  const { roomIdOrAlias } = useParams();
  const roomId = useSelectedRoom();
  const room = mx.getRoom(roomId);

  if (!room || room.isSpaceRoom() || !getAllParents(roomToParents, room.roomId).has(space.roomId)) {
    return <JoinBeforeNavigate roomIdOrAlias={roomIdOrAlias!} />;
  }

  return (
    <RoomProvider key={room.roomId} value={room}>
      {children}
    </RoomProvider>
  );
}