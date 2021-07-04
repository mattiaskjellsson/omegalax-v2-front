# pull official base image
FROM node:16-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./
RUN yarn --frozen-lockfile
RUN yarn global add react-scripts

COPY . ./

CMD ["yarn", "start"]