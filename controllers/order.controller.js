const Order = require('../models/order.model.js');

// Create and Save a new order
exports.create = (req, res) => {
  // Validate request
  if(!req.body.firstName) {
    return res.status(400).send({
        message: "Name cannot be empty"
    });
}

// Create an order
const order = new Order({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    contact: req.body.contact,
    address: req.body.address,
    appointmentPlace: req.body.appointmentPlace,
    appointmentDate: req.body.appointmentDate,
    instaId: req.body.instaId,
    appointmentType: req.body.appointmentType
});

// Save order in the database
order.save()
.then(data => {
    console.log(data);
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the order."
    });
});
};

// Retrieve and return all orders from the database.
exports.findAll = (req, res) => {
  Order.find()
    .then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orders."
        });
    });
};

// Find a single order with a orderId
exports.findOne = (req, res) => {
  Order.findById(req.params.orderId)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });            
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving order with id " + req.params.orderId
        });
    });
};

// Update a order identified by the orderId in the request
exports.update = (req, res) => {
  // Validate Request
  if(!req.body.firstName) {
    return res.status(400).send({
        message: "Name can not be empty"
    });
}

// Find order and update it with the request body
Order.findByIdAndUpdate(req.params.orderId, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    contact: req.body.contact,
    address: req.body.address,
    appointmentPlace: req.body.appointmentPlace,
    appointmentDate: req.body.appointmentDate,
    instaId: req.body.instaId,
    appointmentType: req.body.appointmentType
}, {new: true})
.then(order => {
    if(!order) {
        return res.status(404).send({
            message: "Order not found with id " + req.params.orderId
        });
    }
    res.send(order);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Order not found with id " + req.params.orderId
        });                
    }
    return res.status(500).send({
        message: "Error updating order with id " + req.params.orderId
    });
});
};

// Delete a order with the specified orderId in the request
exports.delete = (req, res) => {
  
  Order.findByIdAndRemove(req.params.orderId)
  .then(order => {
      if(!order) {
          return res.status(404).send({
              message: "order not found with id " + req.params.orderId
          });
      }
      res.send({message: "order deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "order not found with id " + req.params.orderId
          });                
      }
      return res.status(500).send({
          message: "Could not delete order with id " + req.params.orderId
      });
  });
};

exports.excel = (req,res) => {
    Order.find()
    .then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orders."
        });
    });
}