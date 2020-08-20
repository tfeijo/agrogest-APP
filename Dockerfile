FROM node

WORKDIR /app
COPY . /app
RUN npm install
RUN npm install -g expo-cli

EXPOSE 3002
EXPOSE 3003

ENV REACT\_NATIVE\_PACKAGER\_HOSTNAME="192.168.31.15" 
# 200.131.52.32

CMD ["expo", "start"]
