import React from 'react';

interface StaticLogoProps {
  isMobile: boolean;
}

const StaticLogo: React.FC<StaticLogoProps> = ({ isMobile }) => {
  return (
    <div className={`position-fixed mt-3 ml-4 ${isMobile ? 'top-0 start-0 m-3' : 'top-0 start-0 m-4'} p-3 rounded`} style={{ zIndex: 1001 }}>
      <div>
        <h1 className={`mb-1 lh-1 ${isMobile ? 'fs-2' : 'display-2'}`} style={{ letterSpacing: '1px', color: '#D00000', fontFamily: 'segoe ui', fontWeight: '900' }}>
          STEIDL.
        </h1>
        <p className={`mb-0 ${isMobile ? 'small' : ''}`} style={{ color:'#000000' }}>
          New Approaches. Old School.
        </p>
      </div>
    </div>
  );
};

export default StaticLogo;