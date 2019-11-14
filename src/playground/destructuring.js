const person = {
    name: 'tim',
    age: 34,
    location: {
        city: 'liverpool',
        temp: 23
    }
};

const {name = 'anon', age} = person;
console.log(`${name} is ${age}.`);

const {city, temp:temperature} = person.location;
if(city && temperature) {
    console.log(`It's ${temperature} in ${city}.`);
}

const address = ['1234 Old Street', 'Liverpool', 'Merseyside', 'UK'];
const [street = 'asdasd', , , ] = address;

console.log(street);