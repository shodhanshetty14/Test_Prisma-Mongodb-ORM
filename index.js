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

app.post("/authors", async (req, res) => {
    const { name, gender, email } = req.body;
    const author = await prisma.author.create({
        data: {
            name,
            gender,
            email
        }
    })
    res.status(200).json(author);
});

app.post("/publisher", async (req, res) => {
    const { name, email } = req.body;
    const publisher = await prisma.publisher.create({
        data: {
            name,
            email
        }
    })
    res.status(200).json(publisher);
})

// PORT
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${ PORT }`);
});