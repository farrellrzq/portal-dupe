module.exports = {
  apps: [
    {
      name: "portal-opd-depok-2024",
      script: "npm",
      args: "start",
      watch: false,
      env: {
        NODE_ENV: "production",
	PORT: 3090,
      },
      instances: "max",
      exec_mode: "cluster",
      max_memory_restart: "800M",
      cwd: "/root/portal-opd-depok-2024/"
    },
  ],
};
