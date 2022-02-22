# locize example: remix-i18next

## What is this?

This is a simple example of how to use [remix-i18next](https://github.com/sergiodxa/remix-i18next) with [Remix](https://remix.run) and [locize](https://locize.com) to get translations up and running quickly and easily.

## For more info...

You may have arrived here from the [Remix](https://github.com/remix-run/remix) repository, or the [react-i18next](https://github.com/i18next/react-i18next/) repository. Either way, for more documentation, please visit the [main README](https://github.com/sergiodxa/remix-i18next).


## How to integrate locize

locize normally offers a special [i18next backend plugin](https://github.com/locize/i18next-locize-backend) to integrate with i18next setups.
Since remix-i18next does not use the backend capability of i18next, but uses a custom backend logic, we are not going to use the i18next-locize-backend, like described [in this comment](https://github.com/locize/locize-remix-i18next-example/blob/main/app/i18n.server.js#L6).

Instead we'll "bundle" the translations first.
See [downloadLocales script in package.json](https://github.com/locize/locize-remix-i18next-example/blob/main/package.json#L30).

Before "deploying" your app, you can run the [downloadLocales script](https://github.com/locize/locize-remix-i18next-example/blob/main/package.json#L30) (or similar), which will use the [cli](https://github.com/locize/locize-cli) to download the translations from locize into the appropriate folder remix-i18next is looking in to (i.e. ./public/locales).
This way the translations are bundled in your app and you will not generate any downloads to the [locize CDN](https://docs.locize.com/whats-inside/cdn-content-delivery-network) during runtime.
