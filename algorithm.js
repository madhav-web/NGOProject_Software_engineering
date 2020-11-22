

// Algorithm of the website once url is opened //
// Register as a user //
START()

var INPUT fname;
var INPUT lname;
var INPUT city;
var INPUT state;
var INPUT pin;
var INPUT email;
var INPUT phone;
var INPUT unique_number;

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

  if (user clicks submit button){
    insert.db.database.members(final);
  }
  else{
    return to homepage;
  }

END()



START()

var INPUT ofname;
var INPUT oname;
var INPUT ocity;
var INPUT ostate;
var INPUT oyear;
var INPUT oemail;
var INPUT ophone;
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
  if (user clicks submit button){
    insert.db.database.giver(final);
  }
  else{
    return to homepage;
  }

  END()





  START()

SELECT OPPORTUNITY;
if( submit == donate){
  var INPUT firstname = req.body.firstname;
  var INPUT email = req.body.email;
  var INPUT address = req.body.address;
  var INPUT city = req.body.city;
  var INPUT state = req.body.state;
  var INPUT zip = req.body.zip;
  var INPUT cardname = req.body.cardname;
  var INPUT cardnumber = req.body.cardnumber;
  var INPUT expmonth = req.body.expmonth;
  var INPUT expyear = req.body.expyear;
  var INPUT cvv = req.body.cvv;
  var INPUT  price = req.body.price;
  var INPUT len = requestedPostIdx.length;
  var INPUT fid = requestedPostIdx[len-1];
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
  insert.db.database.donate(c);
}
if (submit == register){
  var INPUT unique_code;
  var x = search.db.database.members(unique_code);
  if(x = NULL){
    return to homepage
  }
  else{
    add.db.database.members.registered(unique_code);
  }
}
END()
