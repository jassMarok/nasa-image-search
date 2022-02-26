# API Readme

## Setup

- run `yarn install` to install dependencies
- start server for local development with `yarn dev`

## API Assumptions

- Nasa image api always return `data`,`links` and `href` at index `0`
- Incase `description` is not available, fallback to `description_508`
- Incase image `href` is not available, fallback to `https://i.imgur.com/1LsxTQI.png`
- Any other case when text not available fallback to `N/A`
