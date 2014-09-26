
// Please add the email address "mrpotatohead@mongodb.com" to the list of
// addresses in the "headers.To" array for the document with
// "headers.Message-ID" of "<8147308.1075851042335.JavaMail.evans@thyme>"

use enron;

var mesg_id = { "headers.Message-ID": "<8147308.1075851042335.JavaMail.evans@thyme>" };

db.messages.update(mesg_id,
  { $addToSet: { "headers.To": "mrpotatohead@mongodb.com" } }
)

// to check:
// db.messages.find(mesg_id).pretty()

