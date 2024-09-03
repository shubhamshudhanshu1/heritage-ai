import CommonComponents from "../components/dynamic";

export const renderComponents = (attribute = {}, args = {}) => {
  const handleInput = (value, type) => {};
  const handleError = (val, type) => {};
  const allData = {};

  if (!attribute) return null;
  const type = attribute.type;
  const entityData = {};

  const props = {
    ...attribute,
    // entityData,
    // onChange: (e) => {
    //   handleInput(e, type);
    // },
    // onChangeError: (val) => {
    //   handleError(val, type);
    // },
  };

  return <CommonComponents {...props} {...args.props} key={`${type}`} />;
};
