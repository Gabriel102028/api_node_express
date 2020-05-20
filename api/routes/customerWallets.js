module.exports = app => {

    const controller = app.controllers.customerWallets;

    app.route('/api/v1/customer-wallets')
    .get(controller.lisCustomerWallets)
    .post(controller.saveCustomerWallets);

    app.route('/api/v1/customer-wallets/:customerId')
    .delete(controller.removeCustomerWallets);
}