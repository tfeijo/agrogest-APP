FROM node

WORKDIR /app
COPY package*.json ./
RUN npm install -g expo-cli
RUN npm install
COPY . /app

EXPOSE 3002
EXPOSE 3003

ENV REACT\_NATIVE\_PACKAGER\_HOSTNAME="192.168.31.15"

CMD ["npm", "start"]