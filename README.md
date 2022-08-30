# Flight Controller v0.1

## DataBase Information:

- Country:
    Shows the full list of all countries available
    - id - Auto increments, [primary key] for table
    - name - Country's name

- User:
    Shows the full list of all users (includes: Customers, Admins, Airline companies)
    - id - Auto increments, [primary key] for table
    - username - name used for login (Unique values)
    - password - used to verify login
    - email - used to verify uniqueness (Unique values)
    - user role - [Foreign key] determines if the user is [Customer / Admin / Airline company]

- User_Role:
    A list which consists the 3 different roles for users [Customers / Admins / Airline companies]
    - id - Auto increments, [primary key] for table
    - role_name - Customer / Admin / Airline company

- Administrator: ?? Deprecated, using is_superuser instead
    A list which consists all users classified as an admin
    - id - Auto increments, [primary key] for table
    - first_name - first name
    - last_name - last name
    - user - [Foreign key] points to which user is an admin

- Customer: a.k.a Profile
    A list which consists all users classified as a customer
    - id - Auto increments, [primary key] for table
    - first_name - first name
    - last_name - last name
    - address - customer's address
    - phone_number - customer's phone number (Unique values)
    - credit_card_number - a valid credit card for payment (Unique values)
    - user - [Foreign key] points to which user is a customer

- AirlineCompany: ?? Deprecated, using is_staff instead
    A list which consists all users classified as an airline company
    - id - Auto increments, [primary key] for table
    - name - airline's name (Unique values) 
    - country - [Foreign key] connects an airline to their country
    - user - [Foreign key] points to which user is an airline company

- Flight:
    A list of all past, current, and future flights
    - id - Auto increments, [primary key] for table
    - airline_company - [Foreign key] connects the flight to its airline company
    - origin_country - [Foreign key] connects the flight to its departure country
    - destination_country - [Foreign key] connects the flight to its landing country
    - departure_time - time of flight departure
    - landing_time - time of flight landing
    - remaining_tickets - number of available tickets for the flight

- Ticket:
    A list of bought tickets (Receipts)
    - id - Auto increments, [primary key] for table
    - flight - [Foreign key] connects the ticket to its flight
    - customer - [Foreign key] connects the ticket to the customer who bought it
    ** currently can buy 1 ticket at a time **