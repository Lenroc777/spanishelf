import { useState } from "react";
import { StarReview } from "./StarsReview";

export const LeaveAReview: React.FC<{ submitReview: any }> = (props) => {
    const [starInput, setStarInput] = useState(0);
    const [displayInput, setDisplayInput] = useState(false);
    const [reviewDesc, setReviewDesc] = useState('')

    function starValue(value: number) {
        setStarInput(value)
        setDisplayInput(true)
    }

    return (
        <div style={{ cursor: 'pointer' }} className="dropdown">
            <h5 className="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown">Leave a review?</h5>
            <ul id="submitReviewRating" className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><button className="dropdown-item" onClick={() => starValue(0)}>0 star</button></li>
                <li><button className="dropdown-item" onClick={() => starValue(0.5)}>0.5 star</button></li>
                <li><button className="dropdown-item" onClick={() => starValue(1)}>1 star</button></li>
                <li><button className="dropdown-item" onClick={() => starValue(1.5)}>1.5 star</button></li>
                <li><button className="dropdown-item" onClick={() => starValue(2)}>2 star</button></li>
                <li><button className="dropdown-item" onClick={() => starValue(2.5)}>2.5 star</button></li>
                <li><button className="dropdown-item" onClick={() => starValue(3)}>3 star</button></li>
                <li><button className="dropdown-item" onClick={() => starValue(3.5)}>3.5 star</button></li>
                <li><button className="dropdown-item" onClick={() => starValue(4)}>4 star</button></li>
                <li><button className="dropdown-item" onClick={() => starValue(4.5)}>4.5 star</button></li>
                <li><button className="dropdown-item" onClick={() => starValue(5)}>5 star</button></li>
            </ul>
            <StarReview rating={starInput} size={32} />

            {displayInput &&
                <form action="#" method="POST">
                    <hr />

                    <div className="mb-3">
                        <label className="form-label">
                            Description
                        </label>
                        <textarea className="form-control" id="submitReviewDescription" rows={3} placeholder="Optional" onChange={e => setReviewDesc(e.target.value)} ></textarea>
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary mt-3" onClick={() => props.submitReview(starInput, reviewDesc)} >Submit</button>
                    </div>
                </form>
            }

        </div>
    );
}
