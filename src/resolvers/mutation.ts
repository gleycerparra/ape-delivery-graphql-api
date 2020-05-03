import { Book, BookClass } from './../models/book.model';


export const Mutation = {
  createBook: async (parent: any, { input }: { input: BookClass }
  ) => {
    const book = await Book.create({ title: input.title, author: input.author });
    console.log('book', book);
    return book;
  },
}
