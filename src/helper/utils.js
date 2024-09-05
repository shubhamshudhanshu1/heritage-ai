import CommonComponents from "../components/dynamic";

export const renderComponents = (attribute = {}, args = {}) => {
  const { value, onChange } = args;
  if (!attribute) return null;
  const type = attribute.type;
  const props = {
    ...attribute,
    value,
    onChange,
  };
  return <CommonComponents {...props} {...args.props} key={`${type}`} />;
};

export const getTarget = (schema, path) => {
  let target = schema;
  for (const key of path) {
    if (target[key]) {
      target = target[key];
    } else {
      return null;
    }
  }
  return target;
};
