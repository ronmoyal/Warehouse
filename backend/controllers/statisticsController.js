import order from '../model/Order.js';


const oldOrders = async (req, res) => {
    const old = await order.find({ isActive: 'old' }).exec();
    const future = await order.find({ isActive: 'false' }).exec();
    res.send({ old, future });
};


    export default { oldOrders }; 