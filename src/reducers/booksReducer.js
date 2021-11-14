const initialState = {
	books: [],
	page: 0,
	maxPages: 0,
	total: 0,
	loading: false,
	loadingMore: false,
};

const bookReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SEARCH_BOOKS_LOADING":
			return {
				...state,
				loading: true,
			};

		case "SEARCH_BOOKS":
			return {
				...state,
				books: [...action.payload.books],
				total: action.payload.total,
				page: action.payload.page,
				maxPages: action.payload.maxPages,
				loading: false,
			};

		case "LOAD_MORE_BOOKS":
			return {
				...state,
				books: [...state.books, ...action.payload.books],
				total: action.payload.total,
				page: action.payload.page,
				maxPages: action.payload.maxPages,
				loadingMore: false,
			};

		case "LOADING_MORE_BOOKS":
			return {
				...state,
				loadingMore: true,
			};

		default:
			return state;
	}
};

export default bookReducer;
