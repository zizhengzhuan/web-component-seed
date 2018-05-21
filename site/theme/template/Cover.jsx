import React from 'react';
import { Link } from 'react-router';

export default function Cover() {
  return (
    <div className="cover-wrapper">
      <div className="cover-map" />
      <div className="cover-content">
        <div className="cover-icon">
          <span>YD</span>
        </div>
        <h3>YD</h3>
        <div className="cover-link">
          <a className="github" target="_blank" rel="nofollow noopener noreferrer" href="https://gitee.com/remotesc2/yd">Source</a>
          <Link className="start" to="/changelog-cn" >Get Started</Link>
        </div>
      </div>
    </div>
  );
}
