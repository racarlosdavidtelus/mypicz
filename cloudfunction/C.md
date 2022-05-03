# Comando para crear la instancia de MySQL
gcloud sql instances create mypicz-db \
   --database-version=MYSQL_5_7 --cpu=1 --memory=3.75GB \
   --region=us-central1 --root-password=p2sswrd123Delta

gcloud sql instances create mypicz-db \
--database-version=MYSQL_5_7 --tier=db-g1-small \
--region=us-central1 --root-password=p2sswrd123Delta

# Comando para crear un usuario
gcloud sql users create carlosdavid --host=% \
   --instance=mypicz-db --password=foxtrot321S3cr3t

# Comando para ver info de la instacia
gcloud sql instances describe mypicz

# Comando preparacion de la funcion
mkdir cloudfunction
cd function
touch index.js
npm init
npm install escape-html
npm install @google-cloud/functions-framework
npm install mysql
npm install dotenv

# Comando para realizar el despligue de la cloud function
gcloud functions deploy userHttp --runtime nodejs16 --trigger-http --allow-unauthenticated --security-level=secure-optional --set-env-vars MYSQL_HOST=,MYSQL_USER=,MYSQL_PASSWORD=,MYSQL_DATABASE=

gcloud functions deploy albumsAndPhotosHttp --runtime nodejs16 --trigger-http --allow-unauthenticated --security-level=secure-optional --set-env-vars MYSQL_HOST=,MYSQL_USER=,MYSQL_PASSWORD=,MYSQL_DATABASE=

gcloud functions add-iam-policy-binding userHttp \
 --member="allUsers" \
 --role="roles/cloudfunctions.invoker"
# Comando para crear el bucket 
gsutil mb gs://mypicz-storage

# Subir files al bucket
npm install @google-cloud/storage

# PARA SABER LA ARQUITECTURA DE LA MAC
getconf LONG_BIT 

us-central1-c


# APP engine deploy
git clone https://github.com/racarlosdavidtelus/mypicz
cd profile-frontend
npm i
npm run build
gcloud app deploy

git pull 
npm run build
gcloud app deploy

# Comando para crear la VM 1
gcloud compute instances create app1 \
    --image-family ubuntu-pro-1804-lts \
    --image-project ubuntu-os-pro-cloud \
    --tags webapp \
    --metadata startup-script="#! /bin/bash
        sudo apt update -y; 
        sudo apt install docker.io -y; 
        sudo chmod 666 /var/run/docker.sock; 
        docker network create mysupernetwork

        docker run -d -p 3306:3306 --name mysql --network mysupernetwork racarlosdavid/mysql_gcpf_tarea3

        docker run -d -p 80:2000 --name api_gcpf_tarea4 racarlosdavid/api_gcpf_tarea4
    "


# REFERENCIAS
https://cloud.google.com/sql/docs/mysql/create-instance?hl=es-419#gcloud

https://cloud.google.com/storage/docs/uploading-objects#storage-upload-object-nodejs

https://cloud.google.com/docs/authentication/getting-started#linux-or-macos
