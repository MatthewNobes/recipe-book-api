import app from "./app";

const port = process.env.PORT || 4444;

app.listen(port, () => {
	console.log(`Recipe API is listening on port ${port}`);
});
