const express = require("express");

const server = express();

const projects = [];

server.use(express.json());

let count = 0;

server.use((req, res, next)=>{
  

  if(req.listenerCount){
    count =++ count
    console.log(count, "Requisições foram feitas");
  }

  next();
})

function checkProjectID(req, res, next){

  const {id} = req.params;
  const checkId = projects.find(p => p.id == id);

  if(!checkId){
    return res.status(400).json({error: "O id informado não existe."});  
  }

  return next();
}

server.get('/projects', (req, res)=>{
  return res.json(projects);
});

server.put('/projects/:id', checkProjectID ,(req, res)=>{
  const {id} = req.params;

  const {title} = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
})

server.delete('/projects/:id', checkProjectID, (req, res)=>{
  const {id} = req.params;

  const projectIndex = projects.find(p => p.id == id);


  projects.splice(projectIndex, 1);

  res.send();
})

server.post('/projects', (req, res)=>{
  const {id} = req.body;
  const {title} = req.body;

  const project = {
    id,
    title,
    tasks:[]
  };

  projects.push(project);

  return res.json(projects);
});

server.post('/projects/:id/tasks', checkProjectID, (req, res)=>{
  const {id} = req.params;
  const {title} = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks = title;

  res.json(project);
})

server.listen(3333);