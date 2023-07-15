import moment from "moment";

function formatDate(date){
    return moment(date).format("MMMM D, YYYY")
}
export default formatDate