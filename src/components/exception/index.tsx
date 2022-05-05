import React, {FC} from "react"
import { useNavigate } from "react-router-dom";

interface Props {
    // status?: ExceptionStatusType
}

// const statusMap: NumberMap<ResultProps> = {
//     403: {
//         title: "403",
//         subTitle: "Sorry, you are not authorized to access this page.",
//     },
//     404: {
//         title: "404",
//         subTitle: "Sorry, the page you visited does not exist.",
//     },
//     500: {
//         title: "500",
//         subTitle: "Sorry, the server is wrong.",
//     }
// }

// status = "404"
const NoMatch: FC<Props> = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);
    return (
            <div>
                <button onClick={goBack}>Back</button>
            </div>
    );
    // <Result
    //     status={status}
    //     extra={<Button type="primary" onClick={goBack}>Back</Button>}
    //     {...statusMap[status]}
    // />
};

export default NoMatch;
