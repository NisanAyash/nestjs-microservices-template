import * as Joi from 'joi';

export const envSchema = Joi.object({
  API_GATEWAY_PORT: Joi.number().required(),
  AUTH_SERVICE_PORT: Joi.number().required(),
  AUTH_SERVICE_HOST: Joi.string().required(),
});
