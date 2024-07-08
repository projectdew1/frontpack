# สเตจแรก: Builder
FROM node:20-alpine as builder

# คัดลอก package.json และ package-lock.json ไปยังไดเรกทอรีทำงาน
COPY package.json package-lock.json ./

# Install the dependencies and make the folder
RUN npm install && mkdir /packing && mv ./node_modules ./packing

WORKDIR /packing

COPY . .

# Build the project and copy the files
RUN npm run build


FROM nginx:alpine

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## ssl สร้างโฟร์เดอร์และย้ายไฟล์ไปเซิฟเวอร์
RUN mkdir /etc/nginx/ssl 
COPY ./SSL/cert.crt /etc/nginx/ssl/cert.crt
COPY ./SSL/private-key.key /etc/nginx/ssl/private-key.key

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
# COPY --from=builder /packing/out /usr/share/nginx/html

# คัดลอกไฟล์จากสเตจ builder ไปยังไดเรกทอรีที่ nginx ใช้ chatGPT
COPY --from=builder /packing/.next /usr/share/nginx/html
COPY --from=builder /packing/public /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]