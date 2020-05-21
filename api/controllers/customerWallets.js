const uuidv4 = require('uuid-v4');

module.exports = app => {

    const customerWalletsDB = app.data.customerWallets;
    const controller = {};

    const {
        customerWallets: customerWalletsMock,
    } = customerWalletsDB;

    controller.lisCustomerWallets = (req, res) => res.status(200).json(customerWalletsDB);

    controller.saveCustomerWallets = (req, res) => {
        customerWalletsMock.data.push({
            id: uuidv4(),
            parentId: uuidv4(),
            name: req.body.name,
            birthDate: req.body.birthDate,
            cellphone: req.body.cellphone,
            phone: req.body.phone,
            email: req.body.email,
            occupation: req.body.occupation,
            status: req.body.state
        });
        res.status(201).json(customerWalletsMock);
    }

    controller.removeCustomerWallets = (req, res) => {
        const { 
            customerId,
        } = req.params;

        const foundCustomerIndex = customerWalletsMock.data.findIndex(customer => customer.id === customerId);
        
        
        if(foundCustomerIndex === -1) {
            res.status(404).json({
                message: 'Customer not found.', 
                success: false,
                customerWallets: customerWalletsMock,
            });
        }else{
            customerWalletsMock.data.splice(foundCustomerIndex, 1);
            res.status(200).json({
                message: 'Customer deleted successfully.',
                success: true,
                customerWallets: customerWalletsMock,
            });
        }
    };

    controller.updateCustomerWallets = (req, res) => {
        
        const {
            customerId,
        } = req.params;

        const foundCustomerIndex = customerWalletsMock.data.findIndex(customer => customer.id === customerId);

        if(foundCustomerIndex === -1) {
            res.status(404).json({
                message: 'Customer not found',
                success: false,
                customerWallets: customerWalletsMock,
            });
        }else{
            const newCustomer = {
                id: customerId,
                parentId: req.body.parentId,
                name: req.body.name,
                birthDate: req.body.birthDate,
                cellphone: req.body.cellphone,
                phone: req.body.phone,
                email: req.body.email,
                occupation: req.body.occupation,
                status: req.body.status,
                createdAt: new Date()
            };

            customerWalletsMock.data.splice(foundCustomerIndex, 1, newCustomer);

            res.status(200).json({
                message: 'Customer updated successfully',
                success: true,
                customer: customerWalletsMock,
            });
        }
    }

    return controller;

}