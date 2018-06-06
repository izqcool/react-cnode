import * as _ from 'lodash';
import superagent from 'superagent';
import Promise from 'bluebird';
import NProgress from 'nprogress';

// http://bluebirdjs.com/docs/api/promise.config.html
Promise.config({
    // Enable cancellation
    cancellation: true
});

export class Http {
    formatUrl(path) {
        const adjustedPath = path[0] !== '/' ? `/${path}` : path;
        console.log(adjustedPath);
        const beginWith = adjustedPath.split('/')[1];

        if (__DEVELOPMENT__ && !_.includes(['assets'], beginWith)) { // eslint-disable-line no-undef
            // Prepend `/api` to relative URL, to proxy to API server.
            return `https://cnodejs.org/api/v1${adjustedPath}`;
        } else {
            return `https://cnodejs.org/api/v1${adjustedPath}`;
        }


    }

    onCancel(req) {
        req.abort();
        NProgress.done();
    }

    constructor(showProgress = true) {
        ['get', 'post', 'put', 'patch', 'delete'].forEach((method) => {
            this[method] = (path, {params, data, form} = {}) => {
                const promise = new Promise((resolve, reject, onCancel) => {
                    const request = superagent[method](this.formatUrl(path));

                    if (params) {
                        request.query(params);
                    }

                    if (data) {
                        request.send(data);
                    }

                    if (form) {
                        request.send(form);
                        request.set('Content-Type', 'application/x-www-form-urlencoded');
                    }

                    if (showProgress) {
                        NProgress.start();
                    }


                    request.end((err, {body} = {}) => {
                        if (showProgress) {
                            NProgress.done();
                        }
                        if (err) {
                            return reject(body || err);
                        } else {
                            return resolve(body);
                        }
                    });

                    onCancel(() => this.onCancel(request));
                });
                promise._id = +_.uniqueId();
                return promise;
            };
        });
    }

}
