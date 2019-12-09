# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_12_09_132112) do

  create_table "item_videos", force: :cascade do |t|
    t.integer "item_id"
    t.integer "video_id"
  end

  create_table "items", force: :cascade do |t|
    t.integer "progression_index"
    t.integer "progression_id"
  end

  create_table "klasses", force: :cascade do |t|
    t.string "name"
    t.integer "teacher_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "progressions", force: :cascade do |t|
    t.string "name"
    t.integer "teacher_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "color"
  end

  create_table "reflections", force: :cascade do |t|
    t.string "question1"
    t.string "title"
    t.integer "item_id"
  end

  create_table "student_progressions", force: :cascade do |t|
    t.integer "student_id"
    t.integer "progression_id"
    t.integer "agenda_index"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "students", force: :cascade do |t|
    t.string "firstName"
    t.string "lastName"
    t.integer "klass_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username"
    t.string "password"
  end

  create_table "teachers", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
  end

  create_table "videos", force: :cascade do |t|
    t.string "channelTitle"
    t.string "title"
    t.string "date"
    t.string "description"
    t.string "thumbnailUrl"
    t.string "videoId"
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
