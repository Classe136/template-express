import { ingredients } from "../models/examples.js";
import CustomError from "../classes/CustomError.js";

function index(req, res) {
  let data = [...ingredients];

  const response = {
    totalCount: data.length,
    data,
  };
  res.json(response);
}

// function show(req, res) {
//   const id = parseInt(req.params.id);
//   const item = pizzas.find((item) => item.id === id);
//   if (!item) {
//     throw new CustomError("L'elemento non esiste", 404);
//   }
//   res.json({ success: true, item });
// }

// function store(req, res) {
//   let newId = 0;
//   for (let i = 0; i < pizzas.length; i++) {
//     if (pizzas[i].id > newId) {
//       newId = pizzas[i].id;
//     }
//   }
//   newId += 1;
//   console.log(req.body);
//   // new data is in req.body
//   const newItem = {
//     id: newId,
//     ...req.body,
//   };

//   pizzas.push(newItem);
//   res.status(201).json(newItem);
// }

// function update(req, res) {
//   const id = parseInt(req.params.id);
//   const item = pizzas.find((item) => item.id === id);
//   if (!item) {
//     throw new CustomError("L'elemento non esiste", 404);
//   }

//   //console.log(req.body);
//   for (key in item) {
//     if (key !== "id") {
//       item[key] = req.body[key];
//     }
//   }

//   //console.log(examples);
//   res.json(item);
// }
// function destroy(req, res) {
//   const id = parseInt(req.params.id);
//   const index = pizzas.findIndex((item) => item.id === id);
//   if (index !== -1) {
//     pizzas.splice(index, 1);
//     res.sendStatus(204);
//   } else {
//     throw new CustomError("L'elemento non esiste", 404);
//   }
// }

//export { index, show, store, update, destroy };
export { index };
