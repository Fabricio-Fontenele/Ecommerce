export const ACTION_ERROR_MESSAGES = {
  unauthorized: "Unauthorized",
  cartEmpty: "Cart is empty",
  shippingAddressRequired: "Shipping address not found",
  orderNotFound: "Order not found",
  orderAlreadyPaid: "Order has already been paid",
  orderCancelled: "Order has been cancelled",
  cartItemNotFound: "Cart item not found",
  productVariantNotFound: "Product variant not found",
} as const;

export const isActionErrorMessage = (
  error: unknown,
  message: (typeof ACTION_ERROR_MESSAGES)[keyof typeof ACTION_ERROR_MESSAGES],
) => {
  return error instanceof Error && error.message === message;
};
