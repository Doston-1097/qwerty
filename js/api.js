const getWord = async (word) => {
  return await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
};
