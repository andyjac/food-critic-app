var Rest = require('../models/Restaurant');

module.exports = function(req, res) {
  Rest.find().distinct('restaurant.genre', function(err, data) {
    if (err) {
      console.log(err);
      return res.status(500).json({msg: 'internal server error'});
    }
console.log(data);
    data.sort(function (a, b) {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    });
console.log(data);
    res.status(200).json(data);
  });
};
