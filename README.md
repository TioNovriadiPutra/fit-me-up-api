# Fit Me Up API

Fit Me Up is an application thats use in the sports community. Fit Me Up can be use for sport venue to digitalize their business and increase their profit and accesibilty to public. Fit Me Up can also be use by coach so they can reach out to their client easily and help coach to schedule their training time. And last but not least the application help user to find any kind of sport venue and help user to book sport venue also help user to book a coach.

## Tech Stack
1. AdonisJS v5
2. NodeJS version : 21.1.0
3. XAMPP version : 7.4.27

## Table of Content
1. Getting Started
   - Prerequisites
   - Installation
   - Run Program
2. Features
3. Licenses
4. Contact

## Getting Started
Fit Me Up API is an API that develop using NodeJS with AdonisJS as the framework. AdonisJS is a NodeJS framework that's use Typescript as its languange. The API is also connected to a MySQL database using XAMPP. Before you can run the application, you need to install a couple of softwares so that the application can run perfectly.

### Prerequisites
- Node >= 16.14.0
- XAMPP (for Windows)
- MAMP (for MacOS)

### Installation
1. Clone the repository :
   
   ```bash
   git clone https://github.com/TioNovriadiPutra/fit-me-up-api.git
2. Navigate to fit-me-up-api folder :

   ```bash
   cd fit-me-up-api
3. Install the required dependencies:

   ```bash
   npm install
4. Create a `.env` file in the project root and copy paste the env from the file `.env.example` :

   ![Screenshot (188)](https://github.com/TioNovriadiPutra/fit-me-up-api/assets/129643417/37b2f7c6-bfdc-440c-adeb-806cc1ed976a)
5. Change the MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB_NAME according to your database :

      ```env
   MYSQL_USER=<your mysql username>
   MYSQL_PASSWORD=<your mysql password>
   MYSQL_DB_NAME=<your database name for the app>
6. Create a new database directly in your MySQL with the name same as the `.env`

### Run Program
1. Open XAMPP or MAMP
2. Run the MySQL server :
    - MAMP (for MacOS) :

    <img width="648" alt="285381472-cc83c2ff-ce24-4b0c-8f97-fd8419ed657a" src="https://github.com/TioNovriadiPutra/fit-me-up-api/assets/129643417/9c061206-96c7-4e22-9151-50071f1a9fda">
    - XAMPP (for Windows) :

     ![285381795-ea763612-f138-4316-acb0-ddc7dbd44fe7](https://github.com/TioNovriadiPutra/fit-me-up-api/assets/129643417/80934e94-0b35-4a89-84f9-1413c83d1f05)
3. Navigate to fit-me-up-api folder :

   ```bash
   cd fit-me-up-api
4. Migrate the database :

   ```bash
   node ace migration:run
5. Run the database seeder :

   ```bash
   node ace db:seed
6. Run API :

   ```bash
   node ace serve --watch

## License
This project license under the MIT License. See 
`LICENSE`
for more information.

## Contact
Tio Novriadi Putra - [tio_novriadi](https://instagram.com/tio_novriadi) - [tionvriadi@gmail.com](mailto:tionvriadi@gmail.com)  
Project link : [Fit Me Up API](https://github.com/TioNovriadiPutra/fit-me-up-api)
