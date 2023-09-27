import { useEffect, useState } from "react"
import ReviewModel from "../../../models/ReviewModel"
import { SpinnerLoading } from "../../utils/SpinnerLoading";
import { Review } from "../../utils/Review";
import Pagination from "../../utils/Pagination";

export const ReviewListPage = () => {
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [reviewsPerPage, setReviewsPerPage] = useState(5)
    const [totalAmountOfReviews, setTotalAmountsOfReviews] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const bookId = (window.location.pathname).split('/')[2];


    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `${process.env.REACT_APP_API}/reviews/search/findByBookId?book_id=${bookId}&page=${currentPage - 1}&size=${reviewsPerPage}`;

            const responseReview = await fetch(reviewUrl);

            if (!responseReview.ok) {
                throw new Error("Something went wrong");
            }

            const responseReviewJson = await responseReview.json();
            const responseData = responseReviewJson._embedded.reviews;
            const loadedReviews: ReviewModel[] = []

            setTotalAmountsOfReviews(responseReviewJson.page.totalElements);
            setTotalPages(responseReviewJson.page.totalPages)




            for (const reviewData of responseData) {
                const { id, userEmail, date, rating, bookId, reviewDescription } = reviewData;
                const loadedReview = new ReviewModel(id, userEmail, date, rating, bookId, reviewDescription);
                loadedReviews.push(loadedReview);
            }


            setReviews(loadedReviews);
            setIsLoading(false);
        }
        fetchBookReviews().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, [currentPage])


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

    const indexOfLastReview: number = currentPage * reviewsPerPage;
    const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage;
    let lastItem = reviewsPerPage * currentPage <= totalAmountOfReviews ? reviewsPerPage * currentPage : totalAmountOfReviews;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    return (
        <div className="container m-5">
            <div>
                <h3>Comments: ({reviews.length})</h3>
            </div>
            <p>{indexOfLastReview + 1} to {lastItem} of {totalAmountOfReviews} items: </p>
            <div className="row">
                {reviews.map(review => (
                    <Review review={review} key={review.id} />
                ))}
            </div>
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
    )
}