                                                       // Establishing Server //
const express = require('express')
const app = express();

                                                         // Installing Modules//
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const ejs = require('ejs');
app.set("view engine", 'ejs');


                                                              // Web Applications//
// Homepage //
app.get("/", function(req, res){
  res.sendFile(__dirname + '/index.html');
});


//Registration Pgae for opportunity taker //
var fname;
var lname;
var city;
var state;
var pin;
var email;
var phone;
var unique_number;
app.get("/register_taker", function(req, res){
  res.sendFile(__dirname + '/webpages/registration_taker.html');
});
app.post("/register_taker", function(req, res){
  fname = req.body.fname;
  lname = req.body.lname;
  city = req.body.city;
  state = req.body.state;
  pin = req.body.pcode;
  email = req.body.temail;
  phone = req.body.phone;
unique_number = Math.floor((Math.random() * 10000) + 1);
var final = {
    'id': unique_number,
    'fname': fname,
    'lname': lname,
    'city': city,
    'state': state,
    'pin': pin,
    'email': email,
    'phone': phone
  }
  var microservice1 = require(__dirname+"/microservice/microservice1.js");
  microservice1(final);
  res.render("registration_successful", {customer_name: fname, ejs: unique_number});
});


//Registration Pgae for opportunity giver //
var ofname;
var oname;
var ocity;
var ostate;
var oyear;
var oemail;
var ophone;
app.get("/register_giver", function(req, res){
  res.sendFile(__dirname + '/webpages/registration_giver.html');
});
app.post("/register_giver", function(req, res){
  ofname = req.body.ofname;
  oname = req.body.oname;
  ocity = req.body.ocity;
  ostate = req.body.ostate;
  oyear = req.body.oyear;
  oemail = req.body.oemail;
  ophone = req.body.ophone;
unique_number = Math.floor((Math.random() * 100000) + 1);
var final = {
    'unique_id': unique_number,
    'ofname': ofname,
    'oname': oname,
    'ocity': ocity,
    'ostate': ostate,
    'oyear': oyear,
    'oemail': oemail,
    'ophone': ophone
  }
  var microservice2 = require(__dirname+"/microservice/microservice2.js");
  microservice2(final);
  res.render("registration_successful", {customer_name: ofname, ejs: unique_number});
});


// Add opportunity//
app.get("/add_opportunity", function(req, res){
  res.sendFile(__dirname + '/webpages/add_opportunity.html');
});
var aname;
var adate1;
var adate2;
var aorganizer;
var acity;
var astate;
var ano;
var aemail;
var aphone;
var aid;
let people = [];
app.post("/add_opportunity", function(req, res){
  aname = req.body.aname;
  adate1 = req.body.adate1;
  adate2 = req.body.adate2;
  aorganizer = req.body.aorganizer;
  acity = req.body.acity;
  astate = req.body.astate;
  ano = req.body.ano;
  aemail = req.body.aemail;
  aphone = req.body.aphone;
  aid = req.body.aid;
  aneed = req.body.aneed;
  var unique_id_opp = Math.floor((Math.random() * 1000000) + 1);
  var needed = 2;
var final = {
    'aname': aname,
    'adate1': adate1,
    'adate2': adate2,
    'aorganizer': aorganizer,
    'acity': acity,
    'astate': astate,
    'ano': ano,
    'aemail': aemail,
    'aphone': aphone,
    'aid': aid,
    'unique_id_opp': unique_id_opp,
    'people': people,
    'needed': needed,
    'aneed': aneed
  }
function microservice3(c)
  {
    var url = 'https://f2092de2-3c88-49f9-8f7e-c70cb52bf7c2-bluemix:66909f1f607981fca7bf6adc19ab6289ff231cdf563562432b7b9530a2d6ef5b@f2092de2-3c88-49f9-8f7e-c70cb52bf7c2-bluemix.cloudantnosqldb.appdomain.cloud';
    var giver = require('silverlining')(url, 'giver');
    var b = Number(c.aid);
    let a = function(){
      return giver.query({"unique_id": b}).then(token => { return token});
    }
    ;(async() => {

        let userToken = await a();
          if(userToken.length > 0){
            var Cloudant = require('@cloudant/cloudant');
                var cloudant = Cloudant('https://f2092de2-3c88-49f9-8f7e-c70cb52bf7c2-bluemix:66909f1f607981fca7bf6adc19ab6289ff231cdf563562432b7b9530a2d6ef5b@f2092de2-3c88-49f9-8f7e-c70cb52bf7c2-bluemix.cloudantnosqldb.appdomain.cloud');
                var opportunities = cloudant.db.use('opportunities');
                opportunities.insert(c, function(err, body, header){
                  if (err){
                    return console.log('[opportunities].insert]', err.message);
                  }
                  else{
                    return console.log('Data has been uploaded successfully');
                  }
                });
                var unique_numberx = "Thanks for adding a new opportunity";
                res.render("adding_opportunities.ejs", {ejs: unique_numberx});
          }
          else{
            var unique_numberx = "Your Unique Code is WRONG";
            res.render("adding_opportunities.ejs", {ejs: unique_numberx});
          }
    })
  ();
  }
  microservice3(final);
});


