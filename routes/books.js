const express = require("express");
const router = express.Router();
const books = require('../db.json');
const fs = require('fs');
const { json } = require("express");


/**
*  @swagger
*   components:
*     schemas:
*       Book:
*         type: object
*         required:
*           - id
*           - title
*           - author
*         properties:
*           id:
*             type: integer
*             description: The auto-generated id of the book.
*           title:
*             type: string
*             description: The title of your book.
*           author:
*             type: string
*             description: Who wrote the book?
*         example:
*            id: some id
*            title: title from author
*            author: author
*/


/**
*  @swagger
*  tags:
*    name: Books
*    description: API to manage your books.
*/


/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

router.get("/", (req, res) => {
    console.log(22222222222222);
    // const books = req.app.db.get("books");

    // res.send(books);

    return res.json({ "books": books.books });
});

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 */

router.get("/:id", (req, res) => {

    const reqId = req.params.id || 0;
    const searchabledId = books.books

    for (let i = 0; i < searchabledId.length; i++) {
        if (reqId !== searchabledId[i].id) continue

        return res.send(searchabledId[i])
    }
    res.sendStatus(404)
    //  console.log('reqId', reqId);
    //  console.log(books.books);
});

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {
    const reqData = req.body
    console.log(reqData);

    books.books.push(reqData)
    // console.log(3333, typeof(reqData));   

    try {
        fs.writeFileSync('./db.json', JSON.stringify(books))

    } catch (error) {
        return res.status(500).send(error);
    }
});

/**
 * @swagger
 * /books/{id}:
 *  put:
 *    summary: Update the book by the id
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", (req, res) => {

    const reqData = req.body
    const reqId = req.params.id || 0;
    const searchabledId = books.books

    for (let i = 0; i < searchabledId.length; i++) {
        if (reqId !== searchabledId[i].id) continue

        searchabledId.splice(i, 1, reqData)
        fs.writeFileSync('./db.json', JSON.stringify(books))
    }
    res.sendStatus(404)

});

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 * 
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */

router.delete("/:id", (req, res) => {

    
    const reqId = req.params.id || 0;
    const searchabledId = books.books

    for (let i = 0; i < searchabledId.length; i++) {
        if (reqId !== searchabledId[i].id) continue

        searchabledId.splice(i, 1,)
        fs.writeFileSync('./db.json', JSON.stringify(books))
    }
    res.sendStatus(200)

    // req.app.db.get("books").remove({ id: req.params.id }).write();

    // res.sendStatus(200);
});

module.exports = router;





// /**
// *  @swagger
// *  path:
// *   /books/:
// *     post:
// *       summary: Creates a new book
// *       tags: [Books]
// *       requestBody:
// *         required: true
// *         content:
// *           db/json:
// *             schema:
// *               $ref: '#/components/schemas/Book'
// *       responses:
// *         "200":
// *           description: The created book.
// *           content:
// *             db/json:
// *               schema:
// *                 $ref: '#/components/schemas/Book'
//  */
// router.get("/", (req, res) => {
// 	const books = req.app.db.get("books");

// 	res.send(books);
// });

// /**
// *  @swagger
// *   components:
// *     schemas:
// *       Book:
// *         type: object
// *         required:
// *           - id
// *           - title
// *           - author
// *         properties:
// *           id:
// *             type: integer
// *             description: The auto-generated id of the book.
// *           title:
// *             type: string
// *             description: The title of your book.
// *           author:
// *             type: string
// *             description: Who wrote the book?
// *           finished:
// *             type: boolean
// *             description: Have you finished reading it?
// *           createdAt:
// *             type: string
// *             format: date
// *             description: The date of the record creation.
// *         example:
// *            id: some id
// *            title: title from author
// *            author: author
//  */