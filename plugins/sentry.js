export default ({app}) => {
    if (!app.nuxt || !app.$sentry) return false;

    const errorHandler = err => {
        console.log(err);
        app.$sentry.captureException(new Error(JSON.stringify(err)));
    };
};
