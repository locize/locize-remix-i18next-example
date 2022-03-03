# locize example: remix-i18next

## What is this?

This is a simple example of how to use [remix-i18next](https://github.com/sergiodxa/remix-i18next) with [Remix](https://remix.run) and [locize](https://locize.com) to get translations up and running quickly and easily.

This is the example app used in [this blog post](https://www.locize.com/blog/remix-i18n/).

## For more info...

You may have arrived here from the [Remix](https://github.com/remix-run/remix) repository, or the [react-i18next](https://github.com/i18next/react-i18next/) repository. Either way, for more documentation, please visit the [main README](https://github.com/sergiodxa/remix-i18next).


## How to integrate locize

Since Remix apps are usually deployed on serverless environments, we will use the [i18next-locize-backend plugin](https://github.com/locize/i18next-locize-backend) only on client side.

Instead on server side we'll "bundle" the translations first.
See [downloadLocales script in package.json](https://github.com/locize/locize-remix-i18next-example/blob/main/package.json#L34).
We're doing so to prevent an elevated amount of downloads. [Read this](https://github.com/locize/i18next-locize-backend#important-advice-for-serverless-environments---aws-lambda-google-cloud-functions-azure-functions-etc) for more information about this topic about serverless environments.

Before "deploying" your app, you can run the [downloadLocales script](https://github.com/locize/locize-remix-i18next-example/blob/main/package.json#L34) (or similar), which will use the [cli](https://github.com/locize/locize-cli) to download the translations from locize into the appropriate folder remix-i18next is looking in to (i.e. ./public/locales).
This way the translations are bundled in your app and on server side you will not generate any downloads to the [locize CDN](https://docs.locize.com/whats-inside/cdn-content-delivery-network) during runtime, but just on client side.

