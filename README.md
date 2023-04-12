# fastify-mail


## Install
```
npm i @fastify/sendgrid --save
```
```
yarn add @fastify/sendgrid
```

## Usage
you can refer the below example to implement
You can access  via `fastify.sendgrid` and *send()* via `fastify.sendgrid.send()`. and `reply.sendgrid.send()`.

```js
import fastify from 'fastify'
import sendgrid from '@sendgrid/mail';
import sendGridPlugin from '@fasitfy/sendgrid';

declare module 'fastify' {
  interface FastifyInstance {
    sendgrid: sendgrid.MailService;
  }
  interface FastifyReply {
    sendgrid: sendgrid.MailService;
  }
}

server.register(sendGridPlugin, {
    apiKey: `${process.env.SENDGRID_API_KEY}`,
  });
fastify.get("/sendmail", (req, res) => {
  let recieverEmail = req.query.email; // validate email

  const msg = {
    to: recieverEmail,
    from: "example@gmail.com", // must be verified on sendGrid
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

fastify.listen(3000, err => {
  if (err) {
      throw err;
      process.exit(1);
  }
  console.log(`fastify server started}`)
})
```