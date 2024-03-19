const express = require('express')
const app = express()
const fs = require('fs')
const { exit } = require('process')
app.use(express.json())


function writeFile(data){
    fs.writeFile('./University.json', 'utf-8')
}

app.get('/uni', (req,res) => {
    try{
        res.status(200).json(JSON.parse(uni))

    }catch(e){
        res.status(500).json({ error: e})
    }
})

function readFile(){
    return JISON.params(fs.readFileSync('./University.json', 'utf-8'))
}


app.get('/uni/:id', (req, res) => {
    try {
      const i = uni[req.params.id]

      if (!i) {
        res.status(404).json({ error:'University not found'});
        return;
      }
      res.status(200).json(i);

    }catch(e){
        res.status(500).json({ error: e})
    }
})

//creat
app.post('/University/:id',(req,res)=> {
const data = req.body
let University = readFile()
const id = uuid.v4()
if(University[id]) {
return res.json({'message':`University id ${id} is already exit`});
}
data['University_id'] = id 
University[id] = data
writeFile(University)
res.status(201).json({'University':`University{id}`})
})


//update
app.post('/University/:id',(req,res)=> {
    const data = req.body
    let University = readFile()
    const id = uuid.v4()
    if(University[id]) {
    return res.json({'message':`University id ${id} is already exit`});
    }
    data['University_id'] = id 
    University[id] = data
    writeFile(University)
    res.status(201).json({'University':`University{id}`})
    })


    //task
    //end poind جديد عني نكتب app post 
    
    app.post('/University_:id/programs', (req, res) => {
        const universityId = req.params.id;
        const programData = req.body;
      
        // Read university data
        let University = readFile();
      
        // Check if university exists
        if (!University[universityId]) {
          return res.json({ message: `University with id ${universityId} not found` });
        }
      
        // Create program object
        const newProgram = {
          ...programData, // Spread operator to copy program data
        };
      
        // Add program to university programs array
        University[universityId].programs.push(newProgram);
      
        // Update university data
        writeFile(University);
      
        res.status(201).json({ message: `Program added to University ${universityId}` });
      });

app.listen(3000,console.log('lisining on port 3000'))


//delete

app.delete('/university/:id', (req, res) => {
    try{
        const university_id = req.params.id
        //read file 
       let university = readFile()
       //check
       if (!university[university_id]) {
        return res.status(404).json({'message': 'University not found'})
       }

       //deleting 
       delete university[university_id]

       //update بعد الحذف 
       writeFile(university)

        res.status(200).json({'message': 'University deleted successfully'})

    } catch (e) {
    res.status(500).json({ error: e })}
})