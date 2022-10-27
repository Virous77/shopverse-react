export const adminNav = [
  {
    id: 1,
    name: "dashboard",
    url: "dashboard",
  },

  {
    id: 2,
    name: "view orders",
    url: "orders",
  },

  {
    id: 3,
    name: "view products",
    url: "view-product",
  },

  {
    id: 4,
    name: "add products",
    url: "add-product/ADD",
  },
];

export const Category = [
  {
    id: 1,
    name: "laptop",
    value: "laptop",
  },
  {
    id: 2,
    name: "mobile",
    value: "mobile",
  },
  {
    id: 3,
    name: "fashion",
    value: "fashion",
  },
  {
    id: 4,
    name: "tv",
    value: "tv",
  },
  {
    id: 5,
    name: "grocries",
    value: "grocries",
  },
  {
    id: 6,
    name: "camera",
    value: "camera",
  },
  {
    id: 7,
    name: "watch",
    value: "watch",
  },
  {
    id: 8,
    name: "home appliances",
    value: "home-appliances",
  },

  {
    id: 9,
    name: "book",
    value: "book",
  },
  {
    id: 10,
    name: "beauty",
    value: "beauty",
  },
  {
    id: 11,
    name: "pharmecy",
    value: "pharmecy",
  },
];

export const sortList = [
  {
    id: 1,
    name: "latest",
    value: "latest",
  },
  {
    id: 2,
    name: "price (lowest)",
    value: "price-lowest",
  },
  {
    id: 3,
    name: "price (highest)",
    value: "price-highest",
  },
  {
    id: 4,
    name: "name (a-z)",
    value: "name-az",
  },

  {
    id: 5,
    name: "name (z-a)",
    value: "name-za",
  },
];

export const shorting = (text, number) => {
  if (text.length > number) {
    const shortText = text.substring(0, number).concat("...");
    return shortText;
  }
  return text;
};

export const cartHead = [
  {
    id: 1,
    name: "item",
  },
  {
    id: 2,
    name: "price",
  },
  {
    id: 3,
    name: "quantity",
  },
  {
    id: 4,
    name: "sub total",
  },
];

export const cartHeads = [
  {
    id: 1,
    name: "item",
  },

  {
    id: 2,
    name: "quantity",
  },

  {
    id: 3,
    name: "delete",
  },
];

export const orderStatus = [
  {
    id: 1,
    name: "Order Placed...",
    value: "Order Placed...",
  },
  {
    id: 2,
    name: "Deliverd",
    value: "Deliverd",
  },
  {
    id: 3,
    name: "Shipped",
    value: "Shipped",
  },
  {
    id: 4,
    name: "Processing",
    value: "Processing",
  },
];
