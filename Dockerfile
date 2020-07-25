FROM node

WORKDIR /app
COPY . /app
RUN npm install
RUN npm install -g expo-cli

EXPOSE 3007
EXPOSE 3008

#ENV REACT\_NATIVE\_PACKAGER\_HOSTNAME="192.168.31.15"
ENV REACT\_NATIVE\_PACKAGER\_HOSTNAME="agrogest-embrapa.ddns.net"

CMD ["npm", "start"]
