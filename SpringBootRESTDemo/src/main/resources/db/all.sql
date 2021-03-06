--------------------------------------------------------
--  File created - Sunday-November-12-2017   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table MSI_USER
--------------------------------------------------------

  CREATE TABLE "MSI_USER" 
   (	"USERNAME" VARCHAR2(100 BYTE), 
	"PASSWORD" VARCHAR2(100 BYTE), 
	"ID" NUMBER
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Sequence MSI_USER_SEQ
--------------------------------------------------------

   CREATE SEQUENCE  "MSI_USER_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE ;
REM INSERTING into MSI_USER
SET DEFINE OFF;
Insert into MSI_USER (USERNAME,PASSWORD,ID) values ('bob','$2a$11$q1sf5mUd1XwOmn6JQu6Zme0vs.ovSe2wU8TqlCFkcpOs89RUgObXG',1);
Insert into MSI_USER (USERNAME,PASSWORD,ID) values ('admin','$2a$11$MUm8qXqbWK0F3NqPoZzGme7lsCzuj7gROE5PWpqjwQ/1p7czRx3Ae',2);
Insert into MSI_USER (USERNAME,PASSWORD,ID) values ('user','$2a$11$GFOqKK8jG3xG0aM4pOHjr.V3pa504tSDUAu6sm6sfFH3vegtEqfcS',3);
--------------------------------------------------------
--  DDL for Index MSI_USER_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MSI_USER_PK" ON "MSI_USER" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index MSI_USER_UK1
--------------------------------------------------------

  CREATE UNIQUE INDEX "MSI_USER_UK1" ON "MSI_USER" ("USERNAME") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Trigger MSI_USER_TRG
--------------------------------------------------------

  CREATE OR REPLACE TRIGGER "MSI_USER_TRG" 
BEFORE INSERT ON MSI_USER 
FOR EACH ROW 
BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    IF INSERTING AND :NEW.USERNAME IS NULL THEN
      SELECT MSI_USER_SEQ.NEXTVAL INTO :NEW.USERNAME FROM SYS.DUAL;
    END IF;
    IF INSERTING AND :NEW.ID IS NULL THEN
      SELECT MSI_USER_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
  END COLUMN_SEQUENCES;
END;
/
ALTER TRIGGER "MSI_USER_TRG" ENABLE;
--------------------------------------------------------
--  Constraints for Table MSI_USER
--------------------------------------------------------

  ALTER TABLE "MSI_USER" MODIFY ("USERNAME" NOT NULL ENABLE);
  ALTER TABLE "MSI_USER" MODIFY ("PASSWORD" NOT NULL ENABLE);
  ALTER TABLE "MSI_USER" MODIFY ("ID" NOT NULL ENABLE);
  ALTER TABLE "MSI_USER" ADD CONSTRAINT "MSI_USER_PK" PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "MSI_USER" ADD CONSTRAINT "MSI_USER_UK1" UNIQUE ("USERNAME")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;

  --------------------------------------------------------
--  File created - Sunday-November-12-2017   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table MSI_USER_PROFILE
--------------------------------------------------------

  CREATE TABLE "MSI_USER_PROFILE" 
   (	"ID" NUMBER, 
	"TYPE" VARCHAR2(100 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Sequence MSI_USER_PROFILE_SEQ
--------------------------------------------------------

   CREATE SEQUENCE  "MSI_USER_PROFILE_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE ;
REM INSERTING into MSI_USER_PROFILE
SET DEFINE OFF;
Insert into MSI_USER_PROFILE (ID,TYPE) values (1,'ROLE_ADMIN');
Insert into MSI_USER_PROFILE (ID,TYPE) values (2,'ROLE_USER');
--------------------------------------------------------
--  DDL for Index MSI_USER_PROFILE_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MSI_USER_PROFILE_PK" ON "MSI_USER_PROFILE" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index MSI_USER_PROFILE_UK1
--------------------------------------------------------

  CREATE UNIQUE INDEX "MSI_USER_PROFILE_UK1" ON "MSI_USER_PROFILE" ("TYPE") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Trigger MSI_USER_PROFILE_TRG
--------------------------------------------------------

  CREATE OR REPLACE TRIGGER "MSI_USER_PROFILE_TRG" 
BEFORE INSERT ON MSI_USER_PROFILE 
FOR EACH ROW 
BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    IF INSERTING AND :NEW.ID IS NULL THEN
      SELECT MSI_USER_PROFILE_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
  END COLUMN_SEQUENCES;
END;

/
ALTER TRIGGER "MSI_USER_PROFILE_TRG" ENABLE;
--------------------------------------------------------
--  Constraints for Table MSI_USER_PROFILE
--------------------------------------------------------

  ALTER TABLE "MSI_USER_PROFILE" MODIFY ("ID" NOT NULL ENABLE);
  ALTER TABLE "MSI_USER_PROFILE" MODIFY ("TYPE" NOT NULL ENABLE);
  ALTER TABLE "MSI_USER_PROFILE" ADD CONSTRAINT "MSI_USER_PROFILE_PK" PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "MSI_USER_PROFILE" ADD CONSTRAINT "MSI_USER_PROFILE_UK1" UNIQUE ("TYPE")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;

--------------------------------------------------------
--  File created - Sunday-November-12-2017   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table MSI_USER_MSI_USER_PROFILE
--------------------------------------------------------

  CREATE TABLE "MSI_USER_MSI_USER_PROFILE" 
   (	"ID" NUMBER, 
	"USER_ID" NUMBER, 
	"USER_PROFILE_ID" NUMBER
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Sequence MSI_USER_MSI_USER_PROFILE_SEQ
--------------------------------------------------------

   CREATE SEQUENCE  "MSI_USER_MSI_USER_PROFILE_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE ;
REM INSERTING into MSI_USER_MSI_USER_PROFILE
SET DEFINE OFF;
Insert into MSI_USER_MSI_USER_PROFILE (ID,USER_ID,USER_PROFILE_ID) values (1,1,1);
Insert into MSI_USER_MSI_USER_PROFILE (ID,USER_ID,USER_PROFILE_ID) values (2,2,1);
Insert into MSI_USER_MSI_USER_PROFILE (ID,USER_ID,USER_PROFILE_ID) values (3,3,2);
--------------------------------------------------------
--  DDL for Index MSI_USER_MSI_USER_PROFILE_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MSI_USER_MSI_USER_PROFILE_PK" ON "MSI_USER_MSI_USER_PROFILE" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Trigger MSI_USER_MSI_USER_PROFILE_TRG
--------------------------------------------------------

  CREATE OR REPLACE TRIGGER "MSI_USER_MSI_USER_PROFILE_TRG" 
BEFORE INSERT ON MSI_USER_MSI_USER_PROFILE 
FOR EACH ROW 
BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    IF INSERTING AND :NEW.ID IS NULL THEN
      SELECT MSI_USER_MSI_USER_PROFILE_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
  END COLUMN_SEQUENCES;
END;

/
ALTER TRIGGER "MSI_USER_MSI_USER_PROFILE_TRG" ENABLE;
--------------------------------------------------------
--  Constraints for Table MSI_USER_MSI_USER_PROFILE
--------------------------------------------------------

  ALTER TABLE "MSI_USER_MSI_USER_PROFILE" MODIFY ("ID" NOT NULL ENABLE);
  ALTER TABLE "MSI_USER_MSI_USER_PROFILE" MODIFY ("USER_ID" NOT NULL ENABLE);
  ALTER TABLE "MSI_USER_MSI_USER_PROFILE" MODIFY ("USER_PROFILE_ID" NOT NULL ENABLE);
  ALTER TABLE "MSI_USER_MSI_USER_PROFILE" ADD CONSTRAINT "MSI_USER_MSI_USER_PROFILE_PK" PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;

--------------------------------------------------------
--  File created - Sunday-November-12-2017   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table MSI_PRODUCT
--------------------------------------------------------

  CREATE TABLE "MSI_PRODUCT" 
   (	"ID" NUMBER, 
	"NAME" VARCHAR2(255 BYTE), 
	"BRAND" VARCHAR2(255 BYTE), 
	"PRICE" NUMBER, 
	"STOCK" NUMBER, 
	"IMAGE" VARCHAR2(255 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Sequence MSI_PRODUCT_SEQ
--------------------------------------------------------

   CREATE SEQUENCE  "MSI_PRODUCT_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE ;
REM INSERTING into MSI_PRODUCT
SET DEFINE OFF;
Insert into MSI_PRODUCT (ID,NAME,BRAND,PRICE,STOCK,IMAGE) values (1,'Paper','Staples',10,100,null);
Insert into MSI_PRODUCT (ID,NAME,BRAND,PRICE,STOCK,IMAGE) values (2,'Water','Costco',20,200,null);
Insert into MSI_PRODUCT (ID,NAME,BRAND,PRICE,STOCK,IMAGE) values (3,'Milk','Wholefoods',30,300,null);
--------------------------------------------------------
--  DDL for Index PRODUCT_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MSI_PRODUCT_PK" ON "MSI_PRODUCT" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Trigger MSI_PRODUCT_TRG
--------------------------------------------------------

  CREATE OR REPLACE TRIGGER "MSI_PRODUCT_TRG" 
BEFORE INSERT ON MSI_PRODUCT 
FOR EACH ROW 
BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    IF INSERTING AND :NEW.ID IS NULL THEN
      SELECT MSI_PRODUCT_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
  END COLUMN_SEQUENCES;
END;
/
ALTER TRIGGER "MSI_PRODUCT_TRG" ENABLE;
--------------------------------------------------------
--  Constraints for Table MSI_PRODUCT
--------------------------------------------------------

  ALTER TABLE "MSI_PRODUCT" MODIFY ("ID" NOT NULL ENABLE);
  ALTER TABLE "MSI_PRODUCT" MODIFY ("NAME" NOT NULL ENABLE);
  ALTER TABLE "MSI_PRODUCT" ADD CONSTRAINT "MSI_PRODUCT_PK" PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;

  
--------------------------------------------------------
--  File created - Sunday-November-12-2017   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table MSI_ORDER
--------------------------------------------------------

  CREATE TABLE "MSI_ORDER" 
   (	"ID" NUMBER, 
	"PURCHASE_DATE" DATE
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Sequence MSI_ORDER_SEQ
--------------------------------------------------------

   CREATE SEQUENCE  "MSI_ORDER_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE ;
REM INSERTING into MSI_ORDER
SET DEFINE OFF;
Insert into MSI_ORDER (ID,PURCHASE_DATE) values (1,to_date('04-NOV-17','DD-MON-RR'));
--------------------------------------------------------
--  DDL for Index MSI_ORDER_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MSI_ORDER_PK" ON "MSI_ORDER" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Trigger MSI_ORDER_TRG
--------------------------------------------------------

  CREATE OR REPLACE TRIGGER "MSI_ORDER_TRG" 
BEFORE INSERT ON MSI_ORDER 
FOR EACH ROW 
BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    IF INSERTING AND :NEW.ID IS NULL THEN
      SELECT MSI_ORDER_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
  END COLUMN_SEQUENCES;
END;

/
ALTER TRIGGER "MSI_ORDER_TRG" ENABLE;
--------------------------------------------------------
--  Constraints for Table MSI_ORDER
--------------------------------------------------------

  ALTER TABLE "MSI_ORDER" MODIFY ("ID" NOT NULL ENABLE);
  ALTER TABLE "MSI_ORDER" MODIFY ("PURCHASE_DATE" NOT NULL ENABLE);
  ALTER TABLE "MSI_ORDER" ADD CONSTRAINT "MSI_ORDER_PK" PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;

  
  --------------------------------------------------------
--  File created - Sunday-November-12-2017   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table MSI_ORDER_PRODUCT
--------------------------------------------------------

  CREATE TABLE "MSI_ORDER_PRODUCT" 
   (	"ID" NUMBER, 
	"QTY" NUMBER, 
	"ORDER_ID" NUMBER, 
	"PRODUCT_ID" NUMBER
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Sequence MSI_ORDER_PRODUCT_SEQ
--------------------------------------------------------

   CREATE SEQUENCE  "MSI_ORDER_PRODUCT_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE ;
REM INSERTING into MSI_ORDER_PRODUCT
SET DEFINE OFF;
Insert into MSI_ORDER_PRODUCT (ID,QTY,ORDER_ID,PRODUCT_ID) values (1,10,1,1);
Insert into MSI_ORDER_PRODUCT (ID,QTY,ORDER_ID,PRODUCT_ID) values (2,20,1,2);
Insert into MSI_ORDER_PRODUCT (ID,QTY,ORDER_ID,PRODUCT_ID) values (3,30,1,3);
--------------------------------------------------------
--  DDL for Index MSI_ORDER_PRODUCT_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MSI_ORDER_PRODUCT_PK" ON "MSI_ORDER_PRODUCT" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Trigger MSI_ORDER_PRODUCT_TRG
--------------------------------------------------------

  CREATE OR REPLACE TRIGGER "MSI_ORDER_PRODUCT_TRG" 
BEFORE INSERT ON MSI_ORDER_PRODUCT 
FOR EACH ROW 
BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    IF INSERTING AND :NEW.ID IS NULL THEN
      SELECT MSI_ORDER_PRODUCT_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
  END COLUMN_SEQUENCES;
END;
/
ALTER TRIGGER "MSI_ORDER_PRODUCT_TRG" ENABLE;
--------------------------------------------------------
--  Constraints for Table MSI_ORDER_PRODUCT
--------------------------------------------------------

  ALTER TABLE "MSI_ORDER_PRODUCT" ADD CONSTRAINT "MSI_ORDER_PRODUCT_PK" PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "MSI_ORDER_PRODUCT" MODIFY ("PRODUCT_ID" NOT NULL ENABLE);
  ALTER TABLE "MSI_ORDER_PRODUCT" MODIFY ("ORDER_ID" NOT NULL ENABLE);
  ALTER TABLE "MSI_ORDER_PRODUCT" MODIFY ("QTY" NOT NULL ENABLE);
  ALTER TABLE "MSI_ORDER_PRODUCT" MODIFY ("ID" NOT NULL ENABLE);