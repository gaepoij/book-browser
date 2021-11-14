import axios from "axios";

const PAGE_SIZE = 15;

export const searchBooks = (query) => (dispatch) => {
	dispatch({ type: "SEARCH_BOOKS_LOADING" });

	axios
		.get(
			`http://openlibrary.org/search.json?title=${query}&limit=${PAGE_SIZE}`
		)
		.then((res) => {
			dispatch({
				type: "SEARCH_BOOKS",
				payload: {
					books: res.data.docs,
					total: res.data.numFound,
					page: res.data.start + 1,
					maxPages: Math.ceil(res.data.numFound / PAGE_SIZE),
				},
			});
		})
		.catch((e) => {
			dispatch({
				type: "SEARCH_BOOKS_ERROR",
				payload: console.log(e),
			});
		});
};

export const loadMoreBooks = (query, page) => (dispatch) => {
	dispatch({ type: "LOADING_MORE_BOOKS" });

	axios
		.get(
			`http://openlibrary.org/search.json?title=${query}&limit=${PAGE_SIZE}&page=${page}`
		)
		.then((res) => {
			dispatch({
				type: "LOAD_MORE_BOOKS",
				payload: {
					books: res.data.docs,
					total: res.data.numFound,
					page,
					maxPages: Math.ceil(res.data.numFound / PAGE_SIZE),
				},
			});
		})
		.catch((e) => {
			dispatch({
				type: "SEARCH_BOOKS_ERROR",
				payload: console.log(e),
			});
		});
};
