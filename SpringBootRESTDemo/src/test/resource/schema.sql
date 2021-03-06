CREATE TABLE MSI_PRODUCT (
ID NUMBER(10,0) NOT NULL AUTO_INCREMENT,
NAME VARCHAR2(255) DEFAULT NULL,
BRAND VARCHAR2(255) DEFAULT NULL,
PRICE NUMBER DEFAULT NULL,
STOCK NUMBER DEFAULT NULL,
IMAGE VARCHAR2(255) DEFAULT NULL,
PRIMARY KEY (ID));

CREATE SEQUENCE MSI_PRODUCT_SEQ
  MINVALUE 1
  MAXVALUE 9999999999999999
  START WITH 1
  INCREMENT BY 100
  CACHE 100;