const prod = process.env.NODE_ENV === "production";

module.exports = {
  "process.env.BACKEND_URL": prod
    ? "https://www.songplates.com/api"
    : "http://localhost:3000/api",
  "process.env.NODE_ENV": prod ? "production" : "development",
  "process.env.STRIPE_PK": prod ? "pk_live" : "pk_test",
};
