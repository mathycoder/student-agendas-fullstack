# Student Agendas

Welcome to Student Agendas!  This application is an educational tool for assigning video progressions into individualized student agendas.  Created using a React-Redux front end and a Rails API backend.

## Installation

Clone this repository using

  $ git clone git@github.com:mathycoder/student-agendas-fullstack.git

Then go into the directory

  $ cd student-agendas-fullstack

From there, execute bundle

  $ bundle install


You'll also need to install JS packages

  $ npm install

You'll need to load up the database, so run:

  $ rake db:migrate

Finally, use a rake task to load up both the front-end and backend:

  $ rake start

## Usage

Start by creating a new teacher account.
* Create a new class.
* Navigate to edit students in the settings menu, and create your first students.
* Create your first progressions using 'New Progression'.
* Drag the progressions into your student agendas.
* Give students their usernames and passwords, and let them start their agendas!

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/mathycoder/student-agendas-fullstack. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The application is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
