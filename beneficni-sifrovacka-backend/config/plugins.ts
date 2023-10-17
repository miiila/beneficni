export default ({ env }) => ({
  upload: {
    config: {
      providerOptions: {
        localServer: {
          maxage: 300000
        },
      },
    },
  },
  'import-export-entries': {
    enabled: true,
  },
});
