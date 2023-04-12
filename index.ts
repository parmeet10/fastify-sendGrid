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
  name: "fastify/sendgrid",
});

export default fastifySendgrid;
