import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
  }
}

const AdsComponent = (props:any) => {
  const { dataAdSlot } = props;

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
    catch (e) {
    }
  }, []);

  return (
    <>
      <ins className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4887793423086417"
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true">
      </ins>
    </>
  );
};

export default AdsComponent;