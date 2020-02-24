exports.formatDates = list => {
  const newList = [];
  if (list.length === 0) {
    return [];
  } else {
    list.forEach(item => {
      let convertedDate = new Date(item.created_at);
      convertedDate = convertedDate.toUTCString();
      newList.push({ ...item, created_at: convertedDate });
    });
    return newList;
  }
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
