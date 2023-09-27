class BookModel{
    id: number;
    title: string;
    author?: string;
    description?: string;
    copies?: number;
    copiesAvailable?: number;
    category?: number;
    img?: string;

    constructor(id:number, 
        title: string,
        author: string,
        description: string,
        copies: number,
        copiesAvailable: number,
        category: number,
        img: string )
        {
            this.id=id;
            this.title=title;
            this.author=author;
            this.description=description;
            this.copies=copies;
            this.copiesAvailable=copiesAvailable;
            this.category=category;
            this.img=img;
        }
}

export default BookModel;