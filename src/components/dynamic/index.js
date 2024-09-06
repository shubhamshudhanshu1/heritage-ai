import React, { Suspense } from "react";

const requireComponents = require.context("./", true, /index\.js$/);
const keys = requireComponents.keys();
const map = keys.reduce((acc, item) => {
  const type = item.replace(/^\.\//, "").replace(/\/index\.js$/, "");
  acc[type] = React.lazy(() => import(`./${type}`));
  return acc;
}, {});

const CommonComponents = ({ type, ...rest }) => {
  const formattedtype = type;
  const LazyComponent = map[formattedtype];
  if (!LazyComponent) {
    return <div style={{ margin: "25px 0" }}>Component not found</div>;
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent type={type} {...rest} />
    </Suspense>
  );
};

export default React.memo(CommonComponents);
