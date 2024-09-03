const settingsSchema = {
  RCPl: {
    FOS: {
      global: {
        settings: [
          {
            id: "card_view_options",
            type: "select",
            options: [
              {
                value: "card_with_image",
                text: "Card with image",
              },
              {
                value: "card_without_image",
                text: "Card with out image",
              },
            ],
            default: "card_with_image",
            label: "View Options",
            info: "Cart Card view options",
          },
          {
            type: "checkbox",
            id: "showEmptyCartButton",
            label: "Show Empty Cart Button",
            default: true,
            info: "",
          },
          {
            type: "checkbox",
            id: "showItemTotal",
            label: "Show Total Price in Card",
            default: false,
            info: "Display total price of an item",
          },
        ],
        props: {
          card_view_options: "card_with_image",
          showEmptyCartButton: false,
        },
      },
      pages: {
        home: {
          name: "cart_card_listing",
          label: "Cart Card Listing",
          settings: [
            {
              id: "card_view_options",
              type: "select",
              options: [
                {
                  value: "card_with_image",
                  text: "Card with image",
                },
                {
                  value: "card_without_image",
                  text: "Card with out image",
                },
              ],
              default: "card_with_image",
              label: "View Options",
              info: "Cart Card view options",
            },
            {
              type: "checkbox",
              id: "showEmptyCartButton",
              label: "Show Empty Cart Button",
              default: true,
              info: "",
            },
            {
              type: "checkbox",
              id: "showItemTotal",
              label: "Show Total Price in Card",
              default: false,
              info: "Display total price of an item",
            },
          ],
          props: {},
          sections: [
            {
              name: "circular-gallery",
              label: "Circular Gallery",
              settings: [
                {
                  type: "text",
                  id: "section_title",
                  default: "",
                  label: "Section Title",
                },
              ],
              props: {},
              blocks: [
                {
                  type: "gallery_image",
                  name: "Image",
                  settings: [
                    {
                      type: "image_picker",
                      id: "image",
                      label: "Gallery Image",
                      default: "",
                    },
                    {
                      type: "text",
                      id: "caption",
                      label: "Image Caption",
                      default: "",
                    },
                    {
                      type: "checkbox",
                      id: "inGreyBg",
                      default: false,
                      label: "Show In Grey Background",
                    },
                    {
                      type: "url",
                      id: "link",
                      label: "Link",
                      default: "",
                      info: "Link to redirect",
                    },
                  ],
                  props: {},
                },
              ],
            },
          ],
        },
        cart: {},
      },
    },
  },
};

const settingsValue = {
  RCPL: {
    FOS: {
      pages: {
        home: {
          props: {
            card_view_options: 433,
          },
          sections: [
            {
              props: {},
            },
          ],
        },
      },
    },
  },
};

export default settingsSchema;
