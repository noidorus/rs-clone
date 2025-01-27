import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonPostSmall = () => {
  const elements = Array(2)
    .fill('')
    .map((_, i) => (
      <li key={i} className="post-list__item post post--dashboard">
        <div className="post-header">
          <Skeleton circle={true} height={40} width={40} />
          <Skeleton height={40} width={150} />
        </div>
        <Skeleton height={480} style={{ marginTop: 4 }} />
        <Skeleton height={14} count={3} style={{ marginTop: 4 }} />
      </li>
    ));

  return (
    <div className="post-list">
      <ul className="post-list__inner">{elements}</ul>
    </div>
  );
};

const SkeletonPostPreview = () => {
  const elements = Array(6)
    .fill('')
    .map((_, i) => (
      <li key={i} className="post-list__item post">
        <Skeleton height={300} />
      </li>
    ));

  return (
    <div className="post-list">
      <ul className="post-list__inner">{elements}</ul>
    </div>
  );
};

export { SkeletonPostSmall, SkeletonPostPreview };
