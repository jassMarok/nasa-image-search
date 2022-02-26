# API Readme

## Setup

- run `yarn install` to install dependencies
- start server for local development with `yarn dev`

## API Assumptions

- Nasa image api always return `data`,`links` and `href` at index `0`
- Incase `description` is not available, fallback to `description_508`
- Incase image `href` is not available, fallback to `https://i.imgur.com/1LsxTQI.png`
- Any other case when text not available fallback to `N/A`

## Build patched errors

- working with node v16.* a known typescript build issue occured and was patched see details at [Axios Issue](https://github.com/axios/axios/issues/4124), patched via adding `DOM` to `lib` in `tsconfig.json`
