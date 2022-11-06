const { UMI_APP_DEV_CONTAINER = 'production' } = process.env;

module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
    // ...(UMI_APP_DEV_CONTAINER === 'dev' ? require('./env-dev') : {}),
    // ...(UMI_APP_DEV_CONTAINER === 'dev_prop' ? require('./env-dev-prop') : {}),
  },
};
