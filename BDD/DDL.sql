DROP DATABASE IF EXISTS PRACTICA_SEMI;
CREATE DATABASE PRACTICA_SEMI;
USE PRACTICA_SEMI;

CREATE TABLE USUARIO (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    NOMBRE VARCHAR(50) NOT NULL,
    APELLIDO VARCHAR(50) NOT NULL,
    FOTO VARCHAR(250) NOT NULL,
    CORREO VARCHAR(250) NOT NULL UNIQUE,
    PASSWORD VARCHAR(250) NOT NULL,
    FECHA_NACIMIENTO DATE NOT NULL
);

CREATE TABLE CANCION (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    NOMBRE VARCHAR(50) NOT NULL,
    CANCION VARCHAR(250) NOT NULL,
    IMAGEN VARCHAR(250) NOT NULL,
    DURACION INT NOT NULL,
    ARTISTA VARCHAR(50) NOT NULL
);

CREATE TABLE FAVORITO (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ID_USUARIO INT NOT NULL,
    ID_CANCION INT NOT NULL,
    FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO(ID),
    FOREIGN KEY (ID_CANCION) REFERENCES CANCION(ID)
);

CREATE TABLE PLAYLIST (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    NOMBRE VARCHAR(50) NOT NULL,
    DESCRIPCION VARCHAR(250),
    PORTADA VARCHAR(250) NOT NULL,
    ID_USUARIO INT NOT NULL,
    FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO(ID)
);

CREATE TABLE PLAYLIST_CANCION (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ID_PLAYLIST INT NOT NULL,
    ID_CANCION INT NOT NULL,
    FOREIGN KEY (ID_PLAYLIST) REFERENCES PLAYLIST(ID),
    FOREIGN KEY (ID_CANCION) REFERENCES CANCION(ID)
);