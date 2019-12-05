# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


teacher = Teacher.new
teacher.name = "Adam Sarli"
teacher.email = "adam@gmail.com"
teacher.password = "adam"
teacher.save


teacher = Teacher.new
teacher.name = "Alex Corbitt"
teacher.email = "alex@gmail.com"
teacher.password = "alex"
teacher.save
