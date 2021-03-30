var mongoose = require("mongoose");
const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: { type: String, require: true, maxlength: 100 },
  family_name: { type: String, require: true, maxlength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  return `${this.family_name}, ${this.first_name}`;
});

// Virtual for author's lifespan
AuthorSchema.virtual("lifespan").get(function () {
  const date_of_birth_formatted = this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : "";
  const date_of_death_formatted = this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    : "";
  return `${date_of_birth_formatted} - ${date_of_death_formatted}`;
});

// Virtual for author's url
AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

// Virtuals for author's date of birth and date of death formatter
AuthorSchema.virtual("date_of_birth_formatted").get(function () {
  return this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : "";
});

AuthorSchema.virtual("date_of_death_formatted").get(function () {
  return this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    : "";
});

// Export model
module.exports = mongoose.model("Author", AuthorSchema);
