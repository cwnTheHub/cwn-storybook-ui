FROM node:18-alpine

WORKDIR /nds_core/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 1001

CMD ["npm", "run", "storybook"]
