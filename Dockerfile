FROM node:21-alpine3.18

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json before other files for better cache utilisation
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

