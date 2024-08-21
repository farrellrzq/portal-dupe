module.exports = {
  apps: [
    {
      name: "portal-opd-depok-2024",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
      instances: "max",
      exec_mode: "cluster",
      max_memory_restart: "1G",
    },
  ],
};
