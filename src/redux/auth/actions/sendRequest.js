import { toast } from "react-toastify";
import axios from "axios";

export default async function sendRequest(url) {
  const response = await axios(url);

  // console.log(response.data.success);
  if (!response.data.success) {
    if (window.location.pathname !== "/admin/login") {
      axios
        .get(`/api/logout`)
        .then((res) => {
          if (res.data.success) {
            toast.error(res.data);
            window.location.reload();
          } else {
            toast.error(res.data);
          }
        })
        .catch((err) => {
          toast.error("Կատարված չէ");
        });
    }
  }
  return response.data.success;
}
