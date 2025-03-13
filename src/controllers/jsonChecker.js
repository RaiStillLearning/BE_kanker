const jsonChecker = (jsonData) => {
  try {
    JSON.parse(jsonData);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = jsonChecker;
