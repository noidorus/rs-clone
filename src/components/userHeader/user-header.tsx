import React from 'react';

export default function UserHeader() {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <img src="" alt="user avatar" />
      <div>
        <h4>Profile Name</h4>
        <div
          style={{
            display: 'flex',
          }}
        >
          <p>Publication count</p>
          <p>Followers</p>
          <p>Followings</p>
        </div>
      </div>
    </div>
  );
}
