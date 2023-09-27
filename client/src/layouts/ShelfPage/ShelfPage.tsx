import { useState } from "react"
import { HistoryPage } from "./components/HistoryPage"
import { Loans } from "./components/Loans"

export const ShelfPage = () => {

    const [historyClick, sertHistoryClick] = useState(false)

    return (
        <div className="container">
            <div className="mt-3">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button onClick={() => sertHistoryClick(false)} className="nav-link active" id="nav-loans-tab" data-bs-toggle="tab" data-bs-target="#nav-loans" aria-selected="true">Loans</button>
                        <button onClick={() => sertHistoryClick(true)} className="nav-link" id="nav-history-tab" data-bs-toggle="tab" data-bs-target="#nav-history" aria-selected="false">Your history</button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-loans" role="tabpanel" aria-labelledby="nav-loans-tab">
                        <Loans />
                    </div>
                    <div className="tab-pane fade" id="nav-history" role="tabpanel" aria-labelledby="nav-history-tab">
                        {historyClick ? <HistoryPage /> : <></>}
                    </div>
                </div>
            </div>
        </div>
    )
}