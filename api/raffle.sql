CREATE DATABASE raffle;

CREATE TABLE IF NOT EXISTS member (
    member_id serial PRIMARY KEY UNIQUE NOT NULL,
    first_name varchar( 50 ) NULL,
    last_name varchar( 50 ) NULL,
    phone  varchar ( 50 ) NULL,
    email varchar ( 255 ) UNIQUE NOT NULL,
    address_line_1 varchar ( 100 ) NULL,
    address_line_2 varchar ( 50 ) NULL,
    city_name varchar ( 100 ) NULL,
    state_name varchar ( 50 ) NULL,
    zip_code varchar ( 10 ) NULL,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE NOT NULL,
    donated BOOLEAN DEFAULT FALSE NOT NULL
);      

CREATE TABLE IF NOT EXISTS category (
  category_id serial PRIMARY KEY UNIQUE NOT NULL,
  category_name varchar(255) NOT NULL,
  parent_id int DEFAULT NULL,
  CONSTRAINT fk_category
  FOREIGN KEY (parent_id) REFERENCES category (category_id) 
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS raffle (
    raffle_id serial PRIMARY KEY UNIQUE NOT NULL,
    title varchar NOT NULL,
    raffle_description varchar NULL,
    total_tickets int NULL,
    ticket_price NUMERIC(5,2) NULL,
    tickets_sold int NULL,
    raffle_start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    category_id int NOT NULL,
    item_cost NUMERIC(5,2) NOT NULL,
    image_file_path varchar NULL,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category (category_id)
);

CREATE TABLE IF NOT EXISTS winner	(
    winner_id serial PRIMARY KEY UNIQUE NOT NULL,
    member_id int NOT NULL,
    raffle_id int NOT NULL,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    was_notified boolean DEFAULT FALSE NOT NULL,
    CONSTRAINT fk_raffle
    FOREIGN KEY (raffle_id)
    REFERENCES raffle (raffle_id),
    CONSTRAINT fk_member
    FOREIGN KEY (member_id)
    REFERENCES member (member_id)
);

CREATE TABLE IF NOT EXISTS ticket (
    ticket_id serial PRIMARY KEY UNIQUE NOT NULL,
    raffle_id int NOT NULL,
    member_id int NOT NULL,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_raffle
    FOREIGN KEY (raffle_id)
REFERENCES raffle (raffle_id),
CONSTRAINT fk_member
FOREIGN KEY (member_id)
REFERENCES member (member_id)
);

INSERT INTO category VALUES (DEFAULT,'Electronics',DEFAULT);
INSERT INTO category VALUES (DEFAULT,'Gift Cards',DEFAULT);
INSERT INTO category VALUES (DEFAULT,'Laptops',1);

INSERT INTO member VALUES (DEFAULT,'Abe','Johnson','555-555-5555','officialjabe@gmail.com','555 Nebula Drive','Penthouse',
'New York','NY', '11111', DEFAULT, '1', TRUE);

INSERT INTO member VALUES (DEFAULT,NULL,NULL,NULL,'doa.718@gmail.com',NULL,NULL,NULL
,NULL,NULL, DEFAULT, '0', FALSE);

INSERT INTO member VALUES (DEFAULT,'Ariana','Walker','777-777-7777','thejnetwork.11@gmail.com','111 7th Heaven',NULL,
'New York','NY', '11111', DEFAULT, '0', TRUE);

INSERT INTO raffle VALUES (DEFAULT,'1st Raffle Ever',
'You will be able to see a description of the raffle item as well as sponsors and other info', 100, 5, 10, DEFAULT, 3, 150,
'https://cdn.mos.cms.futurecdn.net/A4GDK27VMnz6LtFDy9yzk.jpg');

