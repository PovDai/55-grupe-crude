// Importuojame Express modulį, kuris padeda kurti HTTP serverius
import express from 'express'

// Sukuriame naują Express aplikaciją
const app = express()
// Nustatome, kad serveris klausysis 3000 prievado
const port = 3000

// Iš anksto apibrėžtas knygų sąrašas (kaip duomenų bazės simuliacija)
const books = [
  {
    id: 1,
    author: 'Kobo Abe',
    title:'Žmogus dėžė'
  },
  {
    id: 2,
    author: 'Iain Banks',
    title:'Tiltas'
  },
  {
    id: 3,
    author: 'Italo Calvino',
    title:'Mūsų protėviai'
  },
]

// Įjungiame `express.json()` middleware – leidžia serveriui priimti JSON duomenis iš `POST` užklausų
app.use(express.json());

// GET užklausa į pagrindinį puslapį – grąžina paprastą tekstą
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Papildomas testinis maršrutas, grąžina tekstą „demo“
app.get('/demo', (req, res) => {
  res.send('demo')
})

// GET maršrutas su keliais parametrais (pvz. /demo/knygos/5)
// Parametrai gaunami per req.params objektą
app.get('/demo/:cat/:id', (req, res) => {
  const cat = req.params.cat // Iš URL paimame „cat“
  const id = req.params.id   // Iš URL paimame „id“
  res.send([id, cat])        // Grąžiname abu kaip masyvą
})

// GET užklausa su query string (pvz. /query?autorius=Jonas&metai=2020)
// Visi query parametrai prieinami per req.query objektą
app.get('/query', (req, res) => {
  const q = req.query
  res.send(q) // Grąžina visus query parametrus kaip objektą
})

// GET visų knygų sąrašas per API
app.get('/api/books', (req, res) => {
  res.send(books) // Grąžina visą „books“ masyvą
})

// GET viena knyga pagal ID (pvz. /api/books/2)
app.get('/api/books/:id', (req, res) => {
  // Surandame knygą masyve pagal ID (konvertuojame iš string į int)
  const book = books.find(book => book.id === parseInt(req.params.id))

  // Jei tokios knygos nėra, grąžiname klaidos kodą ir pranešimą
  if (!book) return res.status(400).send('Tokios knygos nėra')

  // Jei rasta – grąžiname knygos objektą
  res.send(book)
})

// POST naujos knygos pridėjimas prie sąrašo
app.post('/api/books', (req, res) => {
  // Sukuriame naują knygos objektą iš kliento atsiųstų duomenų (req.body)
  const naujaKnyga = {
    id: books.length + 1, // Automatiškai sugeneruojame ID
    author: req.body.author, // Paimame „author“ iš JSON kūno
    title: req.body.title     // Paimame „title“ iš JSON kūno
  }

  // Pridedame naują knygą į esamą masyvą
  books.push(naujaKnyga)

  // Grąžiname atnaujintą knygų sąrašą
  res.send(books)
})

// Paleidžiame serverį, kuris klausys nurodytame prievade
app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`)
})