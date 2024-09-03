import axios from "axios";

test();

async function test() {
  const resp = await axios.get("http://[::1]:8080/albums");
  console.log(resp);
}
