import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../utils/SpinnerLoading";
import { StarReview } from "../utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { LatestReviews } from "./LatestReviews";
import { useOktaAuth } from "@okta/okta-react";
import ReviewRequestModel from "../../models/ReviewRequestModel";

export const BookCheckoutPage = () => {

    const { authState } = useOktaAuth();

    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //Review state
    const [reviews, setReviews] = useState<ReviewModel[]>([])
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    const [isReviewLeft, setIsReviewLeft] = useState(false)
    const [isLoadingUserReview, setIsLoadingUserReview] = useState(true)
    //Loand count state
    const [currentLoansCount, setCurrentLoansCount] = useState(0);
    const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState(true);

    //Book checked out
    const [isCheckedOut, setIsCheckedOut] = useState(false)
    const [isLoadingBookCheckedOut, setIsLoadingBookCheckedOut] = useState(true)

    //Payment
    const [displayError, setDisplayError] = useState(false)


    const bookId = (window.location.pathname).split('/')[2];


    //fetch books
    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `${process.env.REACT_APP_API}/books/${bookId}`

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const responseJson = await response.json();
            const loadedBook: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img
            };

            setBook(loadedBook)
            // console.log(`books: ${books}`)
            setIsLoading(false)
        };

        fetchBook().catch((err: any) => {
            setIsLoading(false);
            setHttpError(err.message);
        })

    }, [isCheckedOut]);

    //fetch is user set
    useEffect(() => {
        const fetchUserReviewBook = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API}/reviews/secure/user/book/?bookId=${bookId}`
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    },
                }
                const userReview = await fetch(url, requestOptions);
                if (!userReview.ok) {
                    throw new Error("Something went wrong")
                }

                const userReviewResponseJson = await userReview.json();
                setIsReviewLeft(userReviewResponseJson);
            }
            setIsLoadingUserReview(false)
        }

        fetchUserReviewBook().catch((err: any) => {
            setIsLoadingUserReview(false)
            setHttpError(err.message)
        })
    }, [authState]);

    //fetch book reviews
    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `${process.env.REACT_APP_API}/reviews/search/findByBookId?book_id=${bookId}`;

            const responseReview = await fetch(reviewUrl);

            if (!responseReview.ok) {
                throw new Error("Something went wrong");
            }

            const responseReviewJson = await responseReview.json();
            const responseData = responseReviewJson._embedded.reviews;
            const loadedReviews: ReviewModel[] = []

            let weightedStarReviews: number = 0;

            for (const reviewData of responseData) {
                const { id, userEmail, date, rating, bookId, reviewDescription } = reviewData;
                const loadedReview = new ReviewModel(id, userEmail, date, rating, bookId, reviewDescription);
                loadedReviews.push(loadedReview);
                weightedStarReviews += rating;
            }
            if (loadedReviews) {
                const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }

            setReviews(loadedReviews);
            setIsLoadingReview(false);
        }
        fetchBookReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        });
    }, [isReviewLeft])

    //fetch user loans count
    useEffect(() => {
        const fetchUserCurrentLoansCount = async () => {
            if (authState?.isAuthenticated) {
                const url = `${process.env.REACT_APP_API}/books/secure/currentloans/count`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    },
                }
                const currentLoansCountResponse = await fetch(url, requestOptions);
                if (!currentLoansCountResponse.ok) {
                    throw new Error("Something went wrong")
                }

                const currentLoansCountResponseJson = await currentLoansCountResponse.json();
                setCurrentLoansCount(currentLoansCountResponseJson)
            }
            setIsLoadingCurrentLoansCount(false);
        }

        fetchUserCurrentLoansCount().catch((err: any) => {
            setIsLoadingCurrentLoansCount(false);
            setHttpError(err.message);
        })
    }, [authState, isCheckedOut])

    //fetch is book checked out by user
    useEffect(() => {
        const fetchUserCheckedOutBook = async () => {
            if (authState?.isAuthenticated) {
                const url = `${process.env.REACT_APP_API}/books/secure/ischeckedout/byuser/?bookId=${bookId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    },
                }
                const bookCheckedOut = await fetch(url, requestOptions);
                if (!bookCheckedOut.ok) {
                    throw new Error("Something went wrong")
                }

                const bookCheckedOutResponseJson = await bookCheckedOut.json();
                setIsCheckedOut(bookCheckedOutResponseJson);
            }
            setIsLoadingBookCheckedOut(false);
        }

        fetchUserCheckedOutBook().catch((err: any) => {
            setIsLoadingBookCheckedOut(false);
            setHttpError(err.message);
        })
    }, [authState])

    if (isLoading || isLoadingReview || isLoadingCurrentLoansCount || isLoadingBookCheckedOut || isLoadingUserReview) {
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

    async function checkoutBook() {
        const chechoutBookFunction = async () => {
            const url = `${process.env.REACT_APP_API}/books/secure/checkout/?bookId=${book?.id}`;
            const requestOptions = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                },
            }
            const checkoutResponse = await fetch(url, requestOptions);
            if (!checkoutResponse.ok) {
                throw new Error("Something went wrong")
            }
        }
        chechoutBookFunction().catch((err: any) => {
            setDisplayError(true)
            // setHttpError(err.message)
            setIsCheckedOut(false);
        })
        if (!displayError) {
            setDisplayError(false)
            setIsCheckedOut(true);

        }
    }

    async function submitReview(starInput: number, reviewDesc: string) {
        let bookId: number = 0;
        if (book?.id) {
            bookId = book.id
        }
        console.log('git')
        const reviewRequestModel = new ReviewRequestModel(starInput, bookId, reviewDesc)
        const url = `${process.env.REACT_APP_API}/reviews/secure`;
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewRequestModel)
        }

        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error("Something went wrong")
        }
        setIsReviewLeft(true);
    }

    return (
        <div>
            <div className="container d-none d-lg-block">
                {
                    displayError &&
                    <div className="alert alert-danger mt-3" role="alert">
                        Pleade pay outstanding fees and/or return late book(s)
                    </div>
                }
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {book?.img ? <img src={book?.img} width='226' height='349' alt='Book' />
                            :
                            <img src={require('./../../img/books/book.png')} width='226' height='349' alt='Book' />
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h5 className="text-primary">{book?.author}</h5>
                            <p className="lead">{book?.description}</p>
                            <StarReview rating={totalStars} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={false} currentLoansCount={currentLoansCount} isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut} chechoutBook={checkoutBook} isReviewLeft={isReviewLeft} submitReview={submitReview} />
                </div>
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
            </div>
            <div className="container d-lg-none mt-5">
                {
                    displayError &&
                    <div className="alert alert-danger mt-3" role="alert">
                        Pleade pay outstanding fees and/or return late book(s)
                    </div>
                }
                <div className="d-flex justify-content-center align-items-center">
                    {book?.img ? <img src={book?.img} width='226' height='349' alt='Book' />
                        :
                        <img src={require('./../../img/books/book.png')} width='226' height='349' alt='Book' />
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                        <StarReview rating={totalStars} size={32} />
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={true} currentLoansCount={currentLoansCount} isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut} chechoutBook={checkoutBook} isReviewLeft={isReviewLeft} submitReview={submitReview} />
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
            </div>
        </div>
    );
}
