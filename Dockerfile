FROM node:18-alpine

ENV PORT 1001

COPY package.json /nds_core/
COPY . /nds_core/

WORKDIR /nds_core

RUN npm install

RUN npm run storybook