//See opportunities//
app.get("/see_opportunity", function(req, res){
  res.sendFile(__dirname + '/webpages/see_opportunity.html');
});

app.post("/see_opportunity", function(req, res){
  state = req.body.states;
  let array = [];
  var url = 'https://f2092de2-3c88-49f9-8f7e-c70cb52bf7c2-bluemix:66909f1f607981fca7bf6adc19ab6289ff231cdf563562432b7b9530a2d6ef5b@f2092de2-3c88-49f9-8f7e-c70cb52bf7c2-bluemix.cloudantnosqldb.appdomain.cloud';
  var oppourtunities = require('silverlining')(url, 'opportunities');
  let a = function(){
    return oppourtunities.query({"astate": state}).then(token => { return token});
  }
  ;(async() => {
      let userToken = await a();
      res.render("see_opportunity.ejs", {y: userToken});
  })
();
});



//Register Opportunities//
let requestedPostId = [];
app.get("/register_opportunity/:pos", function(req, res){
  var id = req.params.pos;
  res.sendFile(__dirname + '/webpages/register_opportunity.html');
  requestedPostId.push(id);
});
app.post("/register_opportunity", function(req, res){
  unique_user = req.body.unique_user;
  var len = requestedPostId.length;
  var fid = requestedPostId[len-2];
  var url = 'https://f2092de2-3c88-49f9-8f7e-c70cb52bf7c2-bluemix:66909f1f607981fca7bf6adc19ab6289ff231cdf563562432b7b9530a2d6ef5b@f2092de2-3c88-49f9-8f7e-c70cb52bf7c2-bluemix.cloudantnosqldb.appdomain.cloud';
  var members = require('silverlining')(url, 'members');
  var b = Number(unique_user);
  let a = function(){
    return members.query({"id": b}).then(token => { return token});
  }
  ;(async() => {

      let userToken = await a();
        if(userToken.length > 0){
          var Cloudant = require('@cloudant/cloudant');
              var cloudant = Cloudant('https://f2092de2-3c88-49f9-8f7e-c70cb52bf7c2-bluemix:66909f1f607981fca7bf6adc19ab6289ff231cdf563562432b7b9530a2d6ef5b@f2092de2-3c88-49f9-8f7e-c70cb52bf7c2-bluemix.cloudantnosqldb.appdomain.cloud');
              var registered = cloudant.db.use('registered');
              var c = {
                "opportunity_uniqueID": fid,
                "registered_userID": b
              }
              registered.insert(c, function(err, body, header){
                if (err){
                  return console.log('[registered].insert]', err.message);
                }
                else{
                  return console.log('Data has been uploaded successfully');
                }
              });
              var unique_numberx = "Thanks for registering for the following opportunity";
              res.render("adding_opportunities.ejs", {ejs: unique_numberx});
        }
        else{
          var unique_numberx = "Your Unique Code is WRONG";
          res.render("adding_opportunities.ejs", {ejs: unique_numberx});
        }
  })
();

});



