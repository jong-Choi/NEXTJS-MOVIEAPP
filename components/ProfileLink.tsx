import Link from "next/link";
import React from "react";

const ProfileLink = ({ uid, myUid, className = "text-white", children }) => {
  const pathname = myUid === uid ? "/profile" : `/profile/${uid}`;
  return (
    <Link
      href={{
        pathname: pathname,
      }}
      className={className}
    >
      {children}
    </Link>
  );
};

export default ProfileLink;
