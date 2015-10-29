Meteor.methods({
  addQuery: function (query, radius, limit) {
    var history = {
      owner: this.userId,
      date: new Date(),
      query: query,
      radius: radius,
      limit: limit
    };
    QueryHistory.insert(history);    
  },
  deleteQuery: function (queryId) {
    QueryHistory.remove({_id: queryId});
  },
  getVenues: function(params){
    params.client_id = 'L15V5MYOVTICAECM5VAJRYZ3X151JL0ON0OYHQW2PUIT5H44';
    params.client_secret = 'FDU4KSNJOKNP040O0YCZM5FTTVQWQ5UPXRFAX45I2VMVI1ZR';
    params.v = 20151022;
    var wrap = Meteor.wrapAsync(function(params, callback){
      HTTP.call('GET', 'https://api.foursquare.com/v2/venues/search',{params: params}, function(err, res){
        if(err){
          return callback(err);
        } else{
          return callback(null, res.data.response.venues);
        }
      });
    });
    return wrap(params);
  }
});