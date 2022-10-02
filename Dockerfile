FROM node:16

WORKDIR /app

COPY . .

RUN npm ci
RUN npx prisma generate
RUN npm run build

ENV NODE_ENV production

EXPOSE 4444

CMD [ "node", "./build/index.js" ]