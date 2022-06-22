const axios = require("axios");

const getHtml = async () => {
  try {
    return await axios.get("/list.naver?cid=42726&categoryId=58635&page=37");
  } catch (error) {
    console.error(error);
  }
};

export {
  getHtml,
};
