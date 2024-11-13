import { current } from "@reduxjs/toolkit";
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
  const target = path.length === 0 ? schema : _.get(schema, path);
  if (target) {
    if (!target.props) {
      target.props = {};
    }
    target.props[propKey] = propValue;
  }
  return schema;
};

export const deleteChildPropUtil = (schema, path, propKey) => {
  const target = _.get(schema, path);
  if (target && target.props && target.props.hasOwnProperty(propKey)) {
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

export const getConfigArrFromSchemaArr = (
  schemaArr = [],
  configArr = [],
  options = {}
) => {
  const configMap = configArr.reduce((acc, ele) => {
    acc[ele.config?.schemaId] = ele;
    return acc;
  }, {});

  return configArr.map((config) => {
    const sec = schemaArr.find(
      (schema) => schema._id === config.config?.schemaId
    );
    const defaultProps =
      sec?.settings?.reduce((acc, ele) => {
        acc[ele.id] = ele.default;
        return acc;
      }, {}) || {};
    const savedConfigProps = config.config || {};
    let result = {
      name: sec?.name || "",
      slug: sec?.slug || "",
      config: {
        props: { ...defaultProps, ...savedConfigProps.props },
        ...savedConfigProps,
        schemaId: sec?._id || "",
      },
    };
    if (options.includeSchemaKey) {
      result.setting = sec;
    }
    return result;
  });
};

export const getFirstPathSegment = (pathname) => {
  try {
    const firstSegment = pathname.split("/").filter(Boolean)[0]; // Split by '/', filter out empty parts
    return firstSegment || ""; // Return the first segment or an empty string if none exists
  } catch (error) {
    console.error("Invalid URL:", error);
    return "";
  }
};

export const getRandomImage = (designType) => {
  const imagesByType = {
    ["T-shirt"]: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSya_RH2Kt3LptFzgbedVrxUPVqxwj0TTjRmQ&s",
      "https://images.squarespace-cdn.com/content/v1/5a802676b7411c2497540b80/1610457880081-91BSTJGD5MNGJ43TUNKH/TSHIRT-DESIGN-TEXINTEL.jpg",
      "https://cdn.shopify.com/s/files/1/0984/4522/products/Graphic-Designer-T-Shirt-2.jpg?v=1571504977",
      "https://mms-images.out.customink.com/mms/images/catalog/6a62c76ef0978853a20391b6c32da4fe/colors/176100/views/alt/front_medium.png?autoNegate=1&design=djn0-00by-wu36&digest=000000028&ixbg=%23ffffff&ixfm=jpeg&ixq=60&ixw=412&placeMax=1&placeMaxPct=0.8&placeUseProduct=1&placeUseView=front",
      "https://cdn.logojoy.com/wp-content/uploads/20230824145637/hiking-business-t-shirt-design-idea.jpg",
    ],
    ["Gift Box"]: [
      "https://img.freepik.com/premium-photo/gift-decorative-box-modern-packaging-design_700081-1143.jpg",
      "https://www.morganchaney.com/content/165954/layu-boxes.jpg",
    ],
    "Wedding Card": [
      "https://marketplace.canva.com/EAF6Q0JILnc/1/0/571w/canva-pink-floral-wedding-invitation-giEZQtHxqj8.jpg",
      "https://marketplace.canva.com/print-mockup/bundle/FTpibBRols4/corners%3Asquare%2Cproductsize%3Aportrait%2Csurface%3Amarketplace/surface%3Amarketplace/EAF5o8aMa88/2/0/1143w/canva-white-green-floral-watercolor-wedding-invitation-F0ZiIPW6OBM.jpg?sig=bbbad3fc49836826e5326d3aaff2bbc7&width=800",
    ],
  };

  const selectedImages = imagesByType[designType] || imagesByType["T-shirt"]; // Default to 'tshirt' images if designType doesn't match
  return selectedImages[Math.floor(Math.random() * selectedImages.length)];
};

export const getDefaultPage = (session) => {
  if (!session) {
    return "/";
  }
  if (session?.user?.role?.roleName === "vendor") {
    return "/myOrders";
  }
  return "/explore";
};
