import React from "react";

import { GroupsCard } from "../GroupsCard";

export const RenderGroups = ({ item, index }) => (
  <GroupsCard
    id={item.id}
    name={item.name}
    desc={item.desc}
    image={item.image}
    members={item.numberOfMembers}
    index={index}
    isOwner={item.isOwner}
    isJoined={item.isJoined}
    privacy={item.privacy}
    coverImage={item.coverImage}
  />
);
