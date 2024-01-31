FROM node:14

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY src/package*.json ./
RUN npm install

COPY src/ .

EXPOSE 3000

CMD ["node", "index.js"]