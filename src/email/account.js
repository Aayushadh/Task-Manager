const mailjet = require('node-mailjet')
  .connect(process.env.MAILJET_API_KEY, process.env.MAILJET_API_SECRET)
const request1 = mailjet
  .post("send", {
    'version': 'v3.1'
  })

const welcomeMsg = (name, email) => {
  request1.request({
    "Messages": [{
      "From": {
        "Email": "ayushharwani2011@gmail.com",
        "Name": "Aayush"
      },
      "To": [{
        "Email": email,
        "Name": name
      }],
      "Subject": "Welcome to Task-Manager",
      "TextPart": "My first Mailjet email",
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      "CustomID": "AppGettingStartedTest"
    }]
  });
};

const deleteMsg = (name, email) => {
  request1.request({
    "Messages": [{
      "From": {
        "Email": "ayushharwani2011@gmail.com",
        "Name": "Aayush"
      },
      "To": [{
        "Email": email,
        "Name": name
      }],
      "Subject": "Your account has been deactivated successfully",
      "TextPart": "Give us feedback so we can improve",
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      "CustomID": "AppGettingStartedTest"
    }]
  });
}
// request
//   .then((result) => {
//     console.log(result.body)
//   })
//   .catch((err) => {
//     console.log(err.statusCode)
//   })

module.exports = {
  welcomeMsg,
  deleteMsg
};