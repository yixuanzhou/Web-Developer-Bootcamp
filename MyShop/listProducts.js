var Faker = require('Faker');
var randomName = Faker.commerce.productName(); // Rowan Nikolaus
var randomEmail = Faker.Internet.email(); // Kassandra.Haley@erich.biz
var randomCard = Faker.Helpers.createCard(); // random contact card containing many properties
console.log(randomName);