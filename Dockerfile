FROM node:12

WORKDIR /app
COPY . /app
RUN npm install expo-cli --global
RUN npm install

EXPOSE 3002
EXPOSE 3003

ENV REACT\_NATIVE\_PACKAGER\_HOSTNAME="192.168.31.106" 
# 200.131.52.32

CMD ["expo", "start"]
