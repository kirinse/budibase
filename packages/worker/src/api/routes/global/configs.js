const Router = require("@koa/router")
const controller = require("../../controllers/global/configs")
const { joiValidator } = require("@budibase/backend-core/auth")
const { adminOnly } = require("@budibase/backend-core/auth")
const Joi = require("joi")
const { Configs } = require("../../../constants")

const router = Router()

function smtpValidation() {
  // prettier-ignore
  return Joi.object({
    port: Joi.number().required(),
    host: Joi.string().required(),
    from: Joi.string().email().required(),
    secure: Joi.boolean().optional(),
    auth: Joi.object({
      type: Joi.string().valid("login", "oauth2", null),
      user: Joi.string().required(),
      pass: Joi.string().allow("", null),
    }).optional(),
  }).unknown(true)
}

function settingValidation() {
  // prettier-ignore
  return Joi.object({
    platformUrl: Joi.string().optional(),
    logoUrl: Joi.string().optional().allow("", null),
    docsUrl: Joi.string().optional(),
    company: Joi.string().required(),
  }).unknown(true)
}

function googleValidation() {
  // prettier-ignore
  return Joi.object({
    clientID: Joi.string().required(),
    clientSecret: Joi.string().required(),
    activated: Joi.boolean().required(),
  }).unknown(true)
}

function oidcValidation() {
  // prettier-ignore
  return Joi.object({
    configs: Joi.array().items(
      Joi.object({
        clientID: Joi.string().required(),
        clientSecret: Joi.string().required(),
        configUrl: Joi.string().required(),
        logo: Joi.string().allow("", null),
        name: Joi.string().allow("", null),
        uuid: Joi.string().required(),
        activated: Joi.boolean().required(),
      })
    ).required(true)
  }).unknown(true)
}

function buildConfigSaveValidation() {
  // prettier-ignore
  return joiValidator.body(Joi.object({
    _id: Joi.string().optional(),
    _rev: Joi.string().optional(),
    workspace: Joi.string().optional(),
    type: Joi.string().valid(...Object.values(Configs)).required(),
    createdAt: Joi.string().optional(),
    updatedAt: Joi.string().optional(),
    config: Joi.alternatives()
      .conditional("type", {
        switch: [
          { is: Configs.SMTP, then: smtpValidation() },
          { is: Configs.SETTINGS, then: settingValidation() },
          { is: Configs.ACCOUNT, then: Joi.object().unknown(true) },
          { is: Configs.GOOGLE, then: googleValidation() },
          { is: Configs.OIDC, then: oidcValidation() }
        ],
      }),
  }).required().unknown(true),
  )
}

function buildUploadValidation() {
  // prettier-ignore
  return joiValidator.params(Joi.object({
    type: Joi.string().valid(...Object.values(Configs)).required(),
    name: Joi.string().required(),
  }).required().unknown(true))
}

function buildConfigGetValidation() {
  // prettier-ignore
  return joiValidator.params(Joi.object({
    type: Joi.string().valid(...Object.values(Configs)).required()
  }).required().unknown(true))
}

router
  .post(
    "/api/global/configs",
    adminOnly,
    buildConfigSaveValidation(),
    controller.save
  )
  .delete("/api/global/configs/:id/:rev", adminOnly, controller.destroy)
  .get("/api/global/configs", controller.fetch)
  .get("/api/global/configs/checklist", controller.configChecklist)
  .get(
    "/api/global/configs/all/:type",
    buildConfigGetValidation(),
    controller.fetch
  )
  .get("/api/global/configs/public", controller.publicSettings)
  .get("/api/global/configs/public/oidc", controller.publicOidc)
  .get("/api/global/configs/:type", buildConfigGetValidation(), controller.find)
  .post(
    "/api/global/configs/upload/:type/:name",
    adminOnly,
    buildUploadValidation(),
    controller.upload
  )

module.exports = router
