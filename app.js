const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sendgrid = require('@sendgrid/mail');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Acces s-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/api', (req, res, next) => {
    res.send('API Status: Running')
});


app.post('/api/email', (req, res, next) => {
    // console.log(req.body);

    sendgrid.setApiKey('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');
    const msg = {
        to: 'madalina.zamfira@gmail.com',
        from: 'madalina.zamfira@gmail.com',
        subject: 'Website Contact',
        text:  req.body.email + " vous a envoyé ce message :" + req.body.message 
    }

    sendgrid.send(msg)
        .then(result => {
            res.status(200).json({
                success: true
            });
        })
    .catch(err => {

        console.log('error: ', err);
        res.status(401).json({
            success: false
        });
    });
});

//routes projets

//récupérer un projet - GET
app.get('/:id', (req, res) => {
    const projectId = req.params.id;
    connection.query('SELECT * FROM projects WHERE id = ?', [projectId], (err, results) => {
      if (err) {
        res.status(500).send(`An error occurred: ${err.message}`);
      } else if (results.length === 0) {
        res.status(404).send("Project not found");
      } else {
        res.json(results[0]);
      }
    });
  });

  //create a project - POST
  app.post("/:id", (req, res) => {
    const formData = req.body;
    connection.query("INSERT INTO projects SET ?", formData, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Creation of a new project failed");
      } else {
        res.sendStatus(200);
      }
    });
  });

  //update/replace a project - PUT
  app.put("/:id", (req, res) => {
    const idProject = req.params.id;
    const formData = req.body;
  
    connection.query(
      "UPDATE projects SET ? WHERE id = ?",
      [formData, idProject],
      err => {
        if (err) {
          console.log(err);
          res.status(500).send("Project edit failed");
        } else {
          res.sendStatus(200);
        }
      }
    );
  });

  //delete a project - DELETE
  app.delete("/:id", (req, res) => {
    const idProject = req.params.id;
  
    connection.query("DELETE FROM projects WHERE id = ?", [idProject], err => {
      if (err) {
        console.log(err);
        res.status(500).send("Project removal failed");
      } else {
        res.sendStatus(200);
      }
    });
  });

//routes about

app.listen(3030, '0.0.0.0');