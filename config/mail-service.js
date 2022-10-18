import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  auth: {
    user: "postmaster@results.oladelegroupofschools.com",
    pass: "58faeb2f856351d72c232474d7894569-18e06deb-a6f0bb78",
  },
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
