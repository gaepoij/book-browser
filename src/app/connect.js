import { connect } from "react-redux";
import { searchBooks, loadMoreBooks } from "../actions";

const mapStateToProps = (state) => {
	return {
		books: state.booksReducer.books,
		total: state.booksReducer.total,
		loadingBooks: state.booksReducer.loading,
		loadingMoreBooks: state.booksReducer.loadingMore,
		page: state.booksReducer.page,
		maxPages: state.booksReducer.maxPages,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		searchBooks: (query) => dispatch(searchBooks(query)),
		loadMoreBooks: (query, page) => dispatch(loadMoreBooks(query, page)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps);
