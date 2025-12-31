module.exports = {
    apps: [
        {
            name: "medusa-backend",
            cwd: "./backend",
            script: "npm",
            args: "run start",
            env: {
                NODE_ENV: "production",
                PORT: 9000
            }
        },
        {
            name: "medusa-storefront",
            cwd: "./storefront",
            script: "npm",
            args: "run start",
            env: {
                NODE_ENV: "production",
                PORT: 8000
            }
        }
    ]
};
