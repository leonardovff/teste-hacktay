const fs = require('fs')
const data = fs.readFileSync('teste.json', 'utf8');
console.log('entrou')

const teste = JSON.parse(data);
const found = teste.products.content.find(product => {
    return !product.photo || !product.photo.length
});
console.log(found);
return 2;