import React from "react";

export default function Github() {
  return <div>Github</div>;
}

export function getServerSideProps() {
  return {
    redirect: {
      destination: "https://github.com/wlftuc/url-shortener",
    },
  };
}
