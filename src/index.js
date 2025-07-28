import express  from 'express'

const app = express()
const port = 3000

const books = [
  {
    id: 1,
    author: 'Kobo Abe',
    title:'Žmogus dėžė'
  },
  {
    id: 2,
    author: 'Iain Banks',
    title:'Tiltas'},
  {
    id: 3,
    author: 'Italo Calvino',
    title:'Musu protėviai'},
]


app.use(express.json());



app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/demo', (req, res) => {
  res.send('demo')
})

// params
app.get('/demo/:cat/:id', (req, res) => {
  const cat=req.params.cat
  const id=req.params.id
  res.send([id,cat])
})

//query

app.get('/query', (req, res) => {
  const q = req.query;
  res.send(q);
})

// get 
app.get('/api/books', (req, res) => {
  res.send(books);

})

app.get('/api/books/:id', (req, res) => {
  
  const book = books.find(book => book.id === parseInt(req.params.id))
  if(!book) return res.status(400).send('Tokios knygos nera')
  res.send(book);
})
//post

app.post('/api/books', (req, res) => {
  const naujaKnyga = {
    id: books.length + 1,
    author: req.body.author,
    title: req.body.title
  }
  books.push(naujaKnyga)
  res.send(books)
})






app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`);
});

