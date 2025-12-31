import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: {
      ssl: { rejectUnauthorized: false },
    },
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: {
    payment: {
      resolve: "@medusajs/payment",
      options: {
        providers: [
          {
            resolve: "./src/modules/safepay",
            id: "safepay",
            options: {
              apiKey: process.env.SAFEPAY_API_KEY,
              secretKey: process.env.SAFEPAY_SECRET_KEY,
              sandbox: true,
            },
          },
        ],
      },
    },
    notification: {
      resolve: "@medusajs/notification",
      options: {
        providers: [
          {
            resolve: "./src/modules/brevo",
            id: "brevo",
            options: {
              apiKey: process.env.BREVO_API_KEY,
              fromEmail: process.env.BREVO_FROM_EMAIL,
              fromName: process.env.BREVO_FROM_NAME || "Intima Lustre",
              channels: ["email"],
            },
          },
        ],
      },
    },
  }
})
