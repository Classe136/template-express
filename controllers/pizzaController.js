import connection from "../connection.js";

import CustomError from "../classes/CustomError.js";

function index(req, res) {
  const sql = "SELECT * FROM `pizzas`";
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    // console.log(results);
    let data = results;
    const response = {
      totalCount: results.length,
      data,
    };
    res.json(response);
  });
}
function callError() {
  throw new CustomError("L'elemento non esiste", 404);
}
function show(req, res) {
  const id = parseInt(req.params.id);

  //prima query per prendere i dati della pizza
  const sql = "SELECT * FROM `pizzas` WHERE `id` = ?";
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    const item = results[0];
    if (!item) {
      return res.status(404).json({ error: "L'elemento non esiste" });
      //throw new CustomError("L'elemento non esiste", 404);
    }

    //seconda query per prendere gli ingredienti
    const sqlIngredients = `SELECT ingredients.id, ingredients.name FROM ingredients
JOIN ingredient_pizza ON ingredient_pizza.ingredient_id = ingredients.id
WHERE ingredient_pizza.pizza_id = ?`;
    connection.query(sqlIngredients, [id], (err, results) => {
      console.log(results);
      if (err) return res.status(500).json({ error: "Database query failed" });

      //aggiungo la proprietà ingredients all'oggetto pizza
      item.ingredients = results;

      res.json({ success: true, item });
    });
  });
}

function store(req, res) {
  // let newId = 0;
  // for (let i = 0; i < pizzas.length; i++) {
  //   if (pizzas[i].id > newId) {
  //     newId = pizzas[i].id;
  //   }
  // }
  // newId += 1;
  // //console.log(req.body);
  // // new data is in req.body
  // const newItem = {
  //   id: newId,
  //   ...req.body,
  // };

  // pizzas.push(newItem);
  //INSERT INTO tbl_name (a,b,c) VALUES(1,2,3),(4,5,6),(7,8,9); per relazione
  res.status(201).json(newItem);
}

function update(req, res) {
  const id = parseInt(req.params.id);
  //prima query per prendere i dati della pizza
  // array id ingredients passed in body
  // previous array id ingredients
  // toAdd = [] - toRemove = []
  const toAdd = newIngredients.filter((i) => !previousIngredients.includes(i));
  const toRemove = previousIngredients.filter((i) => !ingredients.includes(i));
  // delete from table where id in (3,4,6,8,9) // per relazione
  // delete from table where id not in (3,4,6,8,9)
  // INSERT INTO tbl_name (a,b,c) VALUES(1,2,3),(4,5,6),(7,8,9); per relazione
  //console.log(req.body);
  for (key in item) {
    if (key !== "id") {
      item[key] = req.body[key];
    }
  }

  //console.log(examples);
  res.json(item);
}
function destroy(req, res) {
  const id = parseInt(req.params.id);
  const index = pizzas.findIndex((item) => item.id === id);
  const sql = "DELETE * FROM `pizzas` WHERE `id` = ?";
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.sendStatus(204);
  });
}

export { index, show, store, update, destroy };
