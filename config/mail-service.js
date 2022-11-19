import nodemailer from "nodemailer";"use strict";


// async function main() {

// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//       user: 'oladelegroupofschools@gmail.com',
//       pass: 'zvqjcnxtoriplwhk'
//   }
// });




// let info = await transporter.sendMail({
//   from: '"Fred Foo 👻" <dareowonibisamuel@gmail.com>', // sender address
//   to: "dareowonibisamuel@gmail.com, samuelbibilade@gmail.com", // list of receivers
//   subject: "Hello ✔", // Subject line
//   text: "Hello world?", // plain text body
//   html: "<b>Hello world?</b>", // html body
// });
// ''
// console.log("Message sent: %s", info.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// Preview only available when sending through an Ethereal account
// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);





let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'oladelegroupofschools@gmail.com',
      pass: 'zvqjcnxtoriplwhk'
  }
});

export const sendMail = (
  senderMail,
  recieverMail,
  subject,
  text,
  name,
  body,
  cb
) => {
  const mailOptions = {
    from: senderMail,
    to: recieverMail,
    subject: subject,
    text: text,
    html: `
          <style>
          @import url(//db.onlinewebfonts.com/c/7bd7f049ab12f7efc10d48e5fa57a618?family=MijaW03-Bold);
          div{
            font-family: MijaW03-Bold;
          }
          </style>
          <div style="background-color: #150845; color: white;width: 100%; margin: auto; padding: 10px;">
                          <div style="font-weight: 700; margin: auto;  width: 100%; font-size: 1.8rem; display:flex; flex-direction: column; align-items: space-between; justify-content: center">
                              <img src="https://firebasestorage.googleapis.com/v0/b/file-uploads-55ed9.appspot.com/o/Sun%20Nov%2001%202020%2022%3A39%3A57%20GMT%2B0100%20(West%20Africa%20Standard%20Time)-Logo.png?alt=media&token=f4eebe02-77eb-46fd-8f73-5a43352e8e6d"
                               height="50px" width="50px" style="float: left; font-weight: 700"/>
                               <span style="color: #dbb921;"><b>OLADELE GROUP OF SCHOOLS</b></span>

                          </div>
                          <br/><br/>
                          <hr/>
                          <p style="font-size: 1.2rem; font-weight: 700">${text} <span style="font-size: 3rem; float: right">🎉🎉🎉</span></p><br/><br/>
                          <p>
                             ${body}

                          </p><br/><br/>
                          <p>OGS | In God we trust! </p><br/>
                          <p><small><i>Powered by Sammysofts 2022 🤓</i></small></p>
                      </div>
                          `,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};
