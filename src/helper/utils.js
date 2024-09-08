import { cloneDeep } from "lodash";
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

export const getTargetAndClone = (schema, path) => {
  let target = schema;
  for (let i = 0; i < path.length; i++) {
    const key = path[i];
    if (!target[key]) {
      return { target: null, newSchema };
    }
    target = cloneDeep(target[key]);
  }

  return { target, schema };
};

export const updateAtPath = (obj, path, callback) => {
  if (path.length === 0) return callback(obj);
  const [key, ...rest] = path;
  return {
    ...obj,
    [key]: updateAtPath(obj[key], rest, callback),
  };
};

export const addChildUtil = (schema, path, childKey, newChild) => {
  const target = _.get(schema, path);

  if (target) {
    if (Array.isArray(target[childKey])) {
      // If the key already exists as an array, push the new child
      _.set(schema, [...path, childKey], [...target[childKey], newChild]);
    } else {
      // If the key doesn't exist or is not an array, set it as an array with the new child
      _.set(schema, [...path, childKey], [newChild]);
    }
  }

  return schema;
};

export const deleteChildUtil = (schema, path) => {
  _.unset(schema, path);
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
    // Create a new array with the updated child at the specified index
    const updatedArray = [...target];
    updatedArray[index] = updatedChild;

    // Set the updated array back to the schema at the given path
    _.set(schema, [...path, childKey], updatedArray);
  }

  return schema;
};
