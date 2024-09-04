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
