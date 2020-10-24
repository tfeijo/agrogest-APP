FROM node

WORKDIR /app
COPY . /app
RUN npm install expo-cli --global
RUN npm install

EXPOSE 3002
EXPOSE 3003

ENV REACT\_NATIVE\_PACKAGER\_HOSTNAME="192.168.29.72" 
# 200.131.52.32

CMD ["expo", "start"]
