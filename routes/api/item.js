var Item = require('../../app/model/item');

module.exports = function(app) {
  app.post('/api/item', function(req, res) {
    var item;
    
    item = new Item({
      priceSpent: req.body.priceSpent,
      receiptName: req.body.receiptName,
      paymentMethod: req.body.paymentMethod,
      dateCreated: req.body.dateCreated,
      formatDate: req.body.formatDate
    });

    item.save(function() {
      if (err) {
        res.status(500).send(err);
      }

      else {
        res.status(201).send(item);
      }
    });
  });
}