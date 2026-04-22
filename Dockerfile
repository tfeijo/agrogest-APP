FROM node:12

WORKDIR /app
COPY . /app
RUN npm install expo-cli --global
RUN npm install

EXPOSE 3002
EXPOSE 3003

# Override at build/run time (docker run -e REACT_NATIVE_PACKAGER_HOSTNAME=...)
ARG PACKAGER_HOSTNAME=127.0.0.1
ENV REACT_NATIVE_PACKAGER_HOSTNAME=${PACKAGER_HOSTNAME}

CMD ["expo", "start"]
