import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const app = express();
app.use(express.json());

app.get("/books", async (req, res) => {
    const books = await prisma.book.findMany();
    res.json(books);
});

app.post("/books", async (req, res) => {
    const { title, author } = req.body;
    const book = await prisma.book.create({
        data: {
            title,
            author
        }
    })
    res.status(200).json(book);
})


// PORT
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${ PORT }`);
});