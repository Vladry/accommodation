
#https://docs.docker.com/samples/postgresql_service/
#FROM ubuntu:16.04
#
## Add PostgreSQL's repository. It contains the most recent stable release of PostgreSQL.
#RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main" > /etc/apt/sources.list.d/pgdg.list
#
## Create a PostgreSQL role named ``accommod`` with ``accommod`` as the password and
## then create a database `accommod` owned by the ``accommod`` role.
## Note: here we use ``&&\`` to run commands one after the other - the ``\``
##       allows the RUN command to span multiple lines.
#RUN    /etc/init.d/postgresql start &&\
#    psql --command "CREATE USER docker WITH SUPERUSER PASSWORD 'docker';" &&\
#    createdb -O accommod accommod
#
## Expose the PostgreSQL port
#EXPOSE 5432
#


#https://hub.docker.com/_/rabbitmq
FROM rabbitmq:3.10-management
# docker pull rabbitmq:3.10-management
#docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.10-management
#подключение:   localhost:15672 ,guest/guest

# or:
RUN rabbitmq-plugins enable --offline rabbitmq_web_stomp

    docker build -t rabbitmq:official-alpine-with-webstomp rabbitmq/
docker run -d --hostname rabbitmq --name rabbitmq -p 15674:15674 rabbitmq:official-alpine-with-webstomp

EXPOSE 15674