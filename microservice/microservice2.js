module.exports = function(c){

  var Cloudant = require('@cloudant/cloudant');
  var cloudant = Cloudant('https://f2092de2-3c88-49f9-8f7e-c70cb52bf7c2-bluemix:66909f1f607981fca7bf6adc19ab6289ff231cdf563562432b7b9530a2d6ef5b@f2092de2-3c88-49f9-8f7e-c70cb52bf7c2-bluemix.cloudantnosqldb.appdomain.cloud');

      var giver = cloudant.db.use('giver');
      giver.insert(c, function(err, body, header){
        if (err){
          return console.log('[giver.insert]', err.message);
        }
        else{
          return console.log('Data has been uploaded successfully');
        }
      });
}
