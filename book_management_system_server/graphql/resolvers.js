import { PrismaClient } from "@prisma/client";
import { jwt } from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const saltRounds = 10

const SECRET = process.env.SECRET;

const createToken = (user) => {
    const jwtoken = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '24hr' })

    return jwtoken;
}

const validateToken = (token) => {
    try {
        const decrypted = jwt.verify(token, SECRET)
        return decrypted.userId
    } catch (err) { return null }
}


const resolvers = {
    Query: {
        book: async ({ id }) => {
            return prisma.book.findUnique({ where: { id } })
        },

        books: async () => {
            const query = {
                orderBy: {
                    title: "asc",
                }
            }

            const books = await prisma.book.findMany(query)

            return { books }
        },

        findUser: async (context) => {
            if (!context.token) {
                return null;
            }
            const jwtoken = context.token.replace("Bearer ", "");

            try {
                const decoded = jwt.verify(jwtoken, SECRET);

                const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

                if (!user) {
                    return false;
                }

                return {
                    id: user.id,
                    email: user.email,
                };
            } catch (err) {
                throw new Error('Invalid or expired token')
            }
        }
    },

    Mutation: {
        signup: async ({ firstName, lastName, email, password }) => {
            const existingUser = await prisma.user.findUnique({ where: { email } });

            if (existingUser) {
                throw new Error("This email is linked to an existing account.")
            }

            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPass = bcrypt.hashSync(password, salt);

            const newUser = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password: hashedPass,
                },
            });

            return newUser;
        },

        login: async ({ email, password }) => {
            const loginUser = await prisma.user.findUnique({ where: { email } })

            if (!loginUser) {
                throw new Error("Invalid email or password. Please try again.")
            }

            const matchingPass = await bcrypt.compare(password, loginUser.password)

            if (!matchingPass) {
                throw new Error("Invalid email or password. Please try again.")
            }

            const jwtoken = createToken(loginUser)

            return { loginUser, jwtoken }
        },

        addBook: async ({ title, author, publicationYear }) => {

            const book = { title, author, publicationYear }

            const existingBook = await prisma.book.findUnique({ where: { title } })

            if (existingBook) {
                throw new Error('This book was already added.')
            }

            if (!book.title || !book.author || !book.publicationYear) {
                throw new Error('All fields are required.')
            }

            return prisma.book.create({
                data: {
                    title,
                    author,
                    publicationYear
                }
            })
        },

        editBook: async ({ id, title, author, publicationYear }) => {
            const editedBook = await prisma.book.update({
                where: { id },
                data: {
                    title,
                    author,
                    publicationYear
                }
            })

            return editedBook;
        },

        deleteBook: async ({ id }) => {
            await prisma.book.delete({ where: { id } })

            return { message: 'Deleted Succesfully.' }
        }
    }
}

export default resolvers;