//Donate opportunity//
let requestedPostIdx = [];
app.get("/donate_opportunity1/:posx", function(req, res){
  var id = req.params.posx;
  res.sendFile(__dirname + '/webpages/donate_opportunity1.html');
  var url = 'https://f2092de2-3c88-49f9-8f7e-c70cb52bf7c2-bluemix:66909f1f607981fca7bf6adc19ab6289ff231cdf563562432b7b9530a2d6ef5b@f2092de2-3c88-49f9-8f7e-c70cb52bf7c2-bluemix.cloudantnosqldb.appdomain.cloud';
  var opportunities = require('silverlining')(url, 'opportunities');
  var b = Number(id);
  let ax = function(){
    return opportunities.query({"unique_id_opp": b}).then(token => { return token});
  }
  ;(async() => {
      try{
        let userToken = await ax();
        let x = await userToken[0].ano;
        requestedPostIdx.push(x);
        console.log(x);
      }
      catch (error) {
        console.log('That did not go well.')
        throw error
}

  })
();
});

app.post("/donate_opportunity1", function(req, res){
  unique_user = req.body.unique_user;
  // var len = requestedPostIdx.length;
  // var fid = requestedPostIdx[len-1];
  var url = 'https://f2092de2-3c88-49f9-8f7e-c70cb52bf7c2-bluemix:66909f1f607981fca7bf6adc19ab6289ff231cdf563562432b7b9530a2d6ef5b@f2092de2-3c88-49f9-8f7e-c70cb52bf7c2-bluemix.cloudantnosqldb.appdomain.cloud';
  var members = require('silverlining')(url, 'members');
  var b = Number(unique_user);
  let a = function(){
    return members.query({"id": b}).then(token => { return token});
  }
  ;(async() => {
      let userToken = await a();
        if(userToken.length > 0){
          res.redirect("/donate_opportunity2");
          // res.render("donate_opportunity2.ejs", {xacc: fid});
        }
        else{
          var unique_numberx = "Your Unique Code is WRONG";
          res.render("adding_opportunities.ejs", {ejs: unique_numberx});
        }
  })
();

});
app.get("/donate_opportunity2", function(req, res){
  var len = requestedPostIdx.length;
  var fid = requestedPostIdx[len-1];
  res.render("donate_opportunity2.ejs", {xacc: fid});
});
app.post("/donate_opportunity2", function(req, res){
  var firstname = req.body.firstname;
  var email = req.body.email;
  var address = req.body.address;
  var city = req.body.city;
  var state = req.body.state;
  var zip = req.body.zip;
  var cardname = req.body.cardname;
  var cardnumber = req.body.cardnumber;
  var expmonth = req.body.expmonth;
  var expyear = req.body.expyear;
  var cvv = req.body.cvv;
  var price = req.body.price;
  var len = requestedPostIdx.length;
  var fid = requestedPostIdx[len-1];
  var c = {
    "firstname": firstname,
    "email": email,
    "address": address,
    "city": city,
    "state": state,
    "zip": zip,
    "cardname": cardname,
    "cardnumber": cardnumber,
    "expmonth": expmonth,
    "expyear": expyear,
    "cvv": cvv,
    "price": price,
    "Account_of_NGO": fid
  }
  var Cloudant = require('@cloudant/cloudant');
      var cloudant = Cloudant('https://f2092de2-3c88-49f9-8f7e-c70cb52bf7c2-bluemix:66909f1f607981fca7bf6adc19ab6289ff231cdf563562432b7b9530a2d6ef5b@f2092de2-3c88-49f9-8f7e-c70cb52bf7c2-bluemix.cloudantnosqldb.appdomain.cloud');
      var donation = cloudant.db.use('donation');
      donation.insert(c, function(err, body, header){
        if (err){
          return console.log('[donation].insert]', err.message);
        }
        else{
          return console.log('Data has been uploaded successfully');
        }
      });
      var unique_numberx = "Thanks for Donating Money to the NGO. God Bless You";
      res.render("adding_opportunities.ejs", {ejs: unique_numberx});
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
