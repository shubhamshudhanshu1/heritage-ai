import CommonComponents from "../components/dynamic";
import _ from "lodash";

export const renderComponents = (attribute = {}, args = {}) => {
  if (!attribute) return null;
  const type = attribute.type;
  const props = {
    ...attribute,
    ...args.props,
  };
  return <CommonComponents {...props} key={`${type}`} />;
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

export const addChildUtil = (schema, path, childKey, newChild) => {
  const target = path.length === 0 ? schema : _.get(schema, path);
  if (target) {
    if (Array.isArray(target[childKey])) {
      _.set(schema, [...path, childKey], [...target[childKey], newChild]);
    } else {
      _.set(schema, [...path, childKey], [newChild]);
    }
  }
  return schema;
};
export const deleteChildUtil = (schema, path) => {
  const parentPath = path.slice(0, -1);
  const keyToRemove = path[path.length - 1];
  const target = _.get(schema, parentPath);
  if (Array.isArray(target)) {
    _.set(
      schema,
      parentPath,
      target.filter((_, index) => index !== keyToRemove)
    );
  } else {
    _.unset(schema, path);
  }
  return schema;
};

export const updateChildAtIndexUtil = (
  schema,
  path,
  childKey,
  index,
  updatedChild
) => {
  const target = _.get(schema, [...path, childKey]);
  if (Array.isArray(target) && index < target.length) {
    const updatedArray = [...target];
    updatedArray[index] = updatedChild;
    _.set(schema, [...path, childKey], updatedArray);
  }
  return schema;
};

export const addOrUpdateChildPropUtil = (schema, path, propKey, propValue) => {
  // Get the target child using the provided path
  const target = _.get(schema, path);

  if (target) {
    // Ensure the props object exists
    if (!target.props) {
      target.props = {};
    }
    // Add or update the prop key with the given value
    target.props[propKey] = propValue;
  }

  return schema;
};

export const deleteChildPropUtil = (schema, path, propKey) => {
  // Get the target child using the provided path
  const target = _.get(schema, path);

  if (target && target.props && target.props.hasOwnProperty(propKey)) {
    // Delete the prop key from the props object
    delete target.props[propKey];
  }

  return schema;
};

export function segregateByTypeAndSlug(data) {
  return data.reduce((acc, item) => {
    const { type, slug } = item;
    if (!acc[type]) {
      acc[type] = {};
    }
    acc[type][slug] = item;
    return acc;
  }, {});
}
