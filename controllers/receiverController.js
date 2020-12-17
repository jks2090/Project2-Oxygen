const express = require("express");
const router = express.Router();

const db = require("../models");

//------------------------------------------------------------------
// list of all records that does not have Giver, this will use giver-list handlebar
// this will handle Delect and Edit function from Giver
router.get("/list", function(req, res) {

  db.Gift.findAll({
    //This will filed all data without Giver Name
    where: {
      Giver: null,
    },
    order: [["id", "desc"]]

  }).then(function(results) {
    res.render("giver-list",{gifts: results})
  });

});
//--------------------------------------------------------------


// 1) post the new receiver created and intertit to the database
router.post("/api/receiver", (req, res) => {
  db.Gift.create(req.body)
    .then((newReceiver) => {
      console.log(newReceiver);
      res.json(newReceiver);
      console.log(newReceiver.id)
      
    })
    .catch((err) => {
      console.log(err);
    });
});


//-------------------------------------------------------------------------

//this will find the record Giver want to add giver information
//this will use id parames from updateReceiver.js submit click 
//this will use giverUpdated handlebar
router.get("/giver/:id", (req, res) => {
  db.Gift.findOne({
    where: {
      id: req.params.id,
    },
  }).then((foundReceiver) => {
    console.log(foundReceiver.email);
    res.render("giverUpdated", {
      Email: foundReceiver.Email,
      Receiver: foundReceiver.Receiver,
      Giver: foundReceiver.Giver,
      Address: foundReceiver.Address,
      Gift1: foundReceiver.Gift1,
      Gift2: foundReceiver.Gift2,
      Gift3: foundReceiver.Gift3,
      id: foundReceiver.id,
    });
  });
});
//------------------------------------------------------------------

// This will update the Giver name and Email 

router.put("/api/giver/:id", (req, res) => {
  db.Gift.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updateGiver) => {
      res.json(updateGiver);
      console.log(updateGiver)
    })
    .catch((err) => {
      console.log(err);
    });
});

//-------------------------------------------------------------------
//this will update the receiver name, address, gift1, gift2, gift3
router.put("/api/receiver/:id", (req, res) => {
  db.Gift.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updateReceiver) => {
      res.json(updateReceiver);
      console.log(updateReceiver)
    })
    .catch((err) => {
      console.log(err);
    });
});


//-------------------------------------------------------------------

//this will delete record from databsae when Delect button is clicked from /list

router.delete("/api/giver/:id", (req, res) => {
  db.Gift.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
});


//-------------------------------------------------------------------
// this will delete record from database when Delect button is clicked from /new
router.delete("/api/receiver/:id", (req, res) => {
  db.Gift.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
});



//---------------------------------------------------------------------
// 2) This will show all data and sorted by Id - lates will post to top 

router.get("/new", (req, res) => {
  db.Gift.findAll({
    order: [["id", "desc"]]
  })
    .then(function(results) {
    res.render("receiver",{gifts: results})
  })
});


module.exports = router;