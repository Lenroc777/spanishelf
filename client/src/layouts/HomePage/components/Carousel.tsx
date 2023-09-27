import { useEffect, useState } from "react";
import { ReturnBooks } from "./ReturnBook";
import BookModel from "../../../models/BookModel";
import { SpinnerLoading } from "../../utils/SpinnerLoading";
import { Link } from "react-router-dom"
export const Carousel = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = `${process.env.REACT_APP_API}/books`
            const url: string = `${baseUrl}?page = 0 & size=9`

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.books;
            const loadedBooks: BookModel[] = [];

            for (const bookData of responseData) {
                const { id, title, author, description, copies, copiesAvailable, category, img } = bookData;
                const loadedBook = new BookModel(id, title, author, description, copies, copiesAvailable, category, img);
                loadedBooks.push(loadedBook);
            }
            setBooks(loadedBooks)
            // console.log(`books: ${ books } `)
            setIsLoading(false)
        };

        fetchBooks().catch((err: any) => {
            setIsLoading(false);
            setHttpError(err.message);
        })

    }, []);

    // useEffect(() => {
    //     console.log("books:", books); // Sprawdzanie, czy stan books został zaktualizowany
    // }, [books]);

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div className="container mt-5" style={{ height: 550 }}>
            <div className="homepage-carousel-title">
                <h3>Find your next journey</h3>
            </div>
            <div id="carouselExampleControls" className="carousel carousel-dark slide mt-5 d-none d-lg-block" data-bs-interval='false' >
                <div className="carousel-inner">
                    {/* Desktop */}
                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-items-center">
                            {
                                books.slice(0, 3).map(book => (
                                    <ReturnBooks book={book} key={book.id} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {
                                books.slice(3, 6).map(book => (
                                    <ReturnBooks book={book} key={book.id} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="carousel-item ">
                        <div className="row d-flex justify-content-center align-items-center">
                            {
                                books.slice(6, 9).map(book => (
                                    <ReturnBooks book={book} key={book.id} />
                                ))
                            }
                        </div>
                    </div>

                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* Mobile */}
            <div className="d-lg-none mt-3">
                <div className="row d-flex justify-content-center align-items-center">
                    <ReturnBooks book={books[7]} key={books[7].id} />
                </div>
            </div>
            <div className="homepage-carousel-title mt-3">
                <Link to="/search" className="btn btn-outline-secondary btn-lg">View more</Link>
            </div>
        </div>

    );
}

