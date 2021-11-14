import connect from "./connect";
import {
  Center,
  Box,
  Flex,
  Stack,
  Input,
  HStack,
  Button,
  VStack,
  StackDivider,
  Text,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function App({
  books,
  total,
  searchBooks,
  loadingBooks,
  loadingMoreBooks,
  loadMoreBooks,
  maxPages,
  page,
}) {
  const [bookResults, setBookResults] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (books) {
      setBookResults(books);
    }

    if (total) {
      setTotalAmount(total);
    }
  }, [books, total]);

  const handleInput = (event) => setQuery(event.target.value);

  return (
    <div className="App">
      <Center>
        <Stack mt="10" w="100%">
          <HStack p={4}>
            <Input
              value={query}
              placeholder="Search books"
              size="lg"
              onChange={handleInput}
            />
            <Button
              colorScheme="teal"
              variant="ghost"
              isDisabled={query.length < 3}
              onClick={() => searchBooks(query)}
              isLoading={loadingBooks}
            >
              <Text fontSize="md"> Search </Text>
            </Button>
          </HStack>

          {!loadingBooks && bookResults.length && (
            <Box mt="10" w="100%" p={10}>
              <Box color="gray.500" pb={10}>
                <Text>Found {totalAmount} results..</Text>
              </Box>
              <VStack
                spacing={4}
                divider={<StackDivider borderColor="gray.200" />}
                align="stretch"
              >
                {bookResults.map((book, i) => {
                  return (
                    <Flex key={i} flexDirection="column">
                      <Text fontSize="lg">
                        <Link
                          href={`https://openlibrary.org${book.key}`}
                          isExternal
                        >
                          {book.title}
                        </Link>
                      </Text>
                      <Text color="gray.500" mt="5" fontSize="sm">
                        {book.author_name?.join(", ") || ""}
                      </Text>
                    </Flex>
                  );
                })}
              </VStack>
              {page < maxPages && (
                <Center p={10}>
                  <Button
                    isLoading={loadingMoreBooks}
                    variant="solid"
                    colorScheme="teal"
                    onClick={() => loadMoreBooks(query, page + 1)}
                  >
                    <Text fontSize="md"> Load more </Text>
                  </Button>
                </Center>
              )}
            </Box>
          )}
        </Stack>
      </Center>
    </div>
  );
}

export default connect(App);
