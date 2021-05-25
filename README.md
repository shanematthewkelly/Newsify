# Both Applications:

1. Run git clone using `git clone https://github.com/shanematthewkelly/Newsify.git`

# Client

This repository contains a React application which connects to a Laravel backend.
To get this client-side application to run, simply do the following:

<pre><code>npm run start</code></pre>

# Server

This repository contains a Laravel application that provides

1. a REST API for storing and retrieving articles
2. a HTML/CSS/JS/jQuery home page for accessing the articles using AJAX requests

To clone this repository and get the application running, do the following steps

1. Go to the folder application using `cd` command on your command or terminal window
2. Run `composer install` on your cmd or terminal
3. Copy .env.example file to .env on the root folder. You can type:
   - `copy .env.example .env` if using the Windows command window or
   - `cp .env.example .env` if using the GitBash/MacOS terminal window
4. Using PHPMyAdmin (or otherwise) create a database for the project (and a user account if you don't want to use the root account)
5. Open your .env file and change the database name (DB_DATABASE) to whatever you have, username (DB_USERNAME) and password (DB_PASSWORD) field correspond to your configuration.
   - By default for XAMPP, the root account has a username 'root' and no password.
   - By default for LAMP, the root account has a username 'root' and password 'root'.
6. Run `php artisan key:generate`
7. Run `php artisan migrate`
8. Run `php artisan db:seed`
9. Run `php artisan serve`
10. Go to localhost:8000
