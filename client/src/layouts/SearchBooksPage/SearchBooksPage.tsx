import { useEffect, useState, useRef } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";
import Pagination from "../utils/Pagination";

export const SearchBooksPage = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage, setBooksPerPage] = useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [categorySelection, setCategorySelection] = useState('Book category');

    useEffect(() => {
        const baseUrl: string = `${process.env.REACT_APP_API}/books`
        let url: string;
        const fetchBooks = async () => {

            if (search === '' && categorySelection === "Book category") {
                url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`
            } else if (categorySelection !== "Book category") {
                let searchWithCategory = searchUrl.replace('<pageNumber>', `${currentPage - 1}`)
                url = baseUrl + searchWithCategory;
            }
            else {
                let searchWithPage = searchUrl.replace('<pageNumber>', `${currentPage - 1}`)
                url = baseUrl + searchWithPage;
            }

            console.log(url)
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.books;
            const loadedBooks: BookModel[] = [];

            setTotalAmountOfBooks(responseJson.page.totalElements)
            setTotalPages(responseJson.page.totalPages)

            for (const bookData of responseData) {
                const { id, title, author, description, copies, copiesAvailable, category, img } = bookData;
                const loadedBook = new BookModel(id, title, author, description, copies, copiesAvailable, category, img);
                loadedBooks.push(loadedBook);
            }
            setBooks(loadedBooks)
            setIsLoading(false)
        };

        fetchBooks().catch((err: any) => {
            setIsLoading(false);
            setHttpError(err.message);
        })
        window.scrollTo(0, 0);
    }, [currentPage, searchUrl]);



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

    const searchHandleChange = () => {
        setCurrentPage(1);
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`)
        }
        setCategorySelection('Book category')
    }


    // const ref = useRef<HTMLInputElement>(null);

    const categoryField = (value: string) => {
        setCurrentPage(1)
        // if (ref.current != null) ref.current.value = "";
        if (
            value.toLowerCase() === 'history' ||
            value.toLowerCase() === 'biography' ||
            value.toLowerCase() === 'politics' ||
            value.toLowerCase() === 'novel'
        ) {
            setCategorySelection(value);
            setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`)
        } else {
            setCategorySelection('All')
            setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`)
        }

    }

    const indexOfLastBook: number = currentPage * booksPerPage;
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks;

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div>
            <div className="container">
                <div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="search" aria-label="search"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button className="btn btn-outline-success" onClick={() => searchHandleChange()}>Search</button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {categorySelection}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li onClick={() => categoryField('All')}>
                                        <a href="#" className="dropdown-item">
                                            All
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('history')}>
                                        <a href="#" className="dropdown-item">
                                            History
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('biography')}>
                                        <a href="#" className="dropdown-item">
                                            Biography
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('politics')}>
                                        <a href="#" className="dropdown-item">
                                            Politics
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('novel')}>
                                        <a href="#" className="dropdown-item">
                                            Novel
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {totalAmountOfBooks > 0 ? <>
                        <div className="mt-3">
                            <h5>Number of results: ({totalAmountOfBooks})</h5>
                        </div>
                        <p>{indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:</p>
                        {books.map(book => (
                            <SearchBook book={book} key={book.id} />
                        ))}
                    </>
                        :
                        <div className="m-5">
                            <h3>Can't find what you are looking for?</h3>
                            <a href="#" type="button" className="btn  main-color btn-md px-4 me-md-2 fw-bold text-white">Library Services</a>
                        </div>
                    }

                    {
                        totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    }

                </div>
            </div>
        </div >
    );
}
