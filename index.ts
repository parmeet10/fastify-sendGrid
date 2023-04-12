import { FastifyPluginCallback, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";
import sendgrid, { MailService } from "@sendgrid/mail";

interface SendgridPluginOptions extends FastifyPluginOptions {
  apiKey: string;
}

const sendgridPlugin: FastifyPluginCallback<SendgridPluginOptions> = (
  fastify,
  options,
  done
) => {
  if (fastify.sendgrid) {
    return done(new Error("fastify-sendgrid declared"));
  }

  sendgrid.setApiKey(options.apiKey);

  fastify.decorate("sendgrid", sendgrid);

  done();
};

const fastifySendgrid = fp(sendgridPlugin, {
  fastify: "4.x",
  name: "@fastify/sendgrid",
});

export default fastifySendgrid;

fastify.get("/sendmail", (req, res) => {
  let recieverEmail = req.query.email; // validate email

  const msg = {
    to: recieverEmail,
    from: "example@gmail.com", // must be verified
    subject: "Sending with Twilio SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  try {
    sendgrid.send(msg).then(() => console.log("email sent successfully"));
  } catch (err) {
    console.error(err);
  }
});
