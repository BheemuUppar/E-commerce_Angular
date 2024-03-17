export const environment = {
  production: false,
  baseUrl: 'http://localhost:3000',
  register: 'http://localhost:3000/auth/register',
  login: 'http://localhost:3000/auth/login',
  createOrder:'http://localhost:3000/payment/createOrder',
  tokenVerify:'https://localhost:3000/auth/verifyToken',
  paymentVerify:'http://localhost:3000/payment/verify',
  getOrders:"http://localhost:3000/user/orders",
  orderCash:'http://localhost:3000/user/order-cash',

  razorpayKey:'rzp_test_GUCLqEesz1MaZA',
};
