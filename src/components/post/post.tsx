import React from "react";
import { IUserProfile } from "../../types/types";

function Post({ user }: { user: IUserProfile  }) {
  return (
    <div>
      {user?.username}
    </div>
  )
}

export default Post